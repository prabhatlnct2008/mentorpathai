"""SQLAlchemy models for leads and email management."""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Lead(Base):
    """Lead model for storing potential customers."""
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    persona = Column(String, nullable=False)
    source = Column(String, default="landing_chat", nullable=False)
    initial_interest = Column(String, nullable=True)

    # Agent Systems Lab fields
    name = Column(String(255), nullable=True)
    role = Column(String(100), nullable=True)
    company = Column(String(255), nullable=True)
    agent_type = Column(String(100), nullable=True)
    timeframe = Column(String(50), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    # Relationship to email logs
    email_logs = relationship("EmailLog", back_populates="lead")


class EmailTemplate(Base):
    """Email template model for storing reusable email templates."""
    __tablename__ = "email_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    subject = Column(String, nullable=False)
    html_content = Column(Text, nullable=False)
    text_content = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


class EmailLog(Base):
    """Email log model for tracking sent emails."""
    __tablename__ = "email_logs"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    template_name = Column(String, nullable=False)
    status = Column(String, default="pending", nullable=False)  # pending, sent, failed
    scheduled_at = Column(DateTime, nullable=False)
    sent_at = Column(DateTime, nullable=True)
    error_message = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    # Relationship to lead
    lead = relationship("Lead", back_populates="email_logs")


class NewsletterSubscriber(Base):
    """Newsletter subscriber model for email subscriptions."""
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    source = Column(String(50), default="agent_systems_lab_syllabus", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
