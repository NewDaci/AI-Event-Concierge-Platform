from fastapi import APIRouter, HTTPException
from datetime import datetime

from app.models import (
    EventSearchRequest,
    VenueProposal,
    SearchRecordResponse,
    HistoryResponse,
)
from app.services.openai_service import generate_venue_proposal
from app.database import get_database

router = APIRouter(prefix="/api", tags=["search"])


@router.post("/search", response_model=SearchRecordResponse)
async def search_venue(request: EventSearchRequest):
    """Accept a natural language event description and return an AI-generated venue proposal."""
    try:
        # Generate proposal via OpenAI
        proposal: VenueProposal = await generate_venue_proposal(request.query)

        # Build the record to store
        record = {
            "query": request.query,
            "proposal": proposal.model_dump(),
            "created_at": datetime.utcnow(),
        }

        # Store in MongoDB
        db = get_database()
        result = await db.searches.insert_one(record)

        return SearchRecordResponse(
            id=str(result.inserted_id),
            query=request.query,
            proposal=proposal,
            created_at=record["created_at"].isoformat(),
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate proposal: {str(e)}")


@router.get("/history", response_model=HistoryResponse)
async def get_history():
    """Return all past searches, newest first."""
    db = get_database()
    cursor = db.searches.find().sort("created_at", -1)
    searches = []

    async for doc in cursor:
        searches.append(
            SearchRecordResponse(
                id=str(doc["_id"]),
                query=doc["query"],
                proposal=VenueProposal(**doc["proposal"]),
                created_at=doc["created_at"].isoformat(),
            )
        )

    return HistoryResponse(searches=searches, total=len(searches))
