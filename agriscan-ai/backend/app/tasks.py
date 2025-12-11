from app.celery_worker import celery_app
from app.database import SessionLocal
from app.models import Analysis
import time
import random
import json
from datetime import datetime

@celery_app.task
def process_pest_detection(analysis_id: str):
    db = SessionLocal()
    try:
        # Simulate processing
        time.sleep(5)
        
        # Mock Results
        num_detections = random.randint(1, 15)
        pests = ["Aphid", "Whitefly", "Caterpillar", "Beetle", "Mite"]
        detections = []
        for _ in range(num_detections):
            detections.append({
                "pest_type": random.choice(pests),
                "confidence": round(random.uniform(0.7, 0.99), 2),
                "bbox": {
                    "x": random.randint(50, 400),
                    "y": random.randint(50, 400),
                    "width": random.randint(30, 100),
                    "height": random.randint(30, 100)
                },
                "zone": random.choice(["Zone A", "Zone B", "Zone C"])
            })
            
        result = {
            "pests": detections,
            "affected_area_percentage": round(random.uniform(5, 30), 1),
            "risk_level": "HIGH" if len(detections) > 10 else "MEDIUM" if len(detections) > 5 else "LOW"
        }
        
        # Update DB
        analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
        if analysis:
            analysis.results_json = result
            analysis.status = "completed"
            analysis.processing_time_seconds = 5.0
            db.commit()
            
    finally:
        db.close()

@celery_app.task
def process_nutrient_analysis(analysis_id: str):
    db = SessionLocal()
    try:
        time.sleep(5)
        result = {
            "nitrogen": {"percentage": random.randint(10, 30), "recommendation": "120 kg/ha"},
            "phosphorus": {"percentage": random.randint(0, 10), "recommendation": "40 kg/ha"},
            "potassium": {"percentage": random.randint(5, 15), "recommendation": "25 kg/ha"},
            "overall_health_score": random.randint(60, 95)
        }
        
        analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
        if analysis:
            analysis.results_json = result
            analysis.status = "completed"
            db.commit()
    finally:
        db.close()

@celery_app.task
def process_yield_prediction(analysis_id: str):
    db = SessionLocal()
    try:
        time.sleep(5)
        result = {
            "predicted_yield_tons_per_hectare": round(random.uniform(3.5, 8.0), 1),
            "confidence_score": 0.91,
            "days_to_harvest": 28,
            "growth_stages": [
                {"week": 1, "maturity": 45},
                {"week": 2, "maturity": 68},
                {"week": 3, "maturity": 85},
                {"week": 4, "maturity": 98}
            ],
            "estimated_revenue": random.randint(80000, 150000)
        }
        
        analysis = db.query(Analysis).filter(Analysis.id == analysis_id).first()
        if analysis:
            analysis.results_json = result
            analysis.status = "completed"
            db.commit()
    finally:
        db.close()
