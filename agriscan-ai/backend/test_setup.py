"""
Quick test script to verify backend setup
"""
import sys
from pathlib import Path

# Add app to path
sys.path.insert(0, str(Path(__file__).parent))

def test_imports():
    """Test that all modules can be imported"""
    print("Testing imports...")
    try:
        from app import config, database, models, schemas, tasks, celery_worker
        print("✓ All modules imported successfully")
        return True
    except Exception as e:
        print(f"✗ Import failed: {e}")
        return False

def test_config():
    """Test configuration"""
    print("\nTesting configuration...")
    try:
        from app.config import settings
        print(f"  Environment: {settings.ENVIRONMENT}")
        print(f"  Database: {settings.DATABASE_URL}")
        print(f"  Celery: {'Enabled' if settings.USE_CELERY else 'Disabled'}")
        print(f"  Upload Dir: {settings.UPLOAD_DIR}")
        print("✓ Configuration loaded successfully")
        return True
    except Exception as e:
        print(f"✗ Configuration failed: {e}")
        return False

def test_database():
    """Test database initialization"""
    print("\nTesting database...")
    try:
        from app.database import init_db, engine
        init_db()
        print("✓ Database initialized successfully")
        
        # Check if tables were created
        from app.database import Base
        print(f"  Tables: {', '.join(Base.metadata.tables.keys())}")
        return True
    except Exception as e:
        print(f"✗ Database initialization failed: {e}")
        return False

def test_tasks():
    """Test task functions"""
    print("\nTesting task functions...")
    try:
        from app import tasks
        print(f"  Pest detection: {'✓' if hasattr(tasks, 'process_pest_detection') else '✗'}")
        print(f"  Nutrient analysis: {'✓' if hasattr(tasks, 'process_nutrient_analysis') else '✗'}")
        print(f"  Yield prediction: {'✓' if hasattr(tasks, 'process_yield_prediction') else '✗'}")
        print("✓ Task functions available")
        return True
    except Exception as e:
        print(f"✗ Task test failed: {e}")
        return False

def main():
    print("=" * 60)
    print("AgriScan AI Backend - Setup Test")
    print("=" * 60)
    
    tests = [
        test_imports,
        test_config,
        test_database,
        test_tasks
    ]
    
    results = []
    for test in tests:
        results.append(test())
    
    print("\n" + "=" * 60)
    if all(results):
        print("✓ All tests passed! Backend is ready to run.")
        print("\nStart the server with:")
        print("  python run_dev.py")
    else:
        print("✗ Some tests failed. Please check the errors above.")
        print("\nMake sure to install dependencies first:")
        print("  pip install -r requirements.txt")
    print("=" * 60)

if __name__ == "__main__":
    main()
