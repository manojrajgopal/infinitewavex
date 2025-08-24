from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routes import (project_requests, newsletter, contact)

load_dotenv()

app = FastAPI(
    title="InfiniteWaveX API",
    description="API for handling project requests",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Your React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    project_requests.router, 
    prefix="/api/project-requests", 
    tags=["Project Requests"]
)

app.include_router(
    newsletter.router,
    prefix="/api/newsletter",
    tags=["Newsletter"]
)

app.include_router(
    contact.router,
    prefix="/api/contact",
    tags=["Contact"]
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "InfiniteWaveX API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
