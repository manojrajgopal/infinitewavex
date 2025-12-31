from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional, List
from datetime import datetime
import os
import uuid
from bson import ObjectId
import gridfs

from database import get_database
from models.project_request import ProjectRequest, PyObjectId
from utils.email_service import send_project_request_email

router = APIRouter()

@router.post("/", response_model=dict)
async def create_project_request(
    customer_type: str = Form(...),
    project_title: str = Form(...),
    name: str = Form(...),
    email: str = Form(...),
    budget: Optional[float] = Form(None),
    deadline: Optional[str] = Form(None),
    details: str = Form(...),
    files: List[UploadFile] = File([])
):
    db = get_database()
    collection = db["project_requests"]
    fs = gridfs.GridFS(db)  # Initialize GridFS for file storage
    
    # Save uploaded files to MongoDB using GridFS
    file_ids = []
    for file in files:
        file_id = fs.put(
            await file.read(),
            filename=file.filename,
            content_type=file.content_type
        )
        file_ids.append(str(file_id))
    
    # Create project request document
    project_data = {
        "customer_type": customer_type,
        "project_title": project_title,
        "name": name,
        "email": email,
        "budget": budget,
        "deadline": deadline,
        "details": details,
        "file_ids": file_ids,  # Store file IDs instead of paths
        "created_at": datetime.utcnow(),
        "status": "new"
    }
    
    # Insert into database
    result = collection.insert_one(project_data)
    project_data["_id"] = str(result.inserted_id)
    
    # Send email notification with file attachments
    email_sent = send_project_request_email(project_data, db)

    if not email_sent:
        raise HTTPException(status_code=500, detail="Project request submitted but failed to send email notification")

    return {
        "message": "Project request submitted successfully",
        "id": str(result.inserted_id),
        "email_sent": email_sent
    }

@router.get("/", response_model=List[ProjectRequest])
async def get_project_requests(skip: int = 0, limit: int = 10):
    db = get_database()
    collection = db["project_requests"]
    
    requests = list(collection.find().sort("created_at", -1).skip(skip).limit(limit))
    
    # Convert ObjectId to string for JSON serialization
    for req in requests:
        req["_id"] = str(req["_id"])
    
    return requests

@router.get("/{request_id}", response_model=ProjectRequest)
async def get_project_request(request_id: str):
    db = get_database()
    collection = db["project_requests"]
    
    if not ObjectId.is_valid(request_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    request = collection.find_one({"_id": ObjectId(request_id)})
    
    if not request:
        raise HTTPException(status_code=404, detail="Project request not found")
    
    request["_id"] = str(request["_id"])
    return request

@router.get("/file/{file_id}")
async def get_file(file_id: str):
    db = get_database()
    fs = gridfs.GridFS(db)
    
    try:
        file = fs.get(ObjectId(file_id))
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "data": file.read()
        }
    except:
        raise HTTPException(status_code=404, detail="File not found")