"""
AgriScan AI - FastAPI Backend
Real AI endpoints for pest detection, nutrient analysis, and yield prediction
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import io
from PIL import Image

# Import our new ML models
from .ml_models.pest_detection import PestDetector
from .ml_models.nutrient_analysis import NutrientAnalyzer
from .ml_models.yield_prediction import YieldPredictor

app = FastAPI(
    title="AgriScan AI API",
    description="AI-powered precision agriculture analysis",
    version="1.0.0"
)

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
# We initialize them once at startup to avoid reloading heavy weights
try:
    pest_detector = PestDetector() # Downloads yolov8n.pt if not present
except Exception as e:
    print(f"Warning: Could not load PestDetector: {e}")
    pest_detector = None

nutrient_analyzer = NutrientAnalyzer()
yield_predictor = YieldPredictor()

# In-memory storage for demo
uploaded_images = {}

@app.get("/")
async def root():
    return {
        "name": "AgriScan AI API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": ["/analyze"]
    }

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """
    Main analysis endpoint.
    Runs the full pipeline:
    1. Pest Detection (YOLOv8)
    2. Nutrient Analysis (OpenCV VARI)
    3. Yield Prediction (Regression based on 1 & 2)
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Read image content
    contents = await file.read()

    # Save for reference (optional/mock DB)
    image_id = str(uuid.uuid4())
    uploaded_images[image_id] = {
        "filename": file.filename,
        "size": len(contents),
        "uploaded_at": datetime.now().isoformat()
    }

    # Convert to PIL Image for YOLO
    try:
        image = Image.open(io.BytesIO(contents))
    except Exception as e:
         raise HTTPException(status_code=400, detail="Invalid image file")

    # 1. Run Pest Detection
    if pest_detector:
        pest_result = pest_detector.predict(image)
    else:
        pest_result = {"status": "error", "message": "Model not loaded"}

    # 2. Run Nutrient Analysis
    # Pass raw bytes or path. Our class accepts bytes.
    try:
        nutrient_result = nutrient_analyzer.analyze(image_bytes=contents)
    except Exception as e:
        nutrient_result = {"status": "error", "message": str(e)}

    # 3. Run Yield Prediction
    yield_result = yield_predictor.predict(pest_result, nutrient_result)

    # Mock field zones for the frontend map visualization
    # In a real app, this would come from a database or geojson analysis
    field_zones = [
        {"id": "A1", "status": "healthy", "score": 92},
        {"id": "A2", "status": "healthy", "score": 88},
        {"id": "A3", "status": "warning", "score": 65},
        {"id": "B1", "status": "healthy", "score": 90},
        {"id": "B2", "status": "critical", "score": 35},
        {"id": "B3", "status": "warning", "score": 58},
        {"id": "C1", "status": "warning", "score": 62},
        {"id": "C2", "status": "healthy", "score": 89},
        {"id": "C3", "status": "critical", "score": 42},
    ]

    return {
        "image_id": image_id,
        "pest_detection": pest_result,
        "nutrient_analysis": nutrient_result,
        "yield_prediction": yield_result,
        "field_zones": field_zones,
        "recommendations": [
            pest_result.get("recommendation", ""),
            nutrient_result.get("recommendation", ""),
            "Monitor water levels"
        ]
    }
