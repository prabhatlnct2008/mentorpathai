# Project Status: MentorPath AI

## Current Phase: Phase 1 - Project Setup

---

## Phase 1: Project Setup & Scaffolding
- [ ] Initialize Git repository with proper `.gitignore`
- [ ] Create backend directory structure (FastAPI modular layout)
- [ ] Create frontend directory with Vite + React + TypeScript
- [ ] Configure Tailwind CSS with custom design tokens
- [ ] Setup environment variables structure (`.env.example`)
- [ ] Create `requirements.txt` for backend dependencies
- [ ] Create `package.json` with frontend dependencies
- [ ] Configure ESLint and Prettier for frontend
- [ ] Setup Vercel configuration (`vercel.json`)

---

## Phase 2: Database & Models
- [ ] Setup SQLite database connection in `database.py`
- [ ] Create `Lead` SQLAlchemy model
- [ ] Create `EmailTemplate` SQLAlchemy model
- [ ] Create `EmailLog` SQLAlchemy model
- [ ] Create Pydantic schemas (`LeadCreate`, `LeadResponse`)
- [ ] Write database initialization script
- [ ] Seed initial email templates (welcome, followup_day3, followup_day7)

---

## Phase 3: Backend API
- [ ] Setup FastAPI app in `main.py` with CORS middleware
- [ ] Create API router structure (`/api/v1/`)
- [ ] Implement `GET /api/v1/health` endpoint
- [ ] Implement `POST /api/v1/leads` endpoint
- [ ] Implement `GET /api/v1/leads/{email}` endpoint (duplicate check)
- [ ] Create `lead_service.py` with business logic
- [ ] Add input validation and error handling
- [ ] Implement basic rate limiting middleware

---

## Phase 4: Email Service
- [ ] Create SMTP email service (`email_service.py`)
- [ ] Create HTML email template: `welcome.html`
- [ ] Create plain text fallback: `welcome.txt`
- [ ] Create HTML email template: `followup_day3.html`
- [ ] Create HTML email template: `followup_day7.html`
- [ ] Implement send email function with error handling
- [ ] Implement email logging to `EmailLog` table
- [ ] Create email scheduling logic for follow-ups
- [ ] Test email sending with test SMTP server

---

## Phase 5: Frontend - Core Components
- [ ] Create base layout with dark background gradient
- [ ] Build atomic UI components:
  - [ ] `Button.tsx` with variants (primary, secondary, ghost)
  - [ ] `Input.tsx` with error states
  - [ ] `Card.tsx` for containers
  - [ ] `Badge.tsx` for "NEW" and "online" indicators
- [ ] Create utility function `cn.ts` for class merging
- [ ] Setup custom fonts (Space Grotesk, Inter)

---

## Phase 6: Frontend - Chat Components
- [ ] Build `ChatContainer.tsx` (centered card with shadow)
- [ ] Build `ChatHeader.tsx` (logo + "Mentor online" badge)
- [ ] Build `MentorBubble.tsx` (left-aligned message bubble)
- [ ] Build `UserChoiceButtons.tsx` (right-aligned pill buttons)
- [ ] Build `TypingIndicator.tsx` (animated dots)
- [ ] Build `OutcomeCards.tsx` (horizontal scrollable cards)
- [ ] Build `EmailForm.tsx` (inline email capture form)
- [ ] Add CSS animations for bubble entry and typing

---

## Phase 7: Frontend - Chat Flow Logic
- [ ] Define chat steps configuration in `chatSteps.ts`
- [ ] Create `useChatFlow.ts` hook for state management
- [ ] Implement step progression logic with delays
- [ ] Handle persona selection and storage
- [ ] Handle initial interest tracking
- [ ] Build `ChatFlow.tsx` orchestrator component
- [ ] Implement dynamic text insertion (persona-based messages)

---

## Phase 8: Frontend - API Integration
- [ ] Setup API client in `api/index.ts`
- [ ] Create `api/leads.ts` with lead submission function
- [ ] Create `useLeadSubmit.ts` hook with loading/error states
- [ ] Connect `EmailForm.tsx` to API
- [ ] Handle API errors gracefully with user feedback
- [ ] Implement success state transition after submission

---

## Phase 9: Frontend - Landing Page Assembly
- [ ] Build `LandingPage.tsx` (full page layout)
- [ ] Add header section with "NEW" badge and title
- [ ] Integrate `ChatFlow.tsx` component
- [ ] Build `SEOFallback.tsx` with static content:
  - [ ] Static email form
  - [ ] Collapsed FAQ accordion
  - [ ] Program overview text
- [ ] Add below-chat SEO section
- [ ] Ensure mobile responsiveness

---

## Phase 10: Testing & Polish
- [ ] Test complete chat flow end-to-end
- [ ] Test email submission and database storage
- [ ] Test email sending (welcome + follow-ups)
- [ ] Test mobile responsiveness (320px - 768px)
- [ ] Test keyboard navigation and accessibility
- [ ] Fix any visual bugs or inconsistencies
- [ ] Optimize bundle size
- [ ] Add loading states and error boundaries

---

## Phase 11: Deployment
- [ ] Configure Vercel project
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy backend as serverless function
- [ ] Deploy frontend as static site
- [ ] Configure custom domain (if available)
- [ ] Test production deployment
- [ ] Setup basic monitoring/logging
- [ ] Create production email templates with real branding

---

## Phase 12: Post-Launch
- [ ] Monitor lead submissions
- [ ] Review email deliverability
- [ ] Gather initial user feedback
- [ ] Document any issues for iteration
- [ ] Plan next iteration based on data

---

## Progress Log

| Date | Phase | Tasks Completed | Notes |
|:-----|:------|:----------------|:------|
| - | Setup | Project planning documents created | plan.md and phases.md |

---

## Blockers & Notes

*No current blockers*

---

## Quick Reference

**Start Development:**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

**Key Files to Edit:**
- Chat flow content: `frontend/src/features/landing/chatSteps.ts`
- Email templates: `backend/app/templates/emails/`
- Design tokens: `frontend/tailwind.config.js`
- API endpoints: `backend/app/api/v1/endpoints/`
