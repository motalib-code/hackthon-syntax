"""
Development server startup script for AgriScan AI Backend
"""
import os
import sys
from pathlib import Path

# Add app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

def main():
    """Start the development server"""
    print("=" * 60)
    print("AgriScan AI - Development Server")
    print("=" * 60)
    
    # Load environment variables
    from dotenv import load_dotenv
    env_file = app_dir / ".env"
    if env_file.exists():
        load_dotenv(env_file)
        print(f"✓ Loaded environment from {env_file}")
    else:
        print(f"⚠ No .env file found, using defaults")
    
    # Import settings to verify configuration
    from app.config import settings
    print(f"\nConfiguration:")
    print(f"  Environment: {settings.ENVIRONMENT}")
    print(f"  Database: {settings.DATABASE_URL}")
    print(f"  Celery: {'Enabled' if settings.USE_CELERY else 'Disabled (using background tasks)'}")
    print(f"  Upload Directory: {settings.UPLOAD_DIR}")
    
    # Create necessary directories
    upload_dir = Path(settings.UPLOAD_DIR)
    upload_dir.mkdir(exist_ok=True)
    print(f"\n✓ Upload directory ready: {upload_dir.absolute()}")
    
    # Start server
    print("\n" + "=" * 60)
    print("Starting server on http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("=" * 60 + "\n")
    
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
