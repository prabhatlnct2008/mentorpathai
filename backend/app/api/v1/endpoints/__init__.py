"""API endpoints package."""
from app.api.v1.endpoints import health, leads, newsletter, auth, admin

__all__ = ["health", "leads", "newsletter", "auth", "admin"]
