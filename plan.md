# Implementation Plan: MentorPath AI

## 1. System Overview

MentorPath AI is a chat-first landing page that simulates a conversational onboarding experience for a 1:1 GenAI mentoring program. The system guides visitors through a scripted conversation flow, captures lead information (email + persona), and triggers automated email sequences.

### Core User Journey
1. User lands on page → sees chat interface with opening hook
2. User clicks through persona selection → system stores persona type
3. User views outcome cards → expresses interest
4. User submits email → lead captured to database
5. System triggers welcome email + schedules follow-ups
6. Optional: User continues reading FAQ in chat format

### Technical Constraints
- **Database**: SQLite (MVP)
- **Authentication**: None (public lead capture)
- **Deployment**: Vercel (Frontend + Serverless Functions)
- **Email**: Basic SMTP
- **SEO**: Static fallback section below chat

---

## 2. Architecture Specification

### 2.1 Project Structure

```
mentorpathai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry
│   │   ├── config.py               # Settings & env vars
│   │   ├── database.py             # SQLite connection
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── v1/
│   │   │       ├── __init__.py
│   │   │       ├── router.py       # API router aggregator
│   │   │       └── endpoints/
│   │   │           ├── __init__.py
│   │   │           ├── leads.py    # Lead capture endpoint
│   │   │           └── health.py   # Health check
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── lead.py             # SQLAlchemy models
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   └── lead.py             # Pydantic schemas
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── lead_service.py     # Lead business logic
│   │   │   └── email_service.py    # SMTP email sending
│   │   └── templates/
│   │       └── emails/
│   │           ├── welcome.html
│   │           ├── welcome.txt
│   │           ├── followup_day3.html
│   │           ├── followup_day3.txt
│   │           ├── followup_day7.html
│   │           └── followup_day7.txt
│   ├── requirements.txt
│   └── alembic/                    # DB migrations (optional for SQLite)
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css               # Tailwind imports
│   │   ├── api/
│   │   │   ├── index.ts            # API client setup
│   │   │   └── leads.ts            # Lead API calls
│   │   ├── components/
│   │   │   ├── ui/                 # Atomic UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Badge.tsx
│   │   │   └── chat/               # Chat-specific components
│   │   │       ├── ChatContainer.tsx
│   │   │       ├── ChatHeader.tsx
│   │   │       ├── MentorBubble.tsx
│   │   │       ├── UserChoiceButtons.tsx
│   │   │       ├── OutcomeCards.tsx
│   │   │       ├── EmailForm.tsx
│   │   │       └── TypingIndicator.tsx
│   │   ├── features/
│   │   │   └── landing/
│   │   │       ├── LandingPage.tsx
│   │   │       ├── ChatFlow.tsx        # Main chat orchestrator
│   │   │       ├── SEOFallback.tsx     # Static content below chat
│   │   │       ├── chatSteps.ts        # Conversation flow config
│   │   │       └── hooks/
│   │   │           └── useChatFlow.ts  # Chat state management
│   │   ├── hooks/
│   │   │   └── useLeadSubmit.ts
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   └── chat.ts
│   │   └── utils/
│   │       └── cn.ts               # Tailwind class merger
│   ├── public/
│   │   └── favicon.ico
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── plan.md
├── phases.md
├── product_spec.md
├── instructions.md
└── README.md
```

---

### 2.2 Database Models (SQLAlchemy)

#### **Lead**
| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `id` | Integer | PK, Auto-increment | Unique identifier |
| `email` | String(255) | Unique, Not Null, Index | Lead email address |
| `persona` | String(50) | Not Null | User persona selection |
| `source` | String(50) | Default: "landing_chat" | Lead acquisition source |
| `initial_interest` | String(50) | Nullable | "interested" or "exploring" |
| `created_at` | DateTime | Default: now() | Lead capture timestamp |
| `updated_at` | DateTime | On update: now() | Last modification |

#### **EmailTemplate**
| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `id` | Integer | PK, Auto-increment | Unique identifier |
| `name` | String(100) | Unique, Not Null | Template identifier (e.g., "welcome") |
| `subject` | String(255) | Not Null | Email subject line |
| `html_content` | Text | Not Null | HTML version of email |
| `text_content` | Text | Not Null | Plain text fallback |
| `is_active` | Boolean | Default: True | Enable/disable template |
| `created_at` | DateTime | Default: now() | Creation timestamp |
| `updated_at` | DateTime | On update: now() | Last modification |

#### **EmailLog**
| Column | Type | Constraints | Description |
|:-------|:-----|:------------|:------------|
| `id` | Integer | PK, Auto-increment | Unique identifier |
| `lead_id` | Integer | FK -> Lead.id | Associated lead |
| `template_name` | String(100) | Not Null | Template used |
| `status` | String(20) | Not Null | "pending", "sent", "failed" |
| `scheduled_at` | DateTime | Not Null | When to send |
| `sent_at` | DateTime | Nullable | Actual send time |
| `error_message` | Text | Nullable | Failure reason if any |
| `created_at` | DateTime | Default: now() | Log creation time |

#### Persona Enum Values
```python
PERSONAS = [
    "non_technical_founder",
    "laid_off_worried",
    "non_tech_role",
    "student_career_switcher"
]
```

---

### 2.3 API Contract (FastAPI)

| Method | Endpoint | Request Schema | Response Schema | Description |
|:-------|:---------|:---------------|:----------------|:------------|
| GET | `/api/v1/health` | - | `HealthResponse` | Health check |
| POST | `/api/v1/leads` | `LeadCreate` | `LeadResponse` | Capture new lead |
| GET | `/api/v1/leads/{email}` | - | `LeadResponse` | Check if lead exists (for re-visitors) |

#### Schemas

**LeadCreate**
```python
class LeadCreate(BaseModel):
    email: EmailStr
    persona: str  # One of PERSONAS
    initial_interest: Optional[str] = None  # "interested" | "exploring"
    source: str = "landing_chat"
```

**LeadResponse**
```python
class LeadResponse(BaseModel):
    id: int
    email: str
    persona: str
    source: str
    created_at: datetime

    class Config:
        from_attributes = True
```

**HealthResponse**
```python
class HealthResponse(BaseModel):
    status: str = "ok"
    timestamp: datetime
```

---

### 2.4 Frontend Modules

#### **Feature: Landing**
| Component | Type | Responsibility |
|:----------|:-----|:---------------|
| `LandingPage.tsx` | Page | Main page layout, background gradient |
| `ChatFlow.tsx` | Smart | Orchestrates chat state, step progression |
| `SEOFallback.tsx` | UI | Static content for SEO below chat |

#### **Components: Chat**
| Component | Type | Props | Responsibility |
|:----------|:-----|:------|:---------------|
| `ChatContainer.tsx` | Layout | children | Chat card wrapper with styling |
| `ChatHeader.tsx` | UI | - | Logo, "Mentor online" indicator |
| `MentorBubble.tsx` | UI | message, isTyping | Left-aligned mentor message |
| `UserChoiceButtons.tsx` | Interactive | options, onSelect | Right-aligned choice pills |
| `OutcomeCards.tsx` | UI | cards | Horizontal scrollable outcome cards |
| `EmailForm.tsx` | Form | onSubmit, persona | Email capture form in chat |
| `TypingIndicator.tsx` | UI | - | Animated "..." typing dots |

#### **Components: UI (Atomic)**
| Component | Props | Variants |
|:----------|:------|:---------|
| `Button.tsx` | children, onClick, variant, size | primary, secondary, ghost |
| `Input.tsx` | label, placeholder, error, ...inputProps | default, error |
| `Card.tsx` | children, className | default |
| `Badge.tsx` | children, variant | new, online |

---

### 2.5 Chat Flow State Machine

```typescript
type ChatStep =
  | "opening"           // Step 1: Initial hook
  | "persona_select"    // Step 2: Who are you?
  | "empathy"           // Step 3: Mirror back
  | "outcomes"          // Step 4: What you'll achieve
  | "email_capture"     // Step 5: Email form
  | "success"           // Step 6: Confirmation
  | "how_it_works"      // Step 7: Optional deep dive
  | "faq"               // Step 8: FAQ section

interface ChatState {
  currentStep: ChatStep;
  visibleBubbles: Bubble[];
  selectedPersona: string | null;
  initialInterest: string | null;
  email: string | null;
  isTyping: boolean;
}
```

#### Flow Transitions
```
opening -> (click any) -> persona_select
persona_select -> (select persona) -> empathy
empathy -> (auto after delay) -> outcomes
outcomes -> (click "Yes, send me details") -> email_capture
email_capture -> (submit form) -> success
success -> (click "Yes, show me") -> how_it_works
how_it_works -> (auto after delay) -> faq
```

---

### 2.6 Design Tokens (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#050816',
        'chat-bg': '#0B1020',
        primary: '#4C6FFF',
        secondary: '#7C3AED',
        'text-main': '#F9FAFB',
        'text-muted': '#9CA3AF',
        border: '#1F2937',
        success: '#10B981',
        error: '#EF4444',
        'bubble-bg': '#111827',
        'bubble-border': 'rgba(148, 163, 184, 0.25)',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'bubble': '18px',
        'card': '24px',
      },
      boxShadow: {
        'chat': '0 30px 80px rgba(15, 23, 42, 0.9)',
      },
    },
  },
}
```

---

## 3. Implementation Details

### 3.1 Email Service

**SMTP Configuration (Environment Variables)**
```
SMTP_HOST=smtp.gmail.com  # or your provider
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_NAME=MentorPath AI
SMTP_FROM_EMAIL=hello@mentorpathai.com
```

**Email Sequence**
| Template | Trigger | Delay | Subject |
|:---------|:--------|:------|:--------|
| `welcome` | Lead created | Immediate | "Welcome to MentorPath AI – here's your 6-week GenAI mentoring overview" |
| `followup_day3` | Lead created | +3 days | "Quick question about your AI project idea" |
| `followup_day7` | Lead created | +7 days | "Ready to start building?" |

### 3.2 Vercel Deployment

**Frontend**: Deploy as static site with Vite
- Build command: `npm run build`
- Output directory: `dist`

**Backend**: Deploy as serverless functions
- Convert FastAPI to Vercel serverless format
- Use `vercel.json` for routing configuration

```json
// vercel.json
{
  "builds": [
    { "src": "frontend/package.json", "use": "@vercel/static-build" },
    { "src": "backend/app/main.py", "use": "@vercel/python" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/app/main.py" },
    { "src": "/(.*)", "dest": "frontend/dist/$1" }
  ]
}
```

### 3.3 Animation Details

**Typing Indicator**: 3 dots with staggered opacity animation
**Bubble Entry**: Fade in + slight slide up (150ms ease-out)
**Card Scroll**: Horizontal scroll with snap points

### 3.4 Third-Party Libraries

**Backend**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `sqlalchemy` - ORM
- `pydantic` - Validation
- `python-dotenv` - Environment config
- `aiosmtplib` - Async SMTP

**Frontend**
- `react` - UI library
- `vite` - Build tool
- `tailwindcss` - Styling
- `clsx` / `tailwind-merge` - Class utilities
- `react-hook-form` - Form handling
- `zod` - Schema validation

---

## 4. Security Considerations

1. **Email Validation**: Use Pydantic's `EmailStr` for server-side validation
2. **Rate Limiting**: Implement basic rate limiting on `/api/v1/leads` (10 req/min per IP)
3. **CORS**: Restrict to frontend domain in production
4. **Input Sanitization**: Sanitize persona and source fields
5. **SMTP Credentials**: Store in environment variables, never commit

---

## 5. Future Enhancements (Out of Scope for MVP)

- [ ] Admin dashboard for viewing leads
- [ ] A/B testing different chat flows
- [ ] Analytics integration (Mixpanel/Amplitude)
- [ ] Real-time lead notifications (Slack webhook)
- [ ] Multi-language support
- [ ] Cohort management system
