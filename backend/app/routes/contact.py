from fastapi import APIRouter, HTTPException, Form
from typing import Optional
from datetime import datetime
from bson import ObjectId

from database import get_database
from models.contact import ContactRequest, PyObjectId
from utils.email_service import send_contact_confirmation_email, send_contact_notification_email

router = APIRouter()

@router.post("/", response_model=dict)
async def create_contact_request(
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    phone: Optional[str] = Form(None),
    company: Optional[str] = Form(None)
):
    db = get_database()
    collection = db["contact_requests"]
    
    # Create contact request document
    contact_data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "phone": phone,
        "company": company,
        "created_at": datetime.utcnow(),
        "status": "new"
    }
    
    # Insert into database
    result = collection.insert_one(contact_data)
    contact_data["_id"] = str(result.inserted_id)
    
    # Send confirmation email to client
    confirmation_sent = send_contact_confirmation_email(contact_data)
    
    # Send notification email to your team
    notification_sent = send_contact_notification_email(contact_data)
    
    return {
        "message": "Contact request submitted successfully",
        "id": str(result.inserted_id),
        "confirmation_sent": confirmation_sent,
        "notification_sent": notification_sent
    }

@router.get("/", response_model=list[ContactRequest])
async def get_contact_requests(skip: int = 0, limit: int = 10):
    db = get_database()
    collection = db["contact_requests"]
    
    requests = list(collection.find().sort("created_at", -1).skip(skip).limit(limit))
    
    # Convert ObjectId to string for JSON serialization
    for req in requests:
        req["_id"] = str(req["_id"])
    
    return requests

@router.get("/{request_id}", response_model=ContactRequest)
async def get_contact_request(request_id: str):
    db = get_database()
    collection = db["contact_requests"]
    
    if not ObjectId.is_valid(request_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    request = collection.find_one({"_id": ObjectId(request_id)})
    
    if not request:
        raise HTTPException(status_code=404, detail="Contact request not found")
    
    request["_id"] = str(request["_id"])
    return request