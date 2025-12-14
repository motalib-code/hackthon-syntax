from fastapi.testclient import TestClient
from backend.app.main import app
from PIL import Image
import io

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "name": "AgriScan AI API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": ["/analyze"]
    }

def test_analyze_endpoint():
    # Create a dummy image
    img = Image.new('RGB', (100, 100), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    response = client.post(
        "/analyze",
        files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    )

    assert response.status_code == 200
    data = response.json()
    assert "image_id" in data
    assert "pest_detection" in data
    assert "nutrient_analysis" in data
    assert "yield_prediction" in data

    # Check nutrient analysis specifically for red image
    # VARI for pure red (0,0,255) in BGR:
    # G=0, R=1, B=0
    # VARI = (0 - 1) / (0 + 1 - 0) = -1
    # This should lead to low health score
    assert data["nutrient_analysis"]["overall_health"] == "Critical Deficiency"
