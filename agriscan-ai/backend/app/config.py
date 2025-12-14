import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriScan AI"
    API_V1_STR: str = "/api"
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Database - Use SQLite for development, PostgreSQL for production
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./agriscan.db" if os.getenv("ENVIRONMENT", "development") == "development" 
        else "postgresql://postgres:postgres@localhost:5432/agriscan"
    )
    
    # Celery - Optional for development
    USE_CELERY: bool = os.getenv("USE_CELERY", "false").lower() == "true"
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
    
    # File Upload
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    MAX_UPLOAD_SIZE: int = int(os.getenv("MAX_UPLOAD_SIZE", "524288000"))  # 500MB
    
    class Config:
        case_sensitive = True

settings = Settings()
