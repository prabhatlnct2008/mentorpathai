"""Authentication service for admin users."""
from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.config import settings
from app.models.admin import AdminUser

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """Hash a password."""
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt


def verify_token(token: str) -> Optional[dict]:
    """Verify a JWT token and return the payload."""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM]
        )
        return payload
    except JWTError:
        return None


def get_admin_by_username(db: Session, username: str) -> Optional[AdminUser]:
    """Get an admin user by username."""
    return db.query(AdminUser).filter(AdminUser.username == username).first()


def authenticate_admin(db: Session, username: str, password: str) -> Optional[AdminUser]:
    """Authenticate an admin user."""
    admin = get_admin_by_username(db, username)
    if not admin:
        return None
    if not verify_password(password, admin.hashed_password):
        return None
    return admin


def create_admin_user(db: Session, username: str, password: str) -> AdminUser:
    """Create a new admin user."""
    hashed_password = get_password_hash(password)
    admin = AdminUser(
        username=username,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


def ensure_default_admin(db: Session) -> None:
    """Ensure the default admin user exists."""
    admin = get_admin_by_username(db, settings.ADMIN_USERNAME)
    if not admin:
        create_admin_user(db, settings.ADMIN_USERNAME, settings.ADMIN_PASSWORD)
