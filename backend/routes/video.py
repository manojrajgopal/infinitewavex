from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from services.video_generator import generate_video_from_prompt
import uuid
import os

router = APIRouter()

# Request body schema
class VideoRequest(BaseModel):
    prompt: str
    num_frames: int = 16
    seed: int = None

# Background task for async generation
def generate_video_task(prompt, num_frames, seed, result_dict, video_id):
    try:
        video_path = generate_video_from_prompt(prompt, num_frames, seed)
        result_dict[video_id] = video_path
    except Exception as e:
        result_dict[video_id] = f"error: {str(e)}"

# Store generated videos temporarily
VIDEO_RESULTS = {}

@router.post("/generate")
async def generate_video(request: VideoRequest, background_tasks: BackgroundTasks):
    """
    Generate video from prompt
    """
    video_id = str(uuid.uuid4())
    VIDEO_RESULTS[video_id] = "processing"
    background_tasks.add_task(generate_video_task, request.prompt, request.num_frames, request.seed, VIDEO_RESULTS, video_id)
    return {"video_id": video_id, "status": "processing"}

@router.get("/status/{video_id}")
async def check_status(video_id: str):
    """
    Check generation status or get video path
    """
    if video_id not in VIDEO_RESULTS:
        raise HTTPException(status_code=404, detail="Video ID not found")
    status = VIDEO_RESULTS[video_id]
    return {"video_id": video_id, "status": status}

@router.get("/download/{video_id}")
async def download_video(video_id: str):
    """
    Download generated video
    """
    if video_id not in VIDEO_RESULTS or VIDEO_RESULTS[video_id] in ["processing"]:
        raise HTTPException(status_code=404, detail="Video not ready")
    video_path = VIDEO_RESULTS[video_id]
    from fastapi.responses import FileResponse
    return FileResponse(video_path, media_type="video/mp4", filename=os.path.basename(video_path))
