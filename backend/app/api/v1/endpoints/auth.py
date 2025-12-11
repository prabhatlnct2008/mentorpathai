"""Authentication endpoints."""
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.auth import LoginRequest, TokenResponse, AdminResponse
from app.services.auth_service import (
    authenticate_admin,
    create_access_token,
    verify_token,
    ensure_default_admin,
    get_admin_by_username,
)
from app.models.admin import AdminUser
from app.config import settings
from app.logging_config import get_logger

logger = get_logger("auth")

router = APIRouter(prefix="/auth")
security = HTTPBearer()


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> AdminUser:
    """Dependency to get the current authenticated admin user."""
    token = credentials.credentials
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )

    admin = get_admin_by_username(db, username)
    if admin is None or not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin user not found or inactive",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return admin


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Login endpoint for admin users."""
    logger.info(f"Login attempt for user: {request.username}")

    try:
        # Ensure default admin exists
        ensure_default_admin(db)

        admin = authenticate_admin(db, request.username, request.password)
        if not admin:
            logger.warning(f"Failed login attempt for user: {request.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Update last login
        admin.last_login = datetime.utcnow()
        db.commit()

        # Create access token
        access_token = create_access_token(data={"sub": admin.username})

        logger.info(f"Successful login for user: {request.username}")

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60  # in seconds
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error for user {request.username}: {e}")
        raise


@router.get("/me", response_model=AdminResponse)
async def get_current_user(admin: AdminUser = Depends(get_current_admin)):
    """Get current authenticated admin user info."""
    return admin


@router.post("/verify")
async def verify_auth(admin: AdminUser = Depends(get_current_admin)):
    """Verify if the current token is valid."""
    return {"valid": True, "username": admin.username}
