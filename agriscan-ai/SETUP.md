# AgriScan AI - Setup Guide

## Quick Start (Development Mode)

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher (for frontend)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**
   ```bash
   python run_dev.py
   ```

   The backend will be available at:
   - API: http://localhost:8000
   - API Docs: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at: http://localhost:5173

## Configuration

### Environment Variables

The backend uses a `.env` file for configuration. Default settings are already configured for development:

```env
ENVIRONMENT=development
DATABASE_URL=sqlite:///./agriscan.db
USE_CELERY=false
UPLOAD_DIR=./uploads
```

### Database

- **Development**: Uses SQLite (no setup required)
- **Production**: Can be configured to use PostgreSQL via `DATABASE_URL`

### Task Processing

- **Development**: Uses FastAPI BackgroundTasks (no Redis required)
- **Production**: Can enable Celery with Redis by setting `USE_CELERY=true`

## Testing the Application

1. **Start both backend and frontend**
2. **Open browser** to http://localhost:5173
3. **Upload an image** through the dashboard
4. **Click "Run Full Analysis"**
5. **Wait for results** (takes ~5 seconds per analysis)

## API Endpoints

### Upload Image
```bash
POST /api/upload/image
Content-Type: multipart/form-data

Response:
{
  "image_id": "uuid",
  "url": "/uploads/filename.jpg",
  "filename": "original.jpg"
}
```

### Pest Detection
```bash
POST /api/analysis/pest-detection
Content-Type: application/json

{
  "field_id": "field-123",
  "image_id": "image-uuid",
  "confidence_threshold": 0.75
}
```

### Nutrient Mapping
```bash
POST /api/analysis/nutrient-mapping
Content-Type: application/json

{
  "field_id": "field-123",
  "image_id": "image-uuid",
  "crop_type": "corn"
}
```

### Yield Prediction
```bash
POST /api/analysis/yield-prediction
Content-Type: application/json

{
  "field_id": "field-123",
  "image_id": "image-uuid",
  "historical_yield": 4.5
}
```

### Get Analysis Result
```bash
GET /api/analysis/{analysis_id}
```

### WebSocket (Real-time Updates)
```
ws://localhost:8000/ws/analysis/{analysis_id}
```

## Troubleshooting

### Backend won't start

**Error: Module not found**
```bash
# Make sure you're in the backend directory and virtual environment is activated
cd backend
pip install -r requirements.txt
```

**Error: Database locked**
```bash
# Delete the SQLite database and restart
rm agriscan.db
python run_dev.py
```

### Frontend can't connect to backend

**CORS Error**
- Make sure backend is running on port 8000
- Check that CORS is enabled in `app/main.py` (already configured)

**Connection Refused**
- Verify backend is running: http://localhost:8000/health
- Check firewall settings

### Upload fails

**File too large**
- Default max size is 500MB
- Adjust `MAX_UPLOAD_SIZE` in `.env`

**Invalid file type**
- Only JPG, PNG, and TIFF are supported
- Check file extension and MIME type

### Analysis stuck in "processing"

**WebSocket not connecting**
- Check browser console for errors
- Verify WebSocket endpoint: `ws://localhost:8000/ws/analysis/{id}`

**Background task not running**
- Check backend logs for errors
- Restart backend server

## Production Deployment

### Using Docker Compose

```bash
# Start all services (PostgreSQL, Redis, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Production Setup

1. **Set environment to production**
   ```env
   ENVIRONMENT=production
   DATABASE_URL=postgresql://user:pass@host:5432/agriscan
   USE_CELERY=true
   CELERY_BROKER_URL=redis://redis:6379/0
   ```

2. **Install production dependencies**
   ```bash
   pip install gunicorn
   ```

3. **Run with Gunicorn**
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
   ```

4. **Start Celery worker**
   ```bash
   celery -A app.celery_worker.celery_app worker --loglevel=info
   ```

## Project Structure

```
agriscan-ai/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application
│   │   ├── config.py         # Configuration settings
│   │   ├── database.py       # Database setup
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── tasks.py          # Background tasks
│   │   └── celery_worker.py  # Celery configuration
│   ├── .env                  # Environment variables
│   ├── run_dev.py           # Development server script
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main app component
│   └── package.json         # Node dependencies
└── docker-compose.yml       # Docker configuration
```

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs for error messages
3. Check browser console for frontend errors
4. Verify all services are running correctly
