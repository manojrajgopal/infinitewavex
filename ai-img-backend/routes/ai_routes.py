import base64
import time
import json
from io import BytesIO
from fastapi import APIRouter, HTTPException, Header
from PIL import Image
import openai
import os
from dotenv import load_dotenv
from models.generation_models import (
    API_KEY,
    MODEL_CACHE,
    get_model,
    GenerationRequest,
    GenerationResponse,
)

load_dotenv()

router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_enriched_prompts(user_prompt: str):
    prompt = f"""
    You are a prompt engineer for AI image generation.
    Given this user input prompt: "{user_prompt}"
    Generate:
    1. A detailed and descriptive prompt suitable for image generation.
    2. A negative prompt to avoid bad results (e.g., low quality, NSFW, distorted, blurry).

    Return only JSON in the following format:
    {{ "prompt": "...", "negative_prompt": "..." }}
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    result_text = response['choices'][0]['message']['content']
    return json.loads(result_text)

@router.post("/generate", response_model=GenerationResponse)
async def generate_image(request: GenerationRequest):
    valid_models = [
        "stabilityai/stable-diffusion-3.5-large",
        "stabilityai/stable-diffusion-3.5-large-turbo",
        "runwayml/stable-diffusion-v1-5",
        "stabilityai/stable-diffusion-2-1"
    ]
    if request.model not in valid_models:
        raise HTTPException(status_code=400, detail="Invalid model specified")
    
    try:
        pipe = get_model(request.model)
        start_time = time.time()

        enriched_prompts = generate_enriched_prompts(request.prompt)

        print("Enriched Prompts:", enriched_prompts)
        
        result = pipe(
            prompt=enriched_prompts['prompt'],
            negative_prompt=enriched_prompts['negative_prompt'],
            width=request.width,
            height=request.height,
            num_inference_steps=request.num_inference_steps,
            guidance_scale=request.guidance_scale,
            num_images_per_prompt=1,
            output_type="pil",
            callback_steps=5,
            callback=lambda i, t, latents: print(f"Step {i}/{request.num_inference_steps}")
        )

        generation_time = time.time() - start_time
        image = result.images[0]

        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()

        return GenerationResponse(
            image=f"data:image/png;base64,{img_str}",
            generation_time=generation_time,
            model_used=request.model
        )
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")
