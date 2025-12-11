"""Pydantic schemas for authentication."""
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    """Login request schema."""
    username: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=1)


class TokenResponse(BaseModel):
    """Token response schema."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AdminResponse(BaseModel):
    """Admin user response schema."""
    id: int
    username: str
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True
