"""Logging configuration for the application."""
import os
import sys
import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

# Determine log directory based on environment
if os.getenv("VERCEL"):
    # Vercel serverless - use /tmp for logs
    LOG_DIR = Path("/tmp/logs")
else:
    # Local development - use backend/logs
    LOG_DIR = Path(__file__).parent.parent / "logs"

# Ensure log directory exists
LOG_DIR.mkdir(parents=True, exist_ok=True)

LOG_FILE = LOG_DIR / "system.log"

# Log format
LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(funcName)s:%(lineno)d | %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def setup_logging(level: str = "INFO") -> logging.Logger:
    """
    Set up application logging with file and console handlers.

    Args:
        level: Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)

    Returns:
        Configured root logger
    """
    # Get numeric level
    numeric_level = getattr(logging, level.upper(), logging.INFO)

    # Create formatter
    formatter = logging.Formatter(LOG_FORMAT, datefmt=DATE_FORMAT)

    # Get root logger
    logger = logging.getLogger("mentorpath")
    logger.setLevel(numeric_level)

    # Remove existing handlers to avoid duplicates
    logger.handlers.clear()

    # Console handler (always enabled)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(numeric_level)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    # File handler with rotation (5MB max, keep 3 backups)
    try:
        file_handler = RotatingFileHandler(
            LOG_FILE,
            maxBytes=5 * 1024 * 1024,  # 5MB
            backupCount=3,
            encoding="utf-8"
        )
        file_handler.setLevel(numeric_level)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)
    except Exception as e:
        logger.warning(f"Could not set up file logging: {e}")

    # Also capture uvicorn and fastapi logs
    for name in ["uvicorn", "uvicorn.error", "uvicorn.access", "fastapi"]:
        ext_logger = logging.getLogger(name)
        ext_logger.handlers = logger.handlers

    return logger


def get_logger(name: str = "mentorpath") -> logging.Logger:
    """
    Get a logger instance.

    Args:
        name: Logger name (will be prefixed with 'mentorpath.')

    Returns:
        Logger instance
    """
    if name == "mentorpath":
        return logging.getLogger(name)
    return logging.getLogger(f"mentorpath.{name}")


# Initialize logging on module import
logger = setup_logging(os.getenv("LOG_LEVEL", "INFO"))
