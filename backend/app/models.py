from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# --------------- Request Schemas ---------------

class EventSearchRequest(BaseModel):
    """User's natural language event description."""
    query: str = Field(
        ...,
        min_length=5,
        max_length=1000,
        examples=["A 10-person leadership retreat in the mountains for 3 days with a $4k budget"],
    )


# --------------- Response Schemas ---------------

class VenueProposal(BaseModel):
    """AI-generated venue suggestion."""
    venue_name: str
    location: str
    estimated_cost: str
    why_it_fits: str


class SearchRecord(BaseModel):
    """A stored search with its AI response."""
    id: Optional[str] = Field(None, alias="_id")
    query: str
    proposal: VenueProposal
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {datetime: lambda v: v.isoformat()}


class SearchRecordResponse(BaseModel):
    """API response for a single search record."""
    id: str
    query: str
    proposal: VenueProposal
    created_at: str


class HistoryResponse(BaseModel):
    """API response for search history."""
    searches: list[SearchRecordResponse]
    total: int
