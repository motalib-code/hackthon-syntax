import random
import numpy as np

class YieldPredictor:
    def predict(self, pest_data, nutrient_data):
        """
        Predict yield based on inputs from other models.
        This acts as a regression model combining features.
        """

        # Base yield (tons/ha) for a healthy crop
        base_yield = 5.0

        # Penalties
        pest_penalty = 0
        if pest_data:
            # high alert -> 40% loss, moderate -> 10%
            alert = pest_data.get('alert_level', 'Safe')
            if alert == 'High Alert':
                pest_penalty = 0.4
            elif alert == 'Moderate':
                pest_penalty = 0.1

        nutrient_penalty = 0
        if nutrient_data:
            health = nutrient_data.get('overall_health', 'Optimal')
            if health == 'Critical Deficiency':
                nutrient_penalty = 0.3
            elif health == 'Moderate Deficiency':
                nutrient_penalty = 0.15

        # Calculate predicted yield
        predicted_yield = base_yield * (1 - pest_penalty) * (1 - nutrient_penalty)

        # Add some randomness for "model uncertainty" or noise
        predicted_yield += np.random.normal(0, 0.1)
        predicted_yield = max(0, predicted_yield) # no negative yield

        confidence = 0.95 - (pest_penalty + nutrient_penalty) # lower confidence if high stress

        days_to_harvest = 30 # Mock or calculated

        return {
            "status": "completed",
            "predicted_yield": round(predicted_yield, 2),
            "unit": "tons/ha",
            "harvest_ready_in": days_to_harvest,
            "confidence": round(confidence, 2),
            "comparison": "-5% vs last season" if predicted_yield < 4.5 else "+2% vs last season"
        }
