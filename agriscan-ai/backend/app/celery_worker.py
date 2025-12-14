from celery import Celery
from app.config import settings

# Only initialize Celery if USE_CELERY is enabled
celery_app = None

if settings.USE_CELERY:
    try:
        celery_app = Celery(
            "worker",
            broker=settings.CELERY_BROKER_URL,
            backend=settings.CELERY_RESULT_BACKEND
        )
        
        celery_app.conf.task_routes = {
            "app.tasks.*": {"queue": "main-queue"},
        }
    except Exception as e:
        print(f"Warning: Celery initialization failed: {e}")
        print("Falling back to synchronous task execution")
        celery_app = None
else:
    print("Celery disabled - using synchronous task execution")
