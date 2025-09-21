from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime
from bson import ObjectId
from .base import PyObjectId

class ContactRequest(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: EmailStr
    subject: str
    message: str
    phone: Optional[str] = None
    company: Optional[str] = None
    created_at: Optional[datetime] = None
    status: Optional[str] = "new"

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "subject": "Website Development Inquiry",
                "message": "I would like to discuss a potential project",
                "phone": "+1234567890",
                "company": "ABC Corp",
                "status": "new"
            }
        }
    )