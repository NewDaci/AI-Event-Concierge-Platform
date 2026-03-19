import json
from google import genai
from google.genai import types

from app.config import settings
from app.models import VenueProposal

_client: genai.Client | None = None

SYSTEM_PROMPT = """You are an expert corporate event planner and venue concierge.

Given a natural language description of a corporate event, return a venue recommendation.
Suggest real, well-known venues when possible.
The estimated cost should be realistic and within the user's stated budget if one is mentioned.
The justification should reference specific details from the user's request.
Return only valid JSON.
"""

VENUE_PROPOSAL_SCHEMA = {
    "type": "object",
    "properties": {
        "venue_name": {"type": "string"},
        "location": {"type": "string"},
        "estimated_cost": {"type": "string"},
        "why_it_fits": {"type": "string"},
    },
    "required": ["venue_name", "location", "estimated_cost", "why_it_fits"],
}


def _get_client() -> genai.Client:
    global _client
    if _client is None:
        _client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _client


async def generate_venue_proposal(query: str) -> VenueProposal:
    client = _get_client()

    response = await client.aio.models.generate_content(
        model="gemini-flash-latest",
        contents=f"{SYSTEM_PROMPT}\n\nEvent request:\n{query}",
        config=types.GenerateContentConfig(
            temperature=0.7,
            response_mime_type="application/json",
            response_json_schema=VENUE_PROPOSAL_SCHEMA,
        ),
    )

    data = json.loads(response.text)
    return VenueProposal(**data)