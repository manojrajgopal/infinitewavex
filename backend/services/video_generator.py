import os
import torch
import cv2
import imageio
import numpy as np
from PIL import Image
from pathlib import Path
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
from realesrgan import RealESRGANer
from config import DEVICE, TEMP_FRAMES_DIR, TEMP_VIDEO_DIR, STABLE_DIFFUSION_MODEL, FRAME_RATE, RESOLUTION

os.makedirs(TEMP_FRAMES_DIR, exist_ok=True)
os.makedirs(TEMP_VIDEO_DIR, exist_ok=True)

# Use the correct LoRA path - point to the actual file, not directory
LOADED_LORA_PATH = "models/lora_custom/Counterfeit-V2.5.safetensors"

# 1️⃣ Stable Diffusion pipeline - FIXED for CPU/GPU compatibility
if DEVICE.type == 'cuda':
    torch_dtype = torch.float16
else:
    torch_dtype = torch.float32  # Use float32 on CPU

pipe = StableDiffusionPipeline.from_pretrained(
    STABLE_DIFFUSION_MODEL,
    torch_dtype=torch_dtype,
    safety_checker=None,
    requires_safety_checker=False
).to(DEVICE)

# Load LoRA weights if they exist
if os.path.exists(LOADED_LORA_PATH):
    try:
        pipe.load_lora_weights(LOADED_LORA_PATH)
        print("LoRA weights loaded successfully")
    except Exception as e:
        print(f"Failed to load LoRA weights: {e}")
else:
    print(f"LoRA path not found: {LOADED_LORA_PATH}")

pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_attention_slicing()

# Only enable xformers on CUDA
if DEVICE.type == 'cuda' and hasattr(pipe, 'enable_xformers_memory_efficient_attention'):
    try:
        pipe.enable_xformers_memory_efficient_attention()
        print("Xformers enabled")
    except Exception as e:
        print(f"Xformers not available: {e}")

# 2️⃣ Real-ESRGAN for upscaling - FIXED for CPU
model_path = "RealESRGAN_x2plus.pth"
if not os.path.exists(model_path):
    try:
        from basicsr.utils.download_util import load_file_from_url
        model_url = 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.1/RealESRGAN_x2plus.pth'
        model_path = load_file_from_url(model_url, model_dir='models')
        print(f"Downloaded RealESRGAN model to: {model_path}")
    except Exception as e:
        print(f"Failed to download RealESRGAN model: {e}")
        model_path = None

if model_path and os.path.exists(model_path):
    upscaler = RealESRGANer(
        scale=2,
        model_path=model_path,
        device=DEVICE,
        tile=400,
        tile_pad=10,
        pre_pad=0
    )
    print("RealESRGAN upscaler initialized")
else:
    upscaler = None
    print("RealESRGAN upscaler not available")

def generate_base_image(prompt, seed=None):
    """Generate base image with proper device handling"""
    generator = torch.Generator(device=DEVICE).manual_seed(seed) if seed else None
    
    # Use autocast only on CUDA
    if DEVICE.type == 'cuda':
        with torch.autocast(DEVICE.type):
            result = pipe(
                prompt=prompt,
                guidance_scale=7.5,
                generator=generator,
                num_inference_steps=20
            )
    else:
        # On CPU, don't use autocast
        result = pipe(
            prompt=prompt,
            guidance_scale=7.5,
            generator=generator,
            num_inference_steps=20
        )
    
    image = result.images[0]
    return image.resize(RESOLUTION)

def generate_animated_frames(prompt, num_frames=16, seed=None):
    """Generate base frames with slight variations"""
    frames = []
    base_image = generate_base_image(prompt, seed)
    frames.append(np.array(base_image))

    # Generate variations of the base image
    for i in range(1, num_frames):
        variation_seed = seed + i if seed else None
        try:
            frame_image = generate_base_image(prompt, variation_seed)
            frames.append(np.array(frame_image))
        except Exception as e:
            print(f"Failed to generate frame {i}: {e}")
            # Use the base image as fallback
            frames.append(np.array(base_image))
    
    return frames

def interpolate_frames_rife(frames):
    """Simple frame interpolation"""
    try:
        print("Using simple interpolation")
        interpolated_frames = []
        for i in range(len(frames)-1):
            interpolated_frames.append(frames[i])
            # Simple blend interpolation
            mid_frame = cv2.addWeighted(frames[i], 0.5, frames[i+1], 0.5, 0)
            interpolated_frames.append(mid_frame)
        interpolated_frames.append(frames[-1])
        return interpolated_frames
    except Exception as e:
        print(f"Interpolation failed: {e}")
        return frames  # Return original frames if interpolation fails

def upscale_frames(frames):
    """Upscale frames if upscaler is available"""
    if upscaler is None:
        print("Upscaler not available, returning original frames")
        return frames
    
    upscaled = []
    for i, f in enumerate(frames):
        try:
            # Convert RGB to BGR for OpenCV
            img_bgr = cv2.cvtColor(f, cv2.COLOR_RGB2BGR)
            
            # Upscale the image
            output, _ = upscaler.enhance(img_bgr, outscale=2)
            
            # Convert back to RGB
            output_rgb = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)
            upscaled.append(output_rgb)
        except Exception as e:
            print(f"Upscaling frame {i} failed: {e}")
            upscaled.append(f)  # Use original if upscaling fails
    
    return upscaled

def save_video(frames, video_name="output.mp4"):
    video_path = os.path.join(TEMP_VIDEO_DIR, video_name)
    
    # Ensure frames are uint8
    frames_uint8 = [frame.astype(np.uint8) for frame in frames]
    
    try:
        # Use imageio with proper codec
        writer = imageio.get_writer(
            video_path, 
            fps=FRAME_RATE, 
            codec='libx264',
            quality=8
        )
        
        for f in frames_uint8:
            writer.append_data(f)
        writer.close()
        
        return video_path
    except Exception as e:
        print(f"Failed to save video: {e}")
        return None

def generate_video_from_prompt(prompt, num_frames=16, seed=None):
    """Full upgraded pipeline"""
    print(f"Generating video for prompt: {prompt}")
    
    try:
        # Generate base frames
        frames = generate_animated_frames(prompt, num_frames, seed)
        print(f"Generated {len(frames)} base frames")
        
        # Interpolate frames
        frames = interpolate_frames_rife(frames)
        print(f"After interpolation: {len(frames)} frames")
        
        # Upscale frames
        frames = upscale_frames(frames)
        print(f"After upscaling: {len(frames)} frames")
        
        # Save video
        video_path = save_video(frames)
        if video_path:
            print(f"Video saved to: {video_path}")
            return video_path
        else:
            print("Failed to save video")
            return None
            
    except Exception as e:
        print(f"Video generation failed: {e}")
        import traceback
        traceback.print_exc()
        return None