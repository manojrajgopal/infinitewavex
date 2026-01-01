from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List, Any, Dict
from datetime import datetime
from bson import ObjectId

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
    def __get_pydantic_core_schema__(clss, source_type, handler):
        return handler(source_type)

class ProjectRequest(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    customer_type: str
    project_title: str
    name: str
    email: EmailStr
    budget: Optional[float] = None
    deadline: Optional[str] = None
    details: str
    file_ids: Optional[List[str]] = []
    created_at: Optional[datetime] = None
    status: Optional[str] = "new"

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "customer_type": "individual",
                "project_title": "Website Development",
                "name": "John Doe",
                "email": "john@example.com",
                "budget": 1000.0,
                "deadline": "2023-12-31",
                "details": "I need a website for my business",
                "file_ids": [],
                "status": "new"
            }
        }