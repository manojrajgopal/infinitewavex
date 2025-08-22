# backend/model_manager.py
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from pathlib import Path

LORA_DIR = Path("models/lora_custom")

class ModelManager:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.pipeline = None
    
    def load_model(self, base_model="stabilityai/stable-diffusion-2-1", lora_file="Counterfeit-V2.5.safetensors"):
        print("⏳ Loading base model...")
        self.pipeline = StableDiffusionPipeline.from_pretrained(
            base_model,
            torch_dtype=torch.float16
        )
        self.pipeline.scheduler = DPMSolverMultistepScheduler.from_config(self.pipeline.scheduler.config)
        self.pipeline = self.pipeline.to(self.device)

        # Load LoRA
        lora_path = LORA_DIR / lora_file
        if lora_path.exists():
            print(f"✅ Loading LoRA: {lora_path}")
            self.pipeline.load_lora_weights(str(lora_path), weight_dtype=torch.float16)
        else:
            print(f"⚠️ LoRA file not found: {lora_path}")
        
        return self.pipeline
    
    def generate(self, prompt: str, negative_prompt: str = "", steps: int = 30, guidance: float = 7.5):
        if not self.pipeline:
            raise RuntimeError("Model not loaded yet. Call load_model first.")
        
        with torch.autocast("cuda"):
            image = self.pipeline(
                prompt=prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=steps,
                guidance_scale=guidance
            ).images[0]
        return image
