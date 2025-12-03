"""Email service for sending emails via SMTP."""
import os
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from typing import Optional

import aiosmtplib
from jinja2 import Environment, FileSystemLoader
from sqlalchemy.orm import Session

from app.config import settings
from app.models.lead import Lead, EmailLog


# Setup Jinja2 environment for email templates
TEMPLATE_DIR = Path(__file__).parent.parent / "templates" / "emails"
jinja_env = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR)))


async def send_email(
    to: str,
    subject: str,
    html_content: str,
    text_content: str
) -> bool:
    """
    Send an email via SMTP.

    Args:
        to: Recipient email address
        subject: Email subject
        html_content: HTML version of email content
        text_content: Plain text version of email content

    Returns:
        True if email was sent successfully, False otherwise
    """
    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["From"] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
        message["To"] = to
        message["Subject"] = subject

        # Add plain text and HTML parts
        part1 = MIMEText(text_content, "plain")
        part2 = MIMEText(html_content, "html")
        message.attach(part1)
        message.attach(part2)

        # Send email
        await aiosmtplib.send(
            message,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER,
            password=settings.SMTP_PASSWORD,
            start_tls=True
        )

        return True

    except Exception as e:
        print(f"Error sending email to {to}: {str(e)}")
        return False


async def send_welcome_email(db: Session, lead: Lead) -> bool:
    """
    Send welcome email to a new lead.

    Args:
        db: Database session
        lead: Lead object

    Returns:
        True if email was sent successfully, False otherwise
    """
    try:
        # Render templates
        html_template = jinja_env.get_template("welcome.html")
        text_template = jinja_env.get_template("welcome.txt")

        context = {
            "persona": lead.persona,
            "email": lead.email
        }

        html_content = html_template.render(**context)
        text_content = text_template.render(**context)

        # Send email
        success = await send_email(
            to=lead.email,
            subject="Welcome to MentorPath AI - Your Journey Begins!",
            html_content=html_content,
            text_content=text_content
        )

        # Log email
        email_log = EmailLog(
            lead_id=lead.id,
            template_name="welcome",
            status="sent" if success else "failed",
            scheduled_at=datetime.utcnow(),
            sent_at=datetime.utcnow() if success else None,
            error_message=None if success else "Failed to send email"
        )
        db.add(email_log)
        db.commit()

        return success

    except Exception as e:
        print(f"Error sending welcome email to {lead.email}: {str(e)}")

        # Log failed email
        email_log = EmailLog(
            lead_id=lead.id,
            template_name="welcome",
            status="failed",
            scheduled_at=datetime.utcnow(),
            sent_at=None,
            error_message=str(e)
        )
        db.add(email_log)
        db.commit()

        return False


def schedule_followup_emails(db: Session, lead: Lead) -> None:
    """
    Schedule follow-up emails for a lead.

    Args:
        db: Database session
        lead: Lead object
    """
    # Schedule day 3 follow-up
    day3_scheduled = datetime.utcnow() + timedelta(days=3)
    day3_log = EmailLog(
        lead_id=lead.id,
        template_name="followup_day3",
        status="pending",
        scheduled_at=day3_scheduled
    )
    db.add(day3_log)

    # Schedule day 7 follow-up
    day7_scheduled = datetime.utcnow() + timedelta(days=7)
    day7_log = EmailLog(
        lead_id=lead.id,
        template_name="followup_day7",
        status="pending",
        scheduled_at=day7_scheduled
    )
    db.add(day7_log)

    db.commit()
