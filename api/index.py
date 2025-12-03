"""
Vercel Serverless Function Handler for FastAPI.
This file handles all /api/* routes.
"""
import sys
from pathlib import Path

# Add backend to path so imports work
backend_path = Path(__file__).parent.parent / "backend"
sys.path.insert(0, str(backend_path))

from app.main import app

# Vercel expects the app to be exposed as 'app' or 'handler'
# FastAPI's ASGI interface works directly with Vercel
