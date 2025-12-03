"""Lead endpoints for creating and retrieving leads."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.lead_service import create_lead, get_lead_by_email
from app.services.email_service import send_welcome_email, schedule_followup_emails

router = APIRouter()


@router.post("/leads", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_new_lead(
    lead_data: LeadCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new lead and trigger welcome email.

    Args:
        lead_data: Lead creation data
        db: Database session

    Returns:
        Created lead

    Raises:
        HTTPException: If lead with email already exists
    """
    # Check if lead already exists
    existing_lead = get_lead_by_email(db, lead_data.email)
    if existing_lead:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A lead with this email already exists"
        )

    # Create new lead
    lead = create_lead(db, lead_data)

    # Send welcome email asynchronously
    try:
        await send_welcome_email(db, lead)
        # Schedule follow-up emails
        schedule_followup_emails(db, lead)
    except Exception as e:
        # Log error but don't fail the request
        print(f"Error sending welcome email: {str(e)}")

    return lead


@router.get("/leads/{email}", response_model=LeadResponse)
def get_lead(
    email: str,
    db: Session = Depends(get_db)
):
    """
    Get a lead by email address.

    Args:
        email: Email address to search for
        db: Database session

    Returns:
        Lead if found

    Raises:
        HTTPException: If lead not found
    """
    lead = get_lead_by_email(db, email)
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )

    return lead
