"""Lead service for business logic related to leads."""
from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead import LeadCreate


def create_lead(db: Session, lead_data: LeadCreate) -> Lead:
    """
    Create a new lead in the database.

    Args:
        db: Database session
        lead_data: Lead creation data

    Returns:
        Created Lead object
    """
    # Create new lead instance
    db_lead = Lead(
        email=lead_data.email,
        persona=lead_data.persona,
        source=lead_data.source,
        initial_interest=lead_data.initial_interest
    )

    # Add to database
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)

    return db_lead


def get_lead_by_email(db: Session, email: str) -> Lead | None:
    """
    Get a lead by email address.

    Args:
        db: Database session
        email: Email address to search for

    Returns:
        Lead object if found, None otherwise
    """
    return db.query(Lead).filter(Lead.email == email).first()
