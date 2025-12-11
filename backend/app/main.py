"""FastAPI application main module."""
import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.config import settings
from app.database import engine, Base
from app.logging_config import get_logger
# Import all models to register them with Base before create_all
from app.models import Lead, EmailLog, EmailTemplate, NewsletterSubscriber, AdminUser

# Get logger
logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    Creates database tables on startup.
    """
    logger.info("Starting MentorPath AI API...")
    try:
        # Startup: Create database tables
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created/verified successfully")
    except Exception as e:
        logger.error(f"Failed to create database tables: {e}")
        raise

    logger.info("MentorPath AI API started successfully")
    yield

    # Shutdown
    logger.info("Shutting down MentorPath AI API...")


# Create FastAPI application
app = FastAPI(
    title="MentorPath AI API",
    description="Backend API for MentorPath AI lead management and email automation",
    version="1.0.0",
    lifespan=lifespan
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle all unhandled exceptions."""
    logger.error(
        f"Unhandled exception: {exc.__class__.__name__}: {exc} | "
        f"Path: {request.url.path} | Method: {request.method}"
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all incoming requests and their responses."""
    start_time = time.time()

    # Process request
    try:
        response = await call_next(request)
        process_time = time.time() - start_time

        # Log request details
        log_msg = (
            f"{request.method} {request.url.path} | "
            f"Status: {response.status_code} | "
            f"Time: {process_time:.3f}s"
        )

        if response.status_code >= 400:
            logger.warning(log_msg)
        else:
            logger.info(log_msg)

        return response
    except Exception as e:
        process_time = time.time() - start_time
        logger.error(
            f"{request.method} {request.url.path} | "
            f"Error: {e.__class__.__name__}: {e} | "
            f"Time: {process_time:.3f}s"
        )
        raise


# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """Root endpoint returning API information."""
    return {
        "name": "MentorPath AI API",
        "version": "1.0.0",
        "status": "running"
    }
