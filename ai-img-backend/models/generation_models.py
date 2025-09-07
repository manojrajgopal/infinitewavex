import os
import torch
from pydantic import BaseModel
from typing import Optional
from diffusers import StableDiffusion3Pipeline, StableDiffusionPipeline, DPMSolverMultistepScheduler

# Configuration
API_KEY = os.getenv("API_SECRET_KEY")
MODEL_CACHE = {}

class GenerationRequest(BaseModel):
    prompt: str
    negative_prompt: Optional[str] = ""
    width: int = 512
    height: int = 512
    num_inference_steps: int = 20
    guidance_scale: float = 7.5
    model: str = "stabilityai/stable-diffusion-3.5-large"

class GenerationResponse(BaseModel):
    image: str
    generation_time: float
    model_used: str

def get_model(model_name: str):
    if model_name not in MODEL_CACHE:
        print(f"Loading model: {model_name}")
        
        if "stable-diffusion-3" in model_name:
            pipe = StableDiffusion3Pipeline.from_pretrained(
                model_name,
                torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            )
        else:
            pipe = StableDiffusionPipeline.from_pretrained(
                model_name,
                torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            )

        # Replace scheduler to prevent hanging
        pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)

        if torch.cuda.is_available():
            pipe = pipe.to("cuda")

        MODEL_CACHE[model_name] = pipe
    
    return MODEL_CACHE[model_name]