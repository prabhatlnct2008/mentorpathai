"""Services package."""
from app.services.lead_service import create_lead, get_lead_by_email
from app.services.email_service import send_email, send_welcome_email, schedule_followup_emails
from app.services.auth_service import (
    verify_password,
    get_password_hash,
    create_access_token,
    verify_token,
    get_admin_by_username,
    authenticate_admin,
    create_admin_user,
    ensure_default_admin,
)

__all__ = [
    "create_lead",
    "get_lead_by_email",
    "send_email",
    "send_welcome_email",
    "schedule_followup_emails",
    "verify_password",
    "get_password_hash",
    "create_access_token",
    "verify_token",
    "get_admin_by_username",
    "authenticate_admin",
    "create_admin_user",
    "ensure_default_admin",
]
