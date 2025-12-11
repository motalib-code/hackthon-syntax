"""
AgriScan AI - FastAPI Backend
Mock AI endpoints for pest detection, nutrient analysis, and yield prediction
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import random
import uuid
from datetime import datetime

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

# In-memory storage for demo
uploaded_images = {}

# ========================
# Mock AI Functions
# ========================

def mock_yolov8_detection():
    """Simulate YOLOv8 pest detection output"""
    pest_types = ["Aphid", "Caterpillar", "Whitefly", "Thrips", "Spider Mite", "Leaf Miner"]
    num_pests = random.randint(0, 5)
    
    detections = []
    for _ in range(num_pests):
        detections.append({
            "label": random.choice(pest_types),
            "confidence": round(random.uniform(0.75, 0.98), 2),
            "bbox": {
                "x": random.randint(50, 400),
                "y": random.randint(50, 300),
                "width": random.randint(40, 100),
                "height": random.randint(40, 100)
            }
        })
    
    alert_level = "Safe" if num_pests == 0 else ("Moderate" if num_pests <= 2 else "High Alert")
    
    recommendations = {
        "Safe": "No immediate action required. Continue routine monitoring.",
        "Moderate": "Apply targeted organic pesticide in affected zones within 48 hours.",
        "High Alert": "Urgent: Apply broad-spectrum treatment immediately. Consider drone spraying."
    }
    
    return {
        "status": "completed",
        "alert_level": alert_level,
        "pests_detected": detections,
        "total_pests": num_pests,
        "recommendation": recommendations[alert_level],
        "processing_time": round(random.uniform(1.2, 2.8), 2)
    }

def mock_nutrient_analysis():
    """Simulate DeepLabV3+ NDVI nutrient deficiency analysis"""
    nitrogen = random.randint(5, 45)
    phosphorus = random.randint(3, 25)
    potassium = random.randint(2, 20)
    
    max_def = max(nitrogen, phosphorus, potassium)
    if max_def > 30:
        health = "Low Nitrogen" if nitrogen == max_def else ("Low Phosphorus" if phosphorus == max_def else "Low Potassium")
    elif max_def > 15:
        health = "Moderate Deficiency"
    else:
        health = "Optimal"
    
    zones = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
    affected = random.sample(zones, random.randint(1, 3))
    
    return {
        "status": "completed",
        "overall_health": health,
        "deficiencies": {
            "nitrogen": nitrogen,
            "phosphorus": phosphorus,
            "potassium": potassium
        },
        "affected_zones": affected,
        "recommendation": f"Apply balanced fertilizer in zones {', '.join(affected)}",
        "processing_time": round(random.uniform(2.1, 3.5), 2)
    }

def mock_yield_prediction():
    """Simulate CNN-Regressor yield prediction"""
    base_yield = random.uniform(3.5, 5.5)
    confidence = random.uniform(0.82, 0.95)
    days = random.randint(21, 42)
    change = random.uniform(-15, 20)
    
    return {
        "status": "completed",
        "predicted_yield": round(base_yield, 2),
        "unit": "tons/ha",
        "harvest_ready_in": days,
        "confidence": round(confidence, 2),
        "comparison": f"{'+' if change > 0 else ''}{change:.1f}% vs last season",
        "processing_time": round(random.uniform(1.5, 2.2), 2)
    }

# ========================
# API Endpoints
# ========================

@app.get("/")
async def root():
    return {
        "name": "AgriScan AI API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": ["/api/upload-image", "/api/analyze/pests", "/api/analyze/nutrients", "/api/analyze/yield", "/api/analyze/full"]
    }

@app.post("/api/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """Upload drone imagery for analysis"""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    image_id = str(uuid.uuid4())[:8]
    contents = await file.read()
    
    uploaded_images[image_id] = {
        "filename": file.filename,
        "size": len(contents),
        "uploaded_at": datetime.now().isoformat()
    }
    
    return {
        "status": "success",
        "image_id": image_id,
        "filename": file.filename,
        "message": "Image uploaded successfully. Ready for analysis."
    }

@app.post("/api/analyze/pests")
async def analyze_pests(image_id: Optional[str] = None):
    """Run YOLOv8 pest detection"""
    return mock_yolov8_detection()

@app.post("/api/analyze/nutrients")
async def analyze_nutrients(image_id: Optional[str] = None):
    """Run DeepLabV3+ nutrient analysis"""
    return mock_nutrient_analysis()

@app.post("/api/analyze/yield")
async def analyze_yield(image_id: Optional[str] = None):
    """Run CNN-Regressor yield prediction"""
    return mock_yield_prediction()

@app.get("/api/analyze/full")
async def full_analysis(image_id: Optional[str] = None):
    """Run complete analysis pipeline"""
    return {
        "image_id": image_id or "demo",
        "timestamp": datetime.now().isoformat(),
        "pest_analysis": mock_yolov8_detection(),
        "nutrient_analysis": mock_nutrient_analysis(),
        "yield_prediction": mock_yield_prediction()
    }

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """Legacy endpoint - analyze drone image"""
    pests = mock_yolov8_detection()
    nutrients = mock_nutrient_analysis()
    yield_pred = mock_yield_prediction()
    
    return {
        "image_id": str(uuid.uuid4()),
        "pest_detection": pests,
        "nutrient_analysis": nutrients,
        "yield_prediction": yield_pred,
        "recommendations": [
            "Apply targeted pesticide spray in high-alert zones",
            "Increase nitrogen fertilizer application",
            "Monitor field for next 7 days"
        ]
    }

@app.get("/api/demo-data")
async def get_demo_data():
    """Get sample demo data for frontend"""
    return {
        "pest_detection": mock_yolov8_detection(),
        "nutrient_analysis": mock_nutrient_analysis(),
        "yield_prediction": mock_yield_prediction(),
        "field_zones": [
            {"id": "A1", "status": "healthy", "score": 92},
            {"id": "A2", "status": "healthy", "score": 88},
            {"id": "A3", "status": "warning", "score": 65},
            {"id": "B1", "status": "healthy", "score": 90},
            {"id": "B2", "status": "critical", "score": 35},
            {"id": "B3", "status": "warning", "score": 58},
        ],
        "stats": {
            "hectares_analyzed": 250,
            "processing_hours": 2,
            "accuracy": 94,
            "cost_savings": 40
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
