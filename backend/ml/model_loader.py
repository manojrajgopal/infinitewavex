import torch
from diffusers import StableDiffusionPipeline
import os

MODEL_PATH = "models/lora_custom/Counterfeit-V2.5.safetensors"

def load_model():
    """
    Load Stable Diffusion base model and apply LoRA weights.
    Automatically uses GPU if available, else CPU.
    """
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"ℹ️ Using device: {device}")

    base_model = "runwayml/stable-diffusion-v1-5"

    pipe = StableDiffusionPipeline.from_pretrained(
        base_model,
        torch_dtype=torch.float16 if device=="cuda" else torch.float32
    ).to(device)

    # Apply LoRA weights
    if os.path.exists(MODEL_PATH):
        try:
            pipe.load_lora_weights(MODEL_PATH, weight_dtype=torch.float16 if device=="cuda" else torch.float32)
            print(f"✅ LoRA loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"⚠️ Failed to load LoRA: {e}")
    else:
        print(f"⚠️ LoRA not found at {MODEL_PATH}, running without it")

    return pipe

# Singleton
model_pipeline = load_model()
