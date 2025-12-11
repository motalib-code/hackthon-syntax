from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class AnalysisBase(BaseModel):
    field_id: str
    analysis_type: str

class AnalysisCreate(AnalysisBase):
    pass

class AnalysisResponse(AnalysisBase):
    id: str
    original_image_url: Optional[str]
    results_json: Optional[Dict[str, Any]]
    confidence_score: Optional[float]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PestDetectionRequest(BaseModel):
    field_id: str
    image_id: str
    confidence_threshold: float = 0.75

class NutrientAnalysisRequest(BaseModel):
    field_id: str
    image_id: str
    crop_type: Optional[str] = None

class YieldPredictionRequest(BaseModel):
    field_id: str
    image_id: str
    historical_yield: Optional[float] = None
