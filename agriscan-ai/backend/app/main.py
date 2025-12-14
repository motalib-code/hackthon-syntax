from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, WebSocket, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base, init_db
from app import models, schemas, tasks
from app.config import settings
import uuid
import asyncio
import json
import os
import shutil
from typing import List
from pathlib import Path

# Create upload directory
UPLOAD_DIR = Path(settings.UPLOAD_DIR)
UPLOAD_DIR.mkdir(exist_ok=True)

# Initialize database
print("Initializing database...")
init_db()
print("Database initialized successfully!")

app = FastAPI(title="AgriScan AI API", version="1.0.0")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
try:
    app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
except Exception as e:
    print(f"Warning: Could not mount uploads directory: {e}")

@app.get("/")
def read_root():
    return {
        "message": "AgriScan AI API Ready",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "celery_enabled": settings.USE_CELERY
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/png", "image/tiff"]
        if file.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail=f"File type {file.content_type} not allowed")
        
        # Generate unique ID and save file
        upload_id = str(uuid.uuid4())
        file_extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        saved_filename = f"{upload_id}.{file_extension}"
        file_path = UPLOAD_DIR / saved_filename
        
        # Save file to disk
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Save to database
        upload = models.Upload(
            id=upload_id,
            filename=file.filename,
            content_type=file.content_type,
            size=os.path.getsize(file_path)
        )
        db.add(upload)
        db.commit()
        
        return {
            "image_id": upload_id,
            "url": f"/uploads/{saved_filename}",
            "filename": file.filename
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.post("/api/analysis/pest-detection", response_model=schemas.AnalysisResponse)
async def analyze_pests(
    request: schemas.PestDetectionRequest, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        analysis_id = str(uuid.uuid4())
        analysis = models.Analysis(
            id=analysis_id,
            field_id=request.field_id,
            analysis_type="pest_detection",
            status="queued"
        )
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
        
        # Trigger task (Celery or background task)
        if settings.USE_CELERY:
            tasks.process_pest_detection.delay(analysis_id)
        else:
            background_tasks.add_task(tasks.process_pest_detection, analysis_id)
        
        return analysis
    except Exception as e:
        print(f"Pest detection error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analysis/nutrient-mapping", response_model=schemas.AnalysisResponse)
async def analyze_nutrients(
    request: schemas.NutrientAnalysisRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        analysis_id = str(uuid.uuid4())
        analysis = models.Analysis(
            id=analysis_id,
            field_id=request.field_id,
            analysis_type="nutrient_mapping",
            status="queued"
        )
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
        
        if settings.USE_CELERY:
            tasks.process_nutrient_analysis.delay(analysis_id)
        else:
            background_tasks.add_task(tasks.process_nutrient_analysis, analysis_id)
        
        return analysis
    except Exception as e:
        print(f"Nutrient analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analysis/yield-prediction", response_model=schemas.AnalysisResponse)
async def analyze_yield(
    request: schemas.YieldPredictionRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        analysis_id = str(uuid.uuid4())
        analysis = models.Analysis(
            id=analysis_id,
            field_id=request.field_id,
            analysis_type="yield_prediction",
            status="queued"
        )
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
        
        if settings.USE_CELERY:
            tasks.process_yield_prediction.delay(analysis_id)
        else:
            background_tasks.add_task(tasks.process_yield_prediction, analysis_id)
        
        return analysis
    except Exception as e:
        print(f"Yield prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/analysis/{analysis_id}", response_model=schemas.AnalysisResponse)
def get_analysis_result(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@app.websocket("/ws/analysis/{analysis_id}")
async def websocket_endpoint(websocket: WebSocket, analysis_id: str):
    await websocket.accept()
    db = SessionLocal()
    
    try:
        while True:
            # Poll DB for status
            analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id).first()
            
            if analysis:
                if analysis.status == "completed":
                    await websocket.send_json({
                        "status": "complete",
                        "data": analysis.results_json
                    })
                    break
                elif analysis.status == "failed":
                    await websocket.send_json({"status": "error", "message": "Analysis failed"})
                    break
                else:
                    # Still processing
                    await websocket.send_json({"status": "processing", "progress": 50})
            else:
                await websocket.send_json({"status": "error", "message": "Not found"})
                break
            
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WS Error: {e}")
    finally:
        db.close()
        try:
            await websocket.close()
        except:
            pass

# Import SessionLocal for WebSocket
from app.database import SessionLocal
