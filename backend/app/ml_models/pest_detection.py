from ultralytics import YOLO
import numpy as np
from PIL import Image

class PestDetector:
    def __init__(self, model_path="yolov8n.pt"):
        # Load a pretrained YOLOv8n model
        self.model = YOLO(model_path)

    def predict(self, image_data):
        """
        Run inference on an image.
        image_data: PIL Image or numpy array
        """
        results = self.model(image_data)

        detections = []
        pest_counts = {}

        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Class id
                cls_id = int(box.cls[0])
                # Class name
                label = result.names[cls_id]
                # Confidence
                conf = float(box.conf[0])
                # Bounding box
                x1, y1, x2, y2 = box.xyxy[0].tolist()

                detections.append({
                    "label": label,
                    "confidence": round(conf, 2),
                    "bbox": {
                        "x": int(x1),
                        "y": int(y1),
                        "width": int(x2 - x1),
                        "height": int(y2 - y1)
                    }
                })

                pest_counts[label] = pest_counts.get(label, 0) + 1

        # Determine alert level
        total_pests = len(detections)
        if total_pests == 0:
            alert_level = "Safe"
            recommendation = "No immediate action required. Continue routine monitoring."
        elif total_pests <= 2:
            alert_level = "Moderate"
            recommendation = "Apply targeted organic pesticide in affected zones within 48 hours."
        else:
            alert_level = "High Alert"
            recommendation = "Urgent: Apply broad-spectrum treatment immediately."

        return {
            "status": "completed",
            "alert_level": alert_level,
            "pests_detected": detections,
            "total_pests": total_pests,
            "recommendation": recommendation
        }
