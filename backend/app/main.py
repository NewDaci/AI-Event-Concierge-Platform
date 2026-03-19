from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.routes.search import router as search_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup/shutdown events."""
    await connect_to_mongo()
    yield
    await close_mongo_connection()


app = FastAPI(
    title="AI Event Concierge",
    description="An AI-powered platform that helps users plan corporate offsites by generating venue proposals from natural language descriptions.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow the frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(search_router)


@app.get("/")
async def root():
    return {"message": "AI Event Concierge API", "docs": "/docs"}
