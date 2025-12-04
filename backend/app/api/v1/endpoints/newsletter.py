"""Newsletter subscription endpoints."""
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.models.lead import NewsletterSubscriber
from app.schemas.lead import NewsletterCreate, NewsletterResponse

router = APIRouter()


@router.post("/newsletter", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
async def create_newsletter_subscription(
    newsletter_data: NewsletterCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new newsletter subscription.

    Args:
        newsletter_data: Newsletter subscription data
        db: Database session

    Returns:
        Created newsletter subscriber

    Note:
        If the email already exists, returns the existing subscriber instead of raising an error.
    """
    # Check if subscriber already exists
    existing_subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.email == newsletter_data.email
    ).first()

    if existing_subscriber:
        # Return existing subscriber (graceful handling of duplicates)
        return existing_subscriber

    # Create new newsletter subscriber
    db_subscriber = NewsletterSubscriber(
        email=newsletter_data.email,
        source=newsletter_data.source
    )

    try:
        db.add(db_subscriber)
        db.commit()
        db.refresh(db_subscriber)
    except IntegrityError:
        # Handle race condition where email was inserted between check and commit
        db.rollback()
        existing_subscriber = db.query(NewsletterSubscriber).filter(
            NewsletterSubscriber.email == newsletter_data.email
        ).first()
        return existing_subscriber

    return db_subscriber
