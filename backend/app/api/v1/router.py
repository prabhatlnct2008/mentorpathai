"""API v1 router aggregating all endpoints."""
from fastapi import APIRouter

from app.api.v1.endpoints import health, leads

# Create main v1 router
api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(health.router, tags=["health"])
api_router.include_router(leads.router, tags=["leads"])
