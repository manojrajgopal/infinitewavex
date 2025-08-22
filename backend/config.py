import torch

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Frame settings
FRAME_RATE = 8         # Initial FPS, can increase later
RESOLUTION = (512, 512)

# Temp storage for frames
TEMP_FRAMES_DIR = "backend/temp/frames/"
TEMP_VIDEO_DIR = "backend/temp/videos/"

# Model paths / weights
STABLE_DIFFUSION_MODEL = "runwayml/stable-diffusion-v1-5"
ANIMATEDIFF_MODEL = "AnimateDiff/AnimateDiff-v1.0"
CONTROLNET_MODEL = "lllyasviel/sd-controlnet-depth"
