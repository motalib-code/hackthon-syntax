# AgriScan AI - Quick Start Guide

## Start Backend

```bash
cd backend
python run_dev.py
```

Backend will run on: **http://localhost:8000**

## Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on: **http://localhost:5173**

## Test the Application

1. Open browser: http://localhost:5173
2. Navigate to Dashboard
3. Upload a drone image (JPG, PNG, or TIFF)
4. Click "Run Full Analysis"
5. Wait ~15 seconds for results
6. View pest detection, nutrient mapping, and yield prediction

## API Documentation

Interactive API docs: **http://localhost:8000/docs**

## Common Commands

### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Test Backend
```bash
cd backend
python test_setup.py  # Verify setup
python test_api.py    # Test API endpoints
```

### Check Backend Health
```bash
curl http://localhost:8000/health
```

## Environment Configuration

Backend uses `.env` file in `backend/` directory:

```env
ENVIRONMENT=development
DATABASE_URL=sqlite:///./agriscan.db
USE_CELERY=false
UPLOAD_DIR=./uploads
```

## Troubleshooting

**Backend won't start:**
- Install dependencies: `pip install -r requirements.txt`
- Check Python version: `python --version` (need 3.8+)

**Frontend won't start:**
- Install dependencies: `npm install`
- Check Node version: `node --version` (need 16+)

**Can't connect:**
- Ensure backend is running on port 8000
- Ensure frontend is running on port 5173
- Check firewall settings

## File Structure

```
agriscan-ai/
├── backend/
│   ├── app/              # Application code
│   ├── .env             # Configuration
│   ├── run_dev.py       # Start script
│   └── agriscan.db      # SQLite database (auto-created)
├── frontend/
│   └── src/             # React application
└── SETUP.md             # Detailed setup guide
```
