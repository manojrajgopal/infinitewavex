# ml/model_loader.py
import torch
from diffusers import StableDiffusionPipeline
import os
import warnings

# Disable all xformers related functionality
os.environ['XFORMERS_DISABLED'] = '1'
warnings.filterwarnings("ignore", message=".*xformers.*")
warnings.filterwarnings("ignore", message=".*XFORMERS.*")

MODEL_PATH = r"D:\\infinitewavex\\infinitewavex\\backend\\models\\lora_custom\\Counterfeit-V2.5.safetensors"

def load_model():
    """
    Load Stable Diffusion base model and apply LoRA weights.
    Automatically uses GPU if available, else CPU.
    """
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"ℹ️ Using device: {device}")
    
    # Use appropriate dtype
    if device == "cuda":
        torch_dtype = torch.float16
    else:
        torch_dtype = torch.float32
        print("⚠️ Running on CPU - performance will be slow")

    base_model = "runwayml/stable-diffusion-v1-5"

    pipe = StableDiffusionPipeline.from_pretrained(
        base_model,
        torch_dtype=torch_dtype,
        safety_checker=None,
        requires_safety_checker=False
    ).to(device)

    # Disable any xformers attempts
    if hasattr(pipe, 'disable_xformers_memory_efficient_attention'):
        pipe.disable_xformers_memory_efficient_attention()

    # Apply LoRA weights
    # ml/model_loader.py - Update the LoRA loading section
    # Apply LoRA weights4
    print(f"[DEBUG] Current working directory: {os.getcwd()}")
    print(f"[DEBUG] Checking LoRA model path: {MODEL_PATH}")

    if os.path.exists(MODEL_PATH):
        try:
            # Try different loading methods
            if MODEL_PATH.endswith('.safetensors'):
                from safetensors.torch import load_file
                state_dict = load_file(MODEL_PATH)
                pipe.load_lora_weights(state_dict)
            else:
                pipe.load_lora_weights(MODEL_PATH, weight_dtype=torch_dtype)
            print(f"✅ LoRA loaded from {MODEL_PATH}")
        except Exception as e:
            print(f"⚠️ Failed to load LoRA from {MODEL_PATH}: {e}")
            print("⚠️ Running without LoRA weights")
    else:
        print(f"⚠️ LoRA not found at {MODEL_PATH}")
        alt_path = os.path.join("..", MODEL_PATH)
        print(f"[DEBUG] Checking alternative path: {alt_path}")
        if os.path.exists(alt_path):
            try:
                print(f"✅ Found LoRA at {alt_path}, attempting to load...")
                if alt_path.endswith('.safetensors'):
                    from safetensors.torch import load_file
                    state_dict = load_file(alt_path)
                    pipe.load_lora_weights(state_dict)
                else:
                    pipe.load_lora_weights(alt_path, weight_dtype=torch_dtype)
                print(f"✅ LoRA successfully loaded from {alt_path}")
            except Exception as e:
                print(f"⚠️ Failed to load LoRA from {alt_path}: {e}")
                print("⚠️ Running without LoRA weights")
        else:
            print(f"⚠️ LoRA not found at {alt_path}, running without it")

    return pipe

# Singleton
try:
    model_pipeline = load_model()
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Failed to load model: {e}")
    model_pipeline = None