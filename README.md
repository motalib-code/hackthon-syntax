# AgriScan AI – Drone-Powered Precision Farming

🌾 AI-powered drone image analysis for pest detection, nutrient monitoring, and yield prediction.

**Built for Smart India Hackathon 2025**

## 🚀 Quick Start

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Server runs at: http://localhost:8000

### Frontend (React + Tailwind)

```bash
cd frontend
npm install
npm run start
```

App runs at: http://localhost:3000

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload-image` | POST | Upload drone imagery |
| `/api/analyze/pests` | POST | YOLOv8 pest detection |
| `/api/analyze/nutrients` | POST | DeepLabV3+ nutrient analysis |
| `/api/analyze/yield` | POST | CNN yield prediction |
| `/api/analyze/full` | GET | Complete analysis pipeline |
| `/api/demo-data` | GET | Sample demo data |

## 🎯 Features

- **Pest Detection**: YOLOv8 real-time detection (simulated)
- **Nutrient Analysis**: NDVI-based N/P/K deficiency mapping
- **Yield Prediction**: CNN-Regressor harvest forecasting
- **Interactive Dashboard**: Dark theme with field map visualization
- **Report Download**: Export spray maps and NPK plans

## 📁 Project Structure

```
hackthon syntax/
├── backend/
│   ├── main.py              # FastAPI app
│   └── requirements.txt     # Python deps
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js           # Main dashboard
│   │   └── App.css          # Tailwind styles
│   ├── tailwind.config.js
│   └── package.json
├── index.html               # Landing page
├── styles.css               # Landing page styles
└── script.js                # Landing page animations
```

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, Uvicorn
- **Frontend**: React, Tailwind CSS
- **AI Models**: YOLOv8, DeepLabV3+, CNN-Regressor (mocked)
- **Geospatial**: NDVI/NDRE analysis simulation

## 📊 Demo Data

The prototype uses mock AI responses. Upload any image to see:
- Random pest detections with confidence scores
- NPK deficiency percentages
- Yield predictions with harvest timeline

---

*AgriScan AI - Proactive Farming, Not Reactive*
