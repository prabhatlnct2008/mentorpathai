"""Admin endpoints for viewing data."""
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from pydantic import BaseModel, ConfigDict

from app.database import get_db
from app.models.lead import Lead, NewsletterSubscriber, EmailLog
from app.models.admin import AdminUser
from app.api.v1.endpoints.auth import get_current_admin

router = APIRouter(prefix="/admin")


# Response schemas for admin endpoints
class LeadDetailResponse(BaseModel):
    """Detailed lead response for admin."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    persona: str
    source: str
    initial_interest: Optional[str] = None
    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    agent_type: Optional[str] = None
    timeframe: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class NewsletterDetailResponse(BaseModel):
    """Detailed newsletter subscriber response for admin."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    source: str
    created_at: datetime


class EmailLogResponse(BaseModel):
    """Email log response for admin."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    lead_id: int
    template_name: str
    status: str
    scheduled_at: datetime
    sent_at: Optional[datetime] = None
    error_message: Optional[str] = None
    created_at: datetime


class PaginatedLeadsResponse(BaseModel):
    """Paginated leads response."""
    items: List[LeadDetailResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class PaginatedNewsletterResponse(BaseModel):
    """Paginated newsletter subscribers response."""
    items: List[NewsletterDetailResponse]
    total: int
    page: int
    page_size: int
    total_pages: int


class DashboardStats(BaseModel):
    """Dashboard statistics."""
    total_leads: int
    total_newsletter_subscribers: int
    leads_today: int
    leads_this_week: int
    leads_by_source: dict
    leads_by_persona: dict


@router.get("/leads", response_model=PaginatedLeadsResponse)
async def get_leads(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    source: Optional[str] = None,
    persona: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Get paginated list of leads."""
    query = db.query(Lead)

    # Apply filters
    if search:
        query = query.filter(
            Lead.email.ilike(f"%{search}%") |
            Lead.name.ilike(f"%{search}%") |
            Lead.company.ilike(f"%{search}%")
        )
    if source:
        query = query.filter(Lead.source == source)
    if persona:
        query = query.filter(Lead.persona == persona)

    # Get total count
    total = query.count()

    # Apply pagination and ordering
    items = query.order_by(desc(Lead.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    total_pages = (total + page_size - 1) // page_size

    return PaginatedLeadsResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/newsletter", response_model=PaginatedNewsletterResponse)
async def get_newsletter_subscribers(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    search: Optional[str] = None,
    source: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Get paginated list of newsletter subscribers."""
    query = db.query(NewsletterSubscriber)

    # Apply filters
    if search:
        query = query.filter(NewsletterSubscriber.email.ilike(f"%{search}%"))
    if source:
        query = query.filter(NewsletterSubscriber.source == source)

    # Get total count
    total = query.count()

    # Apply pagination and ordering
    items = query.order_by(desc(NewsletterSubscriber.created_at)).offset(
        (page - 1) * page_size
    ).limit(page_size).all()

    total_pages = (total + page_size - 1) // page_size

    return PaginatedNewsletterResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages
    )


@router.get("/stats", response_model=DashboardStats)
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Get dashboard statistics."""
    from datetime import timedelta

    now = datetime.utcnow()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=today_start.weekday())

    # Total counts
    total_leads = db.query(Lead).count()
    total_newsletter = db.query(NewsletterSubscriber).count()

    # Leads today
    leads_today = db.query(Lead).filter(Lead.created_at >= today_start).count()

    # Leads this week
    leads_this_week = db.query(Lead).filter(Lead.created_at >= week_start).count()

    # Leads by source
    leads_by_source = {}
    for source, in db.query(Lead.source).distinct().all():
        leads_by_source[source] = db.query(Lead).filter(Lead.source == source).count()

    # Leads by persona
    leads_by_persona = {}
    for persona, in db.query(Lead.persona).distinct().all():
        leads_by_persona[persona] = db.query(Lead).filter(Lead.persona == persona).count()

    return DashboardStats(
        total_leads=total_leads,
        total_newsletter_subscribers=total_newsletter,
        leads_today=leads_today,
        leads_this_week=leads_this_week,
        leads_by_source=leads_by_source,
        leads_by_persona=leads_by_persona
    )


@router.get("/leads/{lead_id}", response_model=LeadDetailResponse)
async def get_lead_detail(
    lead_id: int,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Get detailed information about a specific lead."""
    from fastapi import HTTPException, status

    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )
    return lead


@router.get("/leads/{lead_id}/emails", response_model=List[EmailLogResponse])
async def get_lead_emails(
    lead_id: int,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Get email logs for a specific lead."""
    from fastapi import HTTPException, status

    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )

    emails = db.query(EmailLog).filter(EmailLog.lead_id == lead_id).order_by(
        desc(EmailLog.created_at)
    ).all()

    return emails


@router.delete("/leads/{lead_id}")
async def delete_lead(
    lead_id: int,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Delete a lead."""
    from fastapi import HTTPException, status

    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lead not found"
        )

    # Delete associated email logs first
    db.query(EmailLog).filter(EmailLog.lead_id == lead_id).delete()

    db.delete(lead)
    db.commit()

    return {"message": "Lead deleted successfully"}


@router.delete("/newsletter/{subscriber_id}")
async def delete_newsletter_subscriber(
    subscriber_id: int,
    db: Session = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Delete a newsletter subscriber."""
    from fastapi import HTTPException, status

    subscriber = db.query(NewsletterSubscriber).filter(
        NewsletterSubscriber.id == subscriber_id
    ).first()
    if not subscriber:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscriber not found"
        )

    db.delete(subscriber)
    db.commit()

    return {"message": "Subscriber deleted successfully"}
