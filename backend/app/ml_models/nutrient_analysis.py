import cv2
import numpy as np

class NutrientAnalyzer:
    def analyze(self, image_path=None, image_bytes=None):
        """
        Analyze plant health using VARI (Visible Atmospherically Resistant Index)
        since we usually only have RGB images from standard drones/phones.
        VARI = (Green - Red) / (Green + Red - Blue)
        """
        if image_path:
            img = cv2.imread(image_path)
        elif image_bytes:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        else:
            raise ValueError("No image provided")

        if img is None:
            raise ValueError("Could not decode image")

        # Convert to float for calculation
        img_float = img.astype(np.float32) / 255.0

        # Split channels (OpenCV is BGR)
        b, g, r = cv2.split(img_float)

        # Calculate VARI
        # Avoid division by zero
        denominator = g + r - b
        denominator[denominator == 0] = 0.00001

        vari = (g - r) / denominator

        # Mean VARI score as a proxy for health
        # VARI typically ranges from -1 to 1.
        # Higher values (green) -> Healthy vegetation
        avg_vari = np.mean(vari)

        # Simulate nutrient levels based on visual health index
        # This connects "real" image processing (VARI) to "domain" logic (Nutrients)

        # Normalize VARI (-0.2 to 0.5 is typical vegetation range) to a 0-100 health score
        health_score = np.clip((avg_vari + 0.2) / 0.7 * 100, 0, 100)

        # Derive specific nutrients from general health (heuristic)
        # In a real system, we'd need multispectral data for specific N/P/K
        nitrogen = np.clip(health_score * 0.4 + np.random.normal(0, 5), 0, 50) # Max 50 usually
        phosphorus = np.clip(health_score * 0.3 + np.random.normal(0, 5), 0, 50)
        potassium = np.clip(health_score * 0.3 + np.random.normal(0, 5), 0, 50)

        max_def = max(50 - nitrogen, 50 - phosphorus, 50 - potassium)

        if health_score < 40:
            overall_health = "Critical Deficiency"
        elif health_score < 70:
            overall_health = "Moderate Deficiency"
        else:
            overall_health = "Optimal"

        zones = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
        # Randomly affect zones based on score (lower score -> more affected zones)
        num_affected = int((100 - health_score) / 100 * 5)
        affected = zones[:num_affected] if num_affected > 0 else []

        return {
            "status": "completed",
            "overall_health": overall_health,
            "deficiencies": {
                "nitrogen": round(float(nitrogen), 1),
                "phosphorus": round(float(phosphorus), 1),
                "potassium": round(float(potassium), 1)
            },
            "avg_vari_index": round(float(avg_vari), 3),
            "affected_zones": affected,
            "recommendation": f"Apply balanced fertilizer in zones {', '.join(affected)}" if affected else "Maintain current fertilization schedule."
        }
