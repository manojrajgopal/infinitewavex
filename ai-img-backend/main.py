from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.ai_routes import router as ai_router
import os
from dotenv import load_dotenv
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi import Request, WebSocket
from fastapi.responses import JSONResponse

load_dotenv()

app = FastAPI(title="InfiniteWaveX AI API", version="1.0.0")

# Add HTTPS redirection middleware for production
if os.getenv("RENDER", "").lower() == "true" or os.getenv("ENVIRONMENT") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    api_key = websocket.query_params.get("api_key")
    expected_key = os.getenv("API_SECRET_KEY")

    if api_key != expected_key:
        await websocket.close(code=1008)  # policy violation
        return

    await websocket.accept()
    # From here you can send/receive messages
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo: {data}")
    except Exception as e:
        print("WebSocket closed:", e)
        
# Security middleware - Add this BEFORE other middleware
@app.middleware("http")
async def api_key_middleware(request: Request, call_next):
    # Skip authentication for these endpoints
    skip_paths = ["/", "/docs", "/redoc", "/openapi.json", "/favicon.ico"]
    
    if request.url.path.startswith("/api/ai-call-dialer/"):
        return await call_next(request)
    
    if request.url.path in skip_paths:
        return await call_next(request)
    
    # Get API key from header
    api_key = request.headers.get("X-API-Key")
    expected_key = os.getenv("API_SECRET_KEY")

    # Validate API key
    if not expected_key:
        return JSONResponse(
            status_code=500,
            content={"detail": "Server configuration error"}
        )
    
    if not api_key or api_key != expected_key:
        return JSONResponse(
            status_code=401,
            content={"detail": "Invalid API key"}
        )
    
    return await call_next(request)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=True)
@app.head("/")
async def root():
    return {"status": "ok", "message": "InfiniteWaveX AI Image API is running"}

# Include routes
app.include_router(ai_router, prefix="/api/ai-image", tags=["AI Image Generation"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
