"""
API endpoint test script
"""
import requests
import json
from pathlib import Path

BASE_URL = "http://localhost:8000"

def test_root():
    """Test root endpoint"""
    print("Testing GET /")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"  Error: {e}")
        return False

def test_health():
    """Test health check endpoint"""
    print("\nTesting GET /health")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"  Status: {response.status_code}")
        print(f"  Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"  Error: {e}")
        return False

def test_upload():
    """Test image upload endpoint"""
    print("\nTesting POST /api/upload/image")
    try:
        # Create a dummy image file
        test_file = Path("test_image.jpg")
        if not test_file.exists():
            # Create a minimal valid JPEG file
            with open(test_file, "wb") as f:
                # Minimal JPEG header
                f.write(b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00')
                f.write(b'\xff\xd9')  # End of image
        
        with open(test_file, "rb") as f:
            files = {"file": ("test.jpg", f, "image/jpeg")}
            response = requests.post(f"{BASE_URL}/api/upload/image", files=files)
        
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"  Image ID: {data.get('image_id')}")
            print(f"  URL: {data.get('url')}")
            return True, data.get('image_id')
        else:
            print(f"  Error: {response.text}")
            return False, None
    except Exception as e:
        print(f"  Error: {e}")
        return False, None

def test_analysis(image_id):
    """Test analysis endpoints"""
    print("\nTesting POST /api/analysis/pest-detection")
    try:
        payload = {
            "field_id": "test-field-1",
            "image_id": image_id,
            "confidence_threshold": 0.75
        }
        response = requests.post(
            f"{BASE_URL}/api/analysis/pest-detection",
            json=payload
        )
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"  Analysis ID: {data.get('id')}")
            print(f"  Status: {data.get('status')}")
            return True, data.get('id')
        else:
            print(f"  Error: {response.text}")
            return False, None
    except Exception as e:
        print(f"  Error: {e}")
        return False, None

def test_get_analysis(analysis_id):
    """Test get analysis result endpoint"""
    print(f"\nTesting GET /api/analysis/{analysis_id}")
    try:
        import time
        # Wait a bit for processing
        print("  Waiting 6 seconds for analysis to complete...")
        time.sleep(6)
        
        response = requests.get(f"{BASE_URL}/api/analysis/{analysis_id}")
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"  Analysis Status: {data.get('status')}")
            if data.get('results_json'):
                print(f"  Results: {json.dumps(data.get('results_json'), indent=2)[:200]}...")
            return data.get('status') == 'completed'
        else:
            print(f"  Error: {response.text}")
            return False
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    print("=" * 60)
    print("AgriScan AI Backend - API Test")
    print("=" * 60)
    
    # Test basic endpoints
    if not test_root():
        print("\n✗ Root endpoint failed. Is the server running?")
        return
    
    if not test_health():
        print("\n✗ Health check failed")
        return
    
    # Test upload
    success, image_id = test_upload()
    if not success:
        print("\n✗ Upload test failed")
        return
    
    # Test analysis
    success, analysis_id = test_analysis(image_id)
    if not success:
        print("\n✗ Analysis test failed")
        return
    
    # Test get analysis result
    if not test_get_analysis(analysis_id):
        print("\n✗ Get analysis result failed")
        return
    
    print("\n" + "=" * 60)
    print("✓ All API tests passed!")
    print("=" * 60)

if __name__ == "__main__":
    main()
