"""Pydantic schemas for lead validation and serialization."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class LeadCreate(BaseModel):
    """Schema for creating a new lead."""
    email: EmailStr
    persona: Optional[str] = "unknown"
    initial_interest: Optional[str] = None
    source: str = "landing_chat"

    # Agent Systems Lab fields
    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    agent_type: Optional[str] = None
    timeframe: Optional[str] = None


class LeadResponse(BaseModel):
    """Schema for lead response."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    persona: str
    source: str
    created_at: datetime


class HealthResponse(BaseModel):
    """Schema for health check response."""
    status: str
    timestamp: datetime


class NewsletterCreate(BaseModel):
    """Schema for creating a newsletter subscriber."""
    email: EmailStr
    source: str = "agent_systems_lab_syllabus"


class NewsletterResponse(BaseModel):
    """Schema for newsletter subscriber response."""
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    source: str
    created_at: datetime
