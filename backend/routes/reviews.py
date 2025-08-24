from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId

from database import get_database
from models.review import Review, ReviewStatus, PyObjectId

router = APIRouter()

@router.post("/", response_model=dict)
async def create_review(review: Review):
    db = get_database()
    collection = db["reviews"]
    
    # Check if user has already submitted a review
    existing_review = collection.find_one({
        "email": review.email,
        "status": {"$in": ["pending", "approved"]}
    })
    
    if existing_review:
        raise HTTPException(
            status_code=400, 
            detail="You have already submitted a review. Please wait for approval."
        )
    
    # Prepare review data
    review_data = review.model_dump(exclude={"id"})
    review_data["created_at"] = datetime.utcnow()
    review_data["updated_at"] = datetime.utcnow()
    review_data["helpful_count"] = 0
    review_data["reported"] = False
    
    # Insert into database
    result = collection.insert_one(review_data)
    
    return {
        "message": "Review submitted successfully. It will be visible after approval.",
        "id": str(result.inserted_id)
    }

@router.get("/", response_model=List[Review])
async def get_reviews(
    status: Optional[ReviewStatus] = Query(None, description="Filter by review status"),
    rating: Optional[int] = Query(None, ge=1, le=5, description="Filter by rating"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    sort_by: str = Query("created_at", description="Field to sort by"),
    sort_order: str = Query("desc", description="Sort order: asc or desc"),
    skip: int = 0,
    limit: int = 10
):
    db = get_database()
    collection = db["reviews"]
    
    # Build query
    query = {}
    if status:
        query["status"] = status
    if rating:
        query["rating"] = rating
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    # Default to showing only approved reviews for non-admin requests
    if not status:
        query["status"] = ReviewStatus.APPROVED
    
    # Build sort
    sort_direction = -1 if sort_order == "desc" else 1
    sort_criteria = [(sort_by, sort_direction)]
    
    # Get reviews
    reviews = list(collection.find(query)
        .sort(sort_criteria)
        .skip(skip)
        .limit(limit))
    
    # Convert ObjectId to string
    for review in reviews:
        review["_id"] = str(review["_id"])
    
    return reviews

@router.get("/stats")
async def get_review_stats():
    db = get_database()
    collection = db["reviews"]
    
    # Count total approved reviews
    total_reviews = collection.count_documents({"status": ReviewStatus.APPROVED})
    
    # Calculate average rating
    pipeline = [
        {"$match": {"status": ReviewStatus.APPROVED}},
        {"$group": {
            "_id": None,
            "average_rating": {"$avg": "$rating"},
            "rating_distribution": {"$push": "$rating"}
        }}
    ]
    
    stats_result = list(collection.aggregate(pipeline))
    
    if stats_result:
        average_rating = round(stats_result[0]["average_rating"], 1)
        rating_distribution = stats_result[0]["rating_distribution"]
        
        # Count ratings by star
        rating_counts = {i: rating_distribution.count(i) for i in range(1, 6)}
    else:
        average_rating = 0
        rating_counts = {i: 0 for i in range(1, 6)}
    
    return {
        "total_reviews": total_reviews,
        "average_rating": average_rating,
        "rating_distribution": rating_counts
    }

@router.patch("/{review_id}/helpful", response_model=dict)
async def mark_review_helpful(review_id: str):
    db = get_database()
    collection = db["reviews"]
    
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    result = collection.update_one(
        {"_id": ObjectId(review_id), "status": ReviewStatus.APPROVED},
        {"$inc": {"helpful_count": 1}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return {"message": "Review marked as helpful"}

@router.patch("/{review_id}/report", response_model=dict)
async def report_review(review_id: str):
    db = get_database()
    collection = db["reviews"]
    
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    result = collection.update_one(
        {"_id": ObjectId(review_id), "status": ReviewStatus.APPROVED},
        {"$set": {"reported": True}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    
    return {"message": "Review reported. It will be reviewed by our team."}

@router.get("/{review_id}", response_model=Review)
async def get_review(review_id: str):
    db = get_database()
    collection = db["reviews"]
    
    if not ObjectId.is_valid(review_id):
        raise HTTPException(status_code=400, detail="Invalid review ID")
    
    review = collection.find_one({"_id": ObjectId(review_id)})
    
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    
    review["_id"] = str(review["_id"])
    return review