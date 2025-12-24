"""Health check endpoint."""
import os
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.schemas.lead import HealthResponse
from app.database import get_db, engine, Base

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify API is running.

    Returns:
        HealthResponse with status and timestamp
    """
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow()
    )


@router.get("/health/db")
async def db_health_check(db: Session = Depends(get_db)):
    """
    Database health check - creates tables and verifies connection.
    """
    # Import models to ensure they're registered
    from app.models import Lead, EmailLog, EmailTemplate, NewsletterSubscriber, AdminUser

    result = {
        "database_url_set": bool(os.getenv("DATABASE_URL")),
        "database_type": "postgresql" if os.getenv("DATABASE_URL", "").startswith("postgresql") else "sqlite",
        "vercel_env": bool(os.getenv("VERCEL")),
        "tables_status": {},
        "connection": "unknown",
        "error": None
    }

    try:
        # Test connection
        db.execute(text("SELECT 1"))
        result["connection"] = "success"

        # Create all tables
        Base.metadata.create_all(bind=engine)
        result["tables_created"] = True

        # Check which tables exist
        from sqlalchemy import inspect
        inspector = inspect(engine)
        existing_tables = inspector.get_table_names()

        expected_tables = ["leads", "email_templates", "email_logs", "newsletter_subscribers", "admin_users"]
        for table in expected_tables:
            result["tables_status"][table] = table in existing_tables

    except Exception as e:
        result["connection"] = "failed"
        result["error"] = str(e)

    return result
