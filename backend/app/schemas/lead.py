"""Pydantic schemas for lead validation and serialization."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict


class LeadCreate(BaseModel):
    """Schema for creating a new lead."""
    email: EmailStr
    persona: str
    initial_interest: Optional[str] = None
    source: str = "landing_chat"


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
