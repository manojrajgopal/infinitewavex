from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from bson import ObjectId

from database import get_database
from models.newsletter import NewsletterSubscriber, PyObjectId

router = APIRouter()

@router.post("/subscribe", response_model=dict)
async def subscribe_to_newsletter(subscriber: dict):
    """
    Subscribe an email to the newsletter
    """
    db = get_database()
    collection = db["newsletter_subscribers"]
    
    email = subscriber.get("email")
    
    # Validate email format
    if "@" not in email or "." not in email.split("@")[1]:
        raise HTTPException(status_code=400, detail="Invalid email format")
    
    # Check if email already exists
    existing_subscriber = collection.find_one({"email": email.lower()})
    
    if existing_subscriber:
        # If exists but inactive, reactivate
        if not existing_subscriber.get("is_active", True):
            collection.update_one(
                {"_id": existing_subscriber["_id"]},
                {"$set": {"is_active": True, "subscribed_at": datetime.utcnow()}}
            )
            return {"message": "Email resubscribed successfully", "email": email}
        else:
            return {"message": "Email is already subscribed", "email": email}
    
    # Create new subscriber
    subscriber_data = {
        "email": email.lower(),
        "subscribed_at": datetime.utcnow(),
        "is_active": True,
        "source": "website"
    }
    
    result = collection.insert_one(subscriber_data)
    
    return {
        "message": "Successfully subscribed to newsletter",
        "email": email,
        "id": str(result.inserted_id)
    }

@router.post("/unsubscribe", response_model=dict)
async def unsubscribe_from_newsletter(email: str):
    """
    Unsubscribe an email from the newsletter
    """
    db = get_database()
    collection = db["newsletter_subscribers"]
    
    result = collection.update_one(
        {"email": email.lower()},
        {"$set": {"is_active": False}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Email not found in subscribers")
    
    return {"message": "Successfully unsubscribed from newsletter", "email": email}

@router.get("/subscribers", response_model=List[NewsletterSubscriber])
async def get_subscribers(active_only: bool = True, skip: int = 0, limit: int = 100):
    """
    Get all newsletter subscribers
    """
    db = get_database()
    collection = db["newsletter_subscribers"]
    
    query = {"is_active": True} if active_only else {}
    subscribers = list(collection.find(query).sort("subscribed_at", -1).skip(skip).limit(limit))
    
    # Convert ObjectId to string for JSON serialization
    for sub in subscribers:
        sub["_id"] = str(sub["_id"])
    
    return subscribers

@router.get("/subscribers/count")
async def get_subscribers_count(active_only: bool = True):
    """
    Get count of newsletter subscribers
    """
    db = get_database()
    collection = db["newsletter_subscribers"]
    
    query = {"is_active": True} if active_only else {}
    count = collection.count_documents(query)
    
    return {"count": count}