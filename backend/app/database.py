"""Database configuration and session management."""
import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Get DATABASE_URL from environment or use default SQLite database
# For Vercel serverless, SQLite must be in /tmp (ephemeral storage)
# For production, use a real database (Postgres, etc.)
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if os.getenv("DATABASE_URL"):
    DATABASE_URL = os.getenv("DATABASE_URL")
elif os.getenv("VERCEL"):
    # Vercel serverless - use /tmp for SQLite (ephemeral, for demo only)
    DATABASE_URL = "sqlite:////tmp/mentorpath.db"
else:
    DATABASE_URL = "sqlite:///./mentorpath.db"

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)

# Create SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
Base = declarative_base()


def get_db():
    """Dependency for getting database sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
