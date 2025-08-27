from fastapi import APIRouter, Form, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import Response
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse, Gather
import openai
import os
import logging
from dotenv import load_dotenv
import urllib.parse
from datetime import datetime
import requests
import asyncio
import json
from database import get_database

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

router = APIRouter()

# Twilio credentials
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")
client = Client(TWILIO_SID, TWILIO_AUTH) if TWILIO_SID and TWILIO_AUTH else None

# OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                self.disconnect(connection)

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Get base URL based on environment
def get_base_url():
    if os.getenv("RENDER", "").lower() == "true" or os.getenv("ENVIRONMENT") == "production":
        # In production, use the Render URL
        return f"https://{os.getenv('RENDER_EXTERNAL_HOSTNAME', 'your-render-app.onrender.com')}"
    else:
        # In development, try to get ngrok URL or use localhost
        try:
            response = requests.get("http://127.0.0.1:4040/api/tunnels", timeout=2)
            tunnels = response.json()["tunnels"]
            for tunnel in tunnels:
                if tunnel["proto"] == "https":
                    return tunnel["public_url"]
            return os.getenv("BASE_URL", "http://localhost:8000")
        except:
            return os.getenv("BASE_URL", "http://localhost:8000")

# Store conversation contexts (in production, use Redis or database)
conversations = {}

def get_conversation_context(call_sid):
    """Get or create conversation context for a call"""
    if call_sid not in conversations:
        conversations[call_sid] = {
            "messages": [
                {"role": "system", "content": "You are a friendly AI assistant having a phone conversation. Keep responses concise (20-30 words max) and natural for speech."}
            ],
            "start_time": datetime.now(),
            "last_activity": datetime.now()
        }
    return conversations[call_sid]["messages"]

def update_conversation_context(call_sid, role, content):
    """Update conversation context with new message"""
    if call_sid not in conversations:
        conversations[call_sid] = {
            "messages": [
                {"role": "system", "content": "You are a friendly AI assistant having a phone conversation. Keep responses concise (20-30 words max) and natural for speech."}
            ],
            "start_time": datetime.now(),
            "last_activity": datetime.now()
        }
    
    conversations[call_sid]["messages"].append({"role": role, "content": content})
    conversations[call_sid]["last_activity"] = datetime.now()
    
    # Keep only last 6 messages to avoid context overflow
    if len(conversations[call_sid]["messages"]) > 6:
        conversations[call_sid]["messages"] = conversations[call_sid]["messages"][-6:]

# Add this endpoint to handle incoming calls
@router.post("/incoming_call")
@router.get("/incoming_call")  # Support both GET and POST for Twilio webhooks
async def handle_incoming_call(request: Request):
    """
    Handle incoming calls to your Twilio number
    """
    try:
        # Get form data from Twilio
        form_data = dict(await request.form())
        call_sid = form_data.get("CallSid", f"incoming_{datetime.now().timestamp()}")
        from_number = form_data.get("From", "Unknown")
        
        logger.info(f"📞 Incoming call from: {from_number}, Call SID: {call_sid}")
        
        # Generate welcome message using OpenAI
        welcome_messages = [
            {"role": "system", "content": "You are a friendly AI assistant answering an incoming phone call. Greet the caller warmly and ask how you can help them. Keep it concise (10-20 words)."},
            {"role": "user", "content": "Create a welcoming greeting for an incoming call."}
        ]
        
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=welcome_messages,
            max_tokens=50
        )
        welcome_text = response.choices[0].message.content
        
        logger.info(f"🤖 Welcome message: {welcome_text}")
        
        # Initialize conversation context for this call
        update_conversation_context(call_sid, "assistant", welcome_text)
        
        # Create TwiML response
        vr = VoiceResponse()
        
        # Speak welcome message
        vr.say(welcome_text, voice="alice", language="en-US")
        
        # Get the current base URL
        base_url = get_base_url()
        
        # Gather speech input from caller
        gather = Gather(
            input="speech", 
            action=f"{base_url}/api/ai-call-dialer/process_speech?call_sid={call_sid}", 
            method="POST",
            timeout=5,
            speechTimeout="auto",
            enhanced=True
        )
        vr.append(gather)
        
        # If no input, redirect to keep the call alive
        vr.redirect(f"{base_url}/api/ai-call-dialer/incoming_call_fallback?call_sid={call_sid}")
        
        return Response(content=str(vr), media_type="application/xml")
        
    except Exception as e:
        logger.error(f"❌ Error handling incoming call: {str(e)}")
        # Fallback response if something goes wrong
        vr = VoiceResponse()
        vr.say("Thank you for calling. Please hold while we connect you.", voice="alice")
        # Get the current base URL
        base_url = get_base_url()
        vr.redirect(f"{base_url}/api/ai-call-dialer/incoming_call_fallback?call_sid=error_{datetime.now().timestamp()}")
        return Response(content=str(vr), media_type="application/xml")

@router.post("/incoming_call_fallback")
@router.get("/incoming_call_fallback")
def incoming_call_fallback(call_sid: str):
    """
    Fallback handler for incoming calls when no speech is detected
    """
    vr = VoiceResponse()
    
    # Get the current base URL
    base_url = get_base_url()
    
    retry_text = "I didn't hear anything. Please speak after the tone."
    vr.say(retry_text, voice="alice", language="en-US")
    
    # Gather speech input again
    gather = Gather(
        input="speech", 
        action=f"{base_url}/api/ai-call-dialer/process_speech?call_sid={call_sid}", 
        method="POST",
        timeout=5,
        speechTimeout="auto",
        enhanced=True
    )
    vr.append(gather)
    
    # If no input again, give one more chance then hang up
    vr.redirect(f"{base_url}/api/ai-call-dialer/incoming_call_goodbye?call_sid={call_sid}")
    
    return Response(content=str(vr), media_type="application/xml")

@router.post("/incoming_call_goodbye")
@router.get("/incoming_call_goodbye")
def incoming_call_goodbye(call_sid: str):
    """
    Final goodbye message for incoming calls with no input
    """
    vr = VoiceResponse()
    
    goodbye_text = "I'm sorry, I still couldn't hear you. Please call back again. Goodbye."
    vr.say(goodbye_text, voice="alice", language="en-US")
    vr.hangup()
    
    # Clean up conversation data
    if call_sid in conversations:
        del conversations[call_sid]
        logger.info(f"🧹 Cleaned up conversation data for call: {call_sid}")
    
    return Response(content=str(vr), media_type="application/xml")

@router.post("/call")
def make_call(to_number: str = Form(...), message: str = Form(...)):
    try:
        if not client:
            return {"status": "error", "message": "Twilio credentials not configured"}
            
        logger.info(f"📞 Initiating call to: {to_number}")
        logger.info(f"💬 Initial message: {message}")
        
        # Generate initial AI response
        initial_messages = [
            {"role": "system", "content": "You are a friendly AI assistant having a phone conversation. Keep responses concise (20-30 words max) and natural for speech."},
            {"role": "user", "content": message}
        ]
        
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=initial_messages,
            max_tokens=100
        )
        ai_text = response.choices[0].message.content
        logger.info(f"🤖 AI Response: {ai_text}")

        # Get the current base URL
        base_url = get_base_url()
        logger.info(f"🌐 Using base URL: {base_url}")

        # Create TwiML for continuous conversation
        encoded_text = urllib.parse.quote(ai_text)
        twiml_url = f"{base_url}/api/ai-call-dialer/twiml?text={encoded_text}&call_sid=init_{datetime.now().timestamp()}"

        # Make Twilio call with conversation endpoint AND status callback
        call = client.calls.create(
            to=to_number,
            from_=TWILIO_NUMBER,
            url=twiml_url,
            method="GET",
            status_callback=f"{base_url}/api/ai-call-dialer/call_status",  # Add this line
            status_callback_method="POST",  # Add this line
            status_callback_event=["initiated", "ringing", "answered", "completed"]  # Add this line
        )

        logger.info(f"✅ Call initiated successfully - SID: {call.sid}")
        return {"status": "call initiated", "call_sid": call.sid, "ai_text": ai_text}

    except Exception as e:
        logger.error(f"❌ Error initiating call: {str(e)}")
        return {"status": "error", "message": str(e)}

@router.get("/twiml")
@router.post("/twiml")  # Add this line to accept POST requests
def twiml(text: str, call_sid: str):
    """
    Returns TwiML for the AI response and gathers speech input
    """
    logger.info(f"🎯 Generating TwiML for call: {call_sid}")
    logger.info(f"📢 Speaking: {text}")
    
    # Get the current base URL
    base_url = get_base_url()
    
    vr = VoiceResponse()
    
    # Speak AI response
    vr.say(text, voice="alice", language="en-US")
    
    # Gather speech input from user with longer timeout
    gather = Gather(
        input="speech", 
        action=f"{base_url}/api/ai-call-dialer/process_speech?call_sid={call_sid}", 
        method="POST",
        timeout=10,
        speechTimeout="auto",
        enhanced=True
    )
    vr.append(gather)
    
    # If no input, redirect to keep the call alive
    vr.redirect(f"{base_url}/api/ai-call-dialer/twiml?text={urllib.parse.quote('I didnt hear anything. Please speak again.')}&call_sid={call_sid}")
    
    return Response(content=str(vr), media_type="application/xml")

@router.post("/process_speech")
async def process_speech(request: Request, call_sid: str):
    try:
        base_url = get_base_url()
        form = await request.form()
        speech_result = form.get("SpeechResult", "")
        confidence = form.get("Confidence", "0")
        
        logger.info(f"🎤 User speech received - Call SID: {call_sid}")
        logger.info(f"🗣️  User said: {speech_result}")
        logger.info(f"📊 Confidence: {confidence}")
        
        # Broadcast user message
        if speech_result and float(confidence) > 0.3:
            user_message = {
                "call_sid": call_sid,
                "speaker": "User",
                "message": speech_result,
                "timestamp": datetime.now().isoformat()
            }
            await manager.broadcast(json.dumps(user_message))
        
        vr = VoiceResponse()
        
        if speech_result and float(confidence) > 0.3:
            messages = get_conversation_context(call_sid)
            update_conversation_context(call_sid, "user", speech_result)
            
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=100,
                temperature=0.7
            )
            ai_text = response.choices[0].message.content
            update_conversation_context(call_sid, "assistant", ai_text)
            
            logger.info(f"🤖 AI responding: {ai_text}")
            
            # Broadcast AI response
            ai_message = {
                "call_sid": call_sid,
                "speaker": "AI",
                "message": ai_text,
                "timestamp": datetime.now().isoformat()
            }
            await manager.broadcast(json.dumps(ai_message))
            
            vr.say(ai_text, voice="alice", language="en-US")
            
            gather = Gather(
                input="speech", 
                action=f"{base_url}/api/ai-call-dialer/process_speech?call_sid={call_sid}", 
                method="POST",
                timeout=10,
                speechTimeout="auto",
                enhanced=True
            )
            vr.append(gather)
            
            vr.redirect(f"{base_url}/api/ai-call-dialer/twiml?text={urllib.parse.quote('Please continue speaking.')}&call_sid={call_sid}")
            
        else:
            logger.warning("⚠️  Low confidence or no speech detected")
            retry_text = "I didn't quite catch that. Could you please repeat?"
            vr.say(retry_text, voice="alice", language="en-US")
            
            gather = Gather(
                input="speech", 
                action=f"{base_url}/api/ai-call-dialer/process_speech?call_sid={call_sid}", 
                method="POST",
                timeout=10,
                speechTimeout="auto"
            )
            vr.append(gather)
            vr.redirect(f"{base_url}/api/ai-call-dialer/twiml?text={urllib.parse.quote(retry_text)}&call_sid={call_sid}")
        
        return Response(content=str(vr), media_type="application/xml")
        
    except Exception as e:
        logger.error(f"❌ Error processing speech: {str(e)}")
        base_url = get_base_url()
        vr = VoiceResponse()
        vr.say("I'm having trouble understanding. Let's try again.", voice="alice")
        vr.redirect(f"{base_url}/api/ai-call-dialer/twiml?text={urllib.parse.quote('Let us try again.')}&call_sid={call_sid}")
        return Response(content=str(vr), media_type="application/xml")

@router.post("/call_status")
async def call_status(request: Request):
    """
    Handle call status updates (for logging)
    """
    form = await request.form()
    call_sid = form.get("CallSid")
    status = form.get("CallStatus")
    
    logger.info(f"📞 Call Status Update - SID: {call_sid}, Status: {status}")
    
    # Broadcast call status update
    status_message = {
        "type": "call_status",
        "call_sid": call_sid,
        "status": status,
        "timestamp": datetime.now().isoformat()
    }
    await manager.broadcast(json.dumps(status_message))
    
    # Clean up conversation data when call ends
    if status in ["completed", "failed", "busy", "no-answer"]:
        if call_sid in conversations:
            del conversations[call_sid]
            logger.info(f"🧹 Cleaned up conversation data for call: {call_sid}")
    
    return {"status": "ok"}

# Add this endpoint to handle manual call termination
@router.post("/end_call")
async def end_call(call_sid: str = Form(...)):
    """
    End an ongoing call
    """
    try:
        if not client:
            return {"status": "error", "message": "Twilio credentials not configured"}
            
        call = client.calls(call_sid).update(status="completed")
        logger.info(f"✅ Call ended manually - SID: {call_sid}")
        return {"status": "call ended"}
    except Exception as e:
        logger.error(f"❌ Error ending call: {str(e)}")
        return {"status": "error", "message": str(e)}
    
@router.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}