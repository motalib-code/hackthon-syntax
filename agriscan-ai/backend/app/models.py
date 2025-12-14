from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True)
    username = Column(String)
    password_hash = Column(String)
    farm_location = Column(JSON) # GeoJSON point
    total_hectares = Column(Float)
    crops_grown = Column(JSON) # Array
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    fields = relationship("Field", back_populates="owner")

class Field(Base):
    __tablename__ = "fields"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"))
    field_name = Column(String)
    area_hectares = Column(Float)
    location = Column(JSON) # GeoJSON polygon
    crop_type = Column(String)
    planting_date = Column(DateTime)
    expected_harvest_date = Column(DateTime)
    soil_type = Column(String)
    soil_ph = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    owner = relationship("User", back_populates="fields")
    analyses = relationship("Analysis", back_populates="field")

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    field_id = Column(String, ForeignKey("fields.id"))
    original_image_url = Column(String)
    analyzed_image_url = Column(String)
    analysis_type = Column(String) # pest_detection / nutrient / yield
    results_json = Column(JSON)
    confidence_score = Column(Float)
    processing_time_seconds = Column(Float)
    status = Column(String, default="queued") # queued, processing, completed, failed
    created_at = Column(DateTime, default=datetime.utcnow)
    
    field = relationship("Field", back_populates="analyses")

# Helper model for uploads if not using analyses directly yet
class Upload(Base):
    __tablename__ = "uploads"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String)
    content_type = Column(String)
    size = Column(Integer)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    generated_at = Column(DateTime, default=datetime.utcnow)
    summary = Column(Text)
    findings = Column(JSON)
    recommendations = Column(JSON)
