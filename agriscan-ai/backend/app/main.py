from fastapi import FastAPI, UploadFile, File, HTTPException, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app import models, schemas, tasks
import uuid
import asyncio
import json
from typing import List

# Create Tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgriScan AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AgriScan AI API Ready"}

@app.post("/api/upload/image")
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # In a real app, upload to S3. Here we just mock it.
    upload_id = str(uuid.uuid4())
    upload = models.Upload(
        id=upload_id,
        filename=file.filename,
        content_type=file.content_type,
        size=file.size or 0
    )
    db.add(upload)
    db.commit()
    return {"image_id": upload_id, "url": f"http://localhost:8000/static/{file.filename}"}

@app.post("/api/analysis/pest-detection", response_model=schemas.AnalysisResponse)
async def analyze_pests(request: schemas.PestDetectionRequest, db: Session = Depends(get_db)):
    analysis_id = str(uuid.uuid4())
    analysis = models.Analysis(
        id=analysis_id,
        field_id=request.field_id,
        analysis_type="pest_detection",
        status="queued"
    )
    db.add(analysis)
    db.commit()
    
    # Trigger Celery Task
    tasks.process_pest_detection.delay(analysis_id)
    
    return analysis

@app.post("/api/analysis/nutrient-mapping", response_model=schemas.AnalysisResponse)
async def analyze_nutrients(request: schemas.NutrientAnalysisRequest, db: Session = Depends(get_db)):
    analysis_id = str(uuid.uuid4())
    analysis = models.Analysis(
        id=analysis_id,
        field_id=request.field_id,
        analysis_type="nutrient_mapping",
        status="queued"
    )
    db.add(analysis)
    db.commit()
    
    tasks.process_nutrient_analysis.delay(analysis_id)
    return analysis

@app.post("/api/analysis/yield-prediction", response_model=schemas.AnalysisResponse)
async def analyze_yield(request: schemas.YieldPredictionRequest, db: Session = Depends(get_db)):
    analysis_id = str(uuid.uuid4())
    analysis = models.Analysis(
        id=analysis_id,
        field_id=request.field_id,
        analysis_type="yield_prediction",
        status="queued"
    )
    db.add(analysis)
    db.commit()
    
    tasks.process_yield_prediction.delay(analysis_id)
    return analysis

@app.get("/api/analysis/{analysis_id}", response_model=schemas.AnalysisResponse)
def get_analysis_result(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(models.Analysis).filter(models.Analysis.id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@app.websocket("/ws/analysis/{analysis_id}")
async def websocket_endpoint(websocket: WebSocket, analysis_id: str, db: Session = Depends(get_db)):
    await websocket.accept()
    try:
        while True:
            # Poll DB for status
            # Note: In production we'd subscribe to Redis pub/sub
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
                    await websocket.send_json({"status": "processing", "progress": 50}) # Mock progress
            else:
                 await websocket.send_json({"status": "error", "message": "Not found"})
                 break
            
            await asyncio.sleep(1)
    except Exception as e:
        print(f"WS Error: {e}")
        await websocket.close()
