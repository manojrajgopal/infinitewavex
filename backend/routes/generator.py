from fastapi import APIRouter
from pydantic import BaseModel
from ml.model_loader import model_pipeline  # Our fixed loader
import os

router = APIRouter()

# Request body schema
class PromptRequest(BaseModel):
    prompt: str
    negative_prompt: str | None = None

# Ensure generated folder exists
os.makedirs("generated", exist_ok=True)

@router.post("/generate")
async def generate_image(request: PromptRequest):
    """
    Generate an image using Counterfeit-V2.5 safetensors
    """
    try:
        # Run inference
        image = model_pipeline(
            prompt=request.prompt,
            negative_prompt=request.negative_prompt,
            num_inference_steps=30,  # Increase for higher quality
            guidance_scale=7.5
        ).images[0]

        # Save output
        save_path = f"generated/{request.prompt.replace(' ', '_')}.png"
        image.save(save_path)

        return {"message": "Image generated successfully", "path": save_path}

    except Exception as e:
        return {"error": str(e)}
