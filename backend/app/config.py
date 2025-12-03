"""Application configuration using pydantic-settings."""
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

    # Database
    DATABASE_URL: str = "sqlite:///./mentorpath.db"

    # SMTP Configuration
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_NAME: str = "MentorPath AI"
    SMTP_FROM_EMAIL: str = "hello@mentorpathai.com"

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # CORS (comma-separated origins)
    # Include Vercel preview URLs and localhost for development
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,https://*.vercel.app"

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS_ORIGINS into a list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]


# Create a global settings instance
settings = Settings()
