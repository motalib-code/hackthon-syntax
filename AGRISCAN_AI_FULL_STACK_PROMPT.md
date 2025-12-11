# 🎯 COMPREHENSIVE FULL-STACK AGRISCAN AI APPLICATION PROMPT

> **Copy this entire prompt and paste into Claude, ChatGPT, or your AI code generator. This will generate a FULLY WORKING, PRODUCTION-READY application with animations, graphics, and complete functionality.**

---

## 📋 SYSTEM CONTEXT

You are an expert full-stack web application developer. Your task is to generate a **COMPLETE, WORKING** full-stack web application for **AgriScan AI** - a precision agriculture platform that detects pests, analyzes nutrient deficiency, and predicts crop yield using AI on drone imagery.

**This is for a hackathon submission. The application must be:**
- **Fully functional** (no placeholder code)
- **Visually stunning** with animations and graphics
- **Production-ready** architecture
- **Complete** with frontend, backend, database
- **Deployable** in one command

---

## 🏗️ ARCHITECTURE OVERVIEW

### TECHNOLOGY STACK

**Frontend:**
- React 18+ with Vite (lightning fast)
- TailwindCSS for modern styling
- Framer Motion for smooth animations
- Recharts/Chart.js for data visualization
- Leaflet.js for interactive farm map visualization
- Three.js for 3D field rendering (optional advanced feature)

**Backend:**
- Python 3.11 FastAPI (async, high-performance)
- SQLAlchemy ORM with PostgreSQL
- Celery for asynchronous task processing
- Redis for caching & real-time updates
- Socket.io for live progress updates

**AI/ML:**
- YOLOv8 (Ultralytics) for pest detection
- DeepLabV3+ (Segmentation Models) for nutrient mapping
- TensorFlow for yield prediction model
- OpenCV for image preprocessing
- Scikit-learn for data analysis

**DevOps & Deployment:**
- Docker & Docker Compose
- Nginx reverse proxy
- AWS S3 for image storage
- Gunicorn ASGI server
- GitHub Actions for CI/CD


---

## 📂 PROJECT STRUCTURE

```
agriscan-ai/
├── frontend/                    # React Vite application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── common/         # Buttons, Cards, Modals, Loaders
│   │   │   ├── layout/         # Navbar, Sidebar, Footer
│   │   │   ├── upload/         # DragDropZone, ImagePreview
│   │   │   ├── results/        # PestCard, NutrientChart, YieldGraph
│   │   │   ├── maps/           # LeafletMap, Heatmap, ZoneOverlay
│   │   │   ├── charts/         # BarChart, LineChart, RadarChart
│   │   │   └── animations/     # ParticleBackground, LoadingSpinner
│   │   ├── pages/              # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AnalysisPage.jsx
│   │   │   ├── ResultsPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── AuthPages.jsx   # Login, Register, ForgotPassword
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useWebSocket.js
│   │   │   ├── useAnalysis.js
│   │   │   └── useFileUpload.js
│   │   ├── services/           # API call utilities
│   │   │   ├── api.js          # Axios instance with interceptors
│   │   │   ├── authService.js
│   │   │   ├── analysisService.js
│   │   │   └── uploadService.js
│   │   ├── store/              # Zustand state management
│   │   │   ├── authStore.js
│   │   │   ├── analysisStore.js
│   │   │   └── uiStore.js
│   │   ├── styles/             # Global CSS & tailwind config
│   │   ├── utils/              # Helper functions
│   │   └── assets/             # Images, icons, Lottie animations
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── backend/                     # Python FastAPI application
│   ├── app/
│   │   ├── main.py             # FastAPI app initialization
│   │   ├── config.py           # Environment & database config
│   │   ├── models/             # SQLAlchemy ORM models
│   │   │   ├── user.py
│   │   │   ├── farm.py
│   │   │   ├── analysis.py
│   │   │   └── results.py
│   │   ├── schemas/            # Pydantic validation schemas
│   │   │   ├── user.py
│   │   │   ├── analysis.py
│   │   │   └── results.py
│   │   ├── routes/             # API endpoint definitions
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── farms.py
│   │   │   ├── upload.py
│   │   │   ├── analysis.py
│   │   │   └── results.py
│   │   ├── services/           # Business logic & AI processing
│   │   │   ├── auth_service.py
│   │   │   ├── analysis_service.py
│   │   │   ├── recommendation_service.py
│   │   │   └── export_service.py
│   │   ├── ml_models/          # AI/ML model handlers
│   │   │   ├── pest_detector.py      # YOLOv8 wrapper
│   │   │   ├── nutrient_analyzer.py  # DeepLabV3+ wrapper
│   │   │   ├── yield_predictor.py    # CNN Regressor wrapper
│   │   │   └── preprocessor.py       # Image preprocessing
│   │   ├── tasks/              # Celery async tasks
│   │   │   ├── celery_app.py
│   │   │   └── analysis_tasks.py
│   │   ├── utils/              # Helper functions
│   │   │   ├── security.py     # JWT, password hashing
│   │   │   ├── s3_client.py    # AWS S3 operations
│   │   │   └── validators.py
│   │   ├── websocket/          # WebSocket handlers
│   │   │   └── progress.py
│   │   └── database.py         # Database connection
│   ├── requirements.txt
│   ├── .env.example
│   ├── alembic/                # Database migrations
│   └── Dockerfile
│
├── ml_weights/                  # Pre-trained model weights
│   ├── yolov8_pest.pt
│   ├── deeplabv3_nutrient.pth
│   └── cnn_yield.h5
│
├── docker-compose.yml          # Multi-container orchestration
├── docker-compose.prod.yml     # Production configuration
├── nginx.conf                  # Nginx configuration
├── .github/workflows/          # CI/CD pipelines
│   └── deploy.yml
├── README.md
└── .gitignore
```


---

## 🎨 FRONTEND SPECIFICATION

### 1. LANDING PAGE (Animated Hero)

**Visual Design:**
- Gradient background: agricultural green (#10B981) to sky blue (#0EA5E9)
- Animated background particles (floating drone icons using tsParticles)
- Hero section with:
  - Main headline: **"AgriScan AI - Precision Agriculture Powered by AI"**
  - Subheadline: **"Transform Drone Imagery into Actionable Insights"**
  - CTA buttons: "Start Analysis" + "View Demo"
  - Scroll-triggered animations (fade-in, slide-up)

**Animated Sections:**

1. **Problem-Solution Carousel**
   - 5 cards sliding horizontally with Framer Motion
   - Each card shows: Problem → Solution → Impact
   - Auto-scroll with manual navigation dots
   - Hover effects with elevation & shadow (translateY: -10px)

2. **Statistics Dashboard** (Counter animations)
   - "500+ Hectares Analyzed" → animated number counter (react-countup)
   - "90% Fertilizer Waste Reduction" → progress bar animation
   - "28% Market CAGR" → growth chart animation
   - "4 Weeks Harvest Prediction" → timeline visualization

3. **Technology Stack Showcase**
   - Animated tech logos grid (YOLOv8, TensorFlow, FastAPI, React)
   - Hover to reveal tech details with tooltip
   - Staggered animation on page load (0.1s delay between items)

4. **Feature Cards** (3D tilt effect using react-tilt)
   - 🐛 Pest Detection card (with animated bug icon)
   - 🌿 Nutrient Analysis card (with plant growth animation)
   - 📊 Yield Prediction card (with harvest animation)

**Animation Code Pattern (Framer Motion):**
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

---

### 2. DASHBOARD PAGE (Core Application)

**Layout:**
- Collapsible sidebar navigation with smooth transitions (width: 280px → 80px)
- Top navbar with user profile dropdown, notifications bell, settings gear
- Main content area with tabbed sections

**Tab 1: Image Upload & Analysis**

**Upload Zone Component:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ┌─────────────────────────────────────────────────┐     │
│     │                                                 │     │
│     │         🚁 Drag & Drop Drone Image             │     │
│     │                                                 │     │
│     │         or click to browse files               │     │
│     │                                                 │     │
│     │    Supported: JPG, PNG, TIFF, GeoTIFF          │     │
│     │    Max size: 50MB                              │     │
│     │                                                 │     │
│     └─────────────────────────────────────────────────┘     │
│                                                             │
│     [Image Preview Thumbnail]  [Metadata Display]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Upload Animation States:**
- Default: Dashed border with pulse animation
- Drag Over: Border color change + scale(1.02) + glow effect
- Uploading: Progress bar with percentage + file icon floating animation
- Complete: Green checkmark with bounce animation

**Analysis Selector (3 Options):**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │  🐛 PEST        │  │  🌿 NUTRIENT    │  │  📊 YIELD   │  │
│  │  DETECTION      │  │  ANALYSIS       │  │  FORECAST   │  │
│  │                 │  │                 │  │             │  │
│  │  YOLOv8         │  │  DeepLabV3+     │  │  CNN        │  │
│  │  Real-time      │  │  Segmentation   │  │  Regressor  │  │
│  │                 │  │                 │  │             │  │
│  │  [SELECT]       │  │  [SELECT]       │  │  [SELECT]   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│                                                             │
│              [ 🚀 RUN ALL ANALYSES ]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Processing Animation (3-Phase Progress):**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ANALYZING YOUR CROP IMAGE...                              │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│   └─────────────────────────────────────────────────────┘   │
│                        45%                                  │
│                                                             │
│   Phase 2 of 3: AI Analysis                                 │
│   ⏳ Running YOLOv8 pest detection model...                 │
│                                                             │
│   ✅ Phase 1: Preprocessing (Complete)                      │
│   🔄 Phase 2: AI Analysis (In Progress)                     │
│   ⏸️ Phase 3: Visualization (Pending)                       │
│                                                             │
│   [Animated spinner with model name]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```


---

### Tab 2: Results Visualization

**Split-Scr