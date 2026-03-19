from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongo():
    """Create MongoDB connection on app startup."""
    global client, db
    client = AsyncIOMotorClient(
        settings.MONGODB_URI,
        serverSelectionTimeoutMS=5000,
        connectTimeoutMS=5000,
    )
    db = client[settings.MONGODB_DB_NAME]
    # Verify connection
    try:
        await client.admin.command("ping")
        print(f"✅ Connected to MongoDB: {settings.MONGODB_DB_NAME}")
    except Exception as e:
        print(f"⚠️  MongoDB connection failed: {e}")
        print("   The app will start, but searches will fail until MongoDB is available.")


async def close_mongo_connection():
    """Close MongoDB connection on app shutdown."""
    global client
    if client:
        client.close()
        print("🔌 MongoDB connection closed")


def get_database():
    """Return the database instance."""
    return db
