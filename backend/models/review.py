# review.py
from pydantic import BaseModel, EmailStr, Field, ConfigDict, validator
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
from enum import Enum

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        return handler.generate_schema(str)

class ReviewStatus(str, Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class Review(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: EmailStr
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    description: str
    status: ReviewStatus = ReviewStatus.APPROVED  # Auto-approve reviews
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    helpful_count: int = 0
    reported: bool = False

    @validator('rating')
    def validate_rating(cls, v):
        if v < 1 or v > 5:
            raise ValueError('Rating must be between 1 and 5')
        return v

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "rating": 5,
                "title": "Excellent Service",
                "description": "InfiniteWaveX delivered beyond my expectations.",
                "status": "approved"
            }
        }
    )