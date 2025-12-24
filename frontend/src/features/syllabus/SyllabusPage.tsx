import { useState } from 'react'

// Icons as SVG components
const Icons = {
  Target: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Rocket: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Book: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Code: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Currency: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Question: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Chat: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Cpu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
}

// Course data
const courses = [
  {
    id: 1,
    title: "Practical GenAI Foundations & Prompting for Builders",
    hours: "~8 hours",
    description: "How LLMs work in practice, using ChatGPT/Claude/Gemini/Cursor as dev tools, prompt patterns, and designing simple LLM workflows.",
    skills: ["Generative AI foundations", "Prompt engineering", "AI workflows", "Developer productivity"],
    icon: "sparkles"
  },
  {
    id: 2,
    title: "Build GenAI Apps with Python & Flask/FastAPI",
    hours: "~8 hours",
    description: "Set up a minimal GenAI backend, call LLM APIs safely, implement structured JSON outputs, and add a lightweight UI.",
    skills: ["LLM application integration", "Flask/FastAPI", "Application development", "Error handling"],
    icon: "code"
  },
  {
    id: 3,
    title: "RAG Fundamentals with LangChain & LlamaIndex",
    hours: "~6 hours",
    description: "What RAG is and when to use it, chunking strategies, basic RAG pipelines, and building a document Q&A bot.",
    skills: ["RAG fundamentals", "Embeddings", "Retrieval-aware prompting", "Q&A apps"],
    icon: "database"
  },
  {
    id: 4,
    title: "Vector Databases for RAG (Chroma / FAISS)",
    hours: "~9 hours",
    description: "Vector DBs vs traditional DBs, using Chroma/FAISS, similarity search, and practical internals that matter.",
    skills: ["Databases", "Vector DBs", "Embeddings", "AI personalization"],
    icon: "database"
  },
  {
    id: 5,
    title: "Advanced RAG & Retrieval Patterns",
    hours: "~7 hours",
    description: "Multi-step RAG pipelines, advanced retrievers, tuning for quality vs latency vs cost, and integrating with UIs.",
    skills: ["Advanced RAG", "Performance tuning", "Vector DBs", "UI components"],
    icon: "cpu"
  },
  {
    id: 6,
    title: "Multimodal GenAI (Text + Images + Docs)",
    hours: "~7 hours",
    description: "Multimodal AI fundamentals, using GPT-4o/Gemini/Llama-Vision for image & document understanding.",
    skills: ["Multimodal prompts", "OpenAI/Gemini APIs", "AI workflows across modalities"],
    icon: "eye"
  },
  {
    id: 7,
    title: "Fundamentals of AI Agents",
    hours: "~10 hours",
    description: "What an AI agent is, tool calling and chaining, building agents that call APIs and run SQL.",
    skills: ["Agentic systems", "Tool calling", "Agent workflows", "Generative AI agents"],
    icon: "cpu"
  },
  {
    id: 8,
    title: "Agentic Systems with LangGraph, CrewAI & AutoGen",
    hours: "~12 hours",
    description: "Agentic architectures with memory, using LangGraph, multi-agent systems, and agentic RAG.",
    skills: ["LangGraph", "Agent orchestration", "Multi-agent systems", "Production patterns"],
    icon: "sparkles"
  },
]

// Capstone projects
const capstoneProjects = [
  {
    id: 1,
    title: "KPI & Metrics Copilot",
    forWho: "Data analysts / BI / product analytics",
    description: "Chat interface where stakeholders ask questions like 'Why did signups drop?' Agent calls SQL queries and uses RAG over metric docs.",
    tech: ["RAG over docs", "SQL tools", "Charting", "LangChain/LlamaIndex"],
    emoji: "📊"
  },
  {
    id: 2,
    title: "Weekly Insights & Report Writer",
    forWho: "Data / PM / ops roles",
    description: "Triggered weekly agent that queries metrics, uses RAG over past reports, and drafts a summary for stakeholders.",
    tech: ["Scheduling", "RAG", "Templated writing", "Email integration"],
    emoji: "📝"
  },
  {
    id: 3,
    title: "Company Knowledge Q&A Bot",
    forWho: "Devs, internal tools builders, founders",
    description: "RAG chatbot over internal docs (policies, specs, onboarding) with basic role awareness via metadata.",
    tech: ["Vector DB", "RAG pipeline", "Role-based retrieval", "Web UI"],
    emoji: "🏢"
  },
  {
    id: 4,
    title: "Customer Support Assistant",
    forWho: "Devs, SaaS folks, support engineers",
    description: "Uses RAG over help center/FAQs and agent tools like get_user, create_ticket. Drafts replies for human approval.",
    tech: ["RAG + tools", "Agent workflows", "Human-in-the-loop"],
    emoji: "💬"
  },
  {
    id: 5,
    title: "Niche AI Research Assistant",
    forWho: "Analysts, students, founders, domain experts",
    description: "Focused research assistant for one domain. Ingests curated corpus, answers questions, compares sources.",
    tech: ["Domain-specific RAG", "Web search tools", "Structured outputs"],
    emoji: "🔬"
  },
  {
    id: 6,
    title: "Multimodal Dashboard Explainer",
    forWho: "Data / BI / PMs",
    description: "Upload a dashboard screenshot, vision model parses it, RAG over docs, outputs human-friendly explanation.",
    tech: ["Vision + text models", "RAG", "Analytics docs"],
    emoji: "📈"
  },
  {
    id: 7,
    title: "Personal Workflow Automator",
    forWho: "Non-tech pros, managers, ops, solo founders",
    description: "Automates daily work: summarize emails, turn call notes into actions, draft proposals from inputs.",
    tech: ["Email/calendar tools", "LLM flows", "Optional RAG"],
    emoji: "⚡"
  },
  {
    id: 8,
    title: "AI Micro-SaaS MVP",
    forWho: "Indie hackers / experimenters",
    description: "Small, focused AI tool people could pay for (proposal generator, interview prep bot, etc.).",
    tech: ["RAG (optional)", "Simple agent", "Web UI", "Basic auth"],
    emoji: "🚀"
  },
]

// Weekly flow data
const weeklyFlow = [
  {
    week: 1,
    title: "Foundation & Project Spec",
    tasks: ["Clarify background and goals", "Choose one capstone project", "Set up repo, environment, basic stack"]
  },
  {
    week: 2,
    title: "Data & RAG Skeleton",
    tasks: ["Collect and prepare initial data", "Implement first RAG pipeline", "Simple answer generation working"]
  },
  {
    week: 3,
    title: "Vector DB & Retrieval Tuning",
    tasks: ["Move to vector DB (Chroma/FAISS)", "Improve chunking + metadata", "Test retrieval quality metrics"]
  },
  {
    week: 4,
    title: "Agent Layer & Tools",
    tasks: ["Add tools: SQL, APIs, workflows", "Wrap RAG pipeline inside an agent", "Handle basic failure scenarios"]
  },
  {
    week: 5,
    title: "UX, Guardrails & Observability",
    tasks: ["Add/clean up UI (Gradio/React)", "Basic logging, prompt templates", "Polish flows based on test runs"]
  },
  {
    week: 6,
    title: "Demo, Story & Next Steps",
    tasks: ["Final polish + deploy/shareable demo", "Prepare 'how I built this' story", "Plan v2 roadmap"]
  },
]

// FAQ data
const faqData = [
  {
    q: "Do I need to be good at coding?",
    a: "Basic familiarity with Python is ideal. You don't need to be an expert in ML or deep learning. If you can read and modify simple scripts, we can work together. For more non-technical profiles, the project and stack are chosen to match your comfort level."
  },
  {
    q: "How much time do I need per week?",
    a: "60–75 minutes for the weekly 1:1 call, plus 3–5 hours of self-work (coding, reading, implementing tasks). If you can consistently spend 4–6 hours per week, you'll progress well."
  },
  {
    q: "Is this a job guarantee or placement program?",
    a: "No. This is a skills and project-focused mentorship to make you more confident with GenAI, RAG, and agents, and give you a strong capstone to talk about in interviews or at work."
  },
  {
    q: "Will I get a certificate?",
    a: "You may receive a simple completion note, but the primary value is: the project you built, the GitHub repo/demo, and the story of how you designed and shipped it. Those matter more to serious teams than a certificate image."
  },
  {
    q: "What tools and frameworks will we use?",
    a: "Depending on your project: OpenAI/Anthropic/Gemini APIs, LangChain/LlamaIndex/LangGraph, Chroma/FAISS, Python + Flask or FastAPI, and Gradio or basic React for UI. We'll decide together based on your goals."
  },
  {
    q: "What if I miss a week?",
    a: "Life happens. If you need to miss a week, please inform in advance. We can reschedule within the same program window where possible. Repeated no-shows without notice may count as used sessions."
  },
  {
    q: "Can I pay in instalments beyond Week 1?",
    a: "The structure is 20% advance before Week 1, then 80% at the start of Week 2 if you decide to continue. If you require a different plan, we can discuss case-by-case."
  },
  {
    q: "How many students are you taking?",
    a: "This is a low-volume, high-attention offering. The mentor works with only a small number of mentees at a time, to keep bandwidth for real hands-on help."
  },
]

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex items-center justify-between text-left bg-chat-bg hover:bg-chat-bg/80 transition-colors"
      >
        <span className="font-medium text-text-main">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <Icons.ChevronDown />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-6 py-4 text-text-muted bg-background">{answer}</p>
      </div>
    </div>
  )
}

export default function SyllabusPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="max-w-[1000px] mx-auto px-6 relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-text-muted">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              6-Week 1:1 Mentoring Program
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center text-text-main mb-6">
            1:1 Agentic AI & RAG
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Developer Track
            </span>
          </h1>

          <p className="text-xl text-text-muted text-center max-w-2xl mx-auto mb-8">
            A 6-week, project-based mentoring program to build one real GenAI / agentic application end-to-end.
          </p>

          <div className="bg-chat-bg/50 border border-border rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-center text-text-muted italic">
              "Not another batch course or 'lifetime access' video library. This is you, a mentor, and one serious project – shipped."
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 bg-chat-bg">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Icons.Users />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Who This Program Is For</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="font-semibold text-text-main mb-2">Data & Analytics Folks</h3>
              <p className="text-text-muted text-sm">Data analysts, BI, product & growth people who want to move into GenAI / applied ML roles.</p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">👨‍💻</div>
              <h3 className="font-semibold text-text-main mb-2">Software Engineers</h3>
              <p className="text-text-muted text-sm">Engineers who can code but haven't yet built a serious GenAI or agentic app.</p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-semibold text-text-main mb-2">Non-Traditional Tech</h3>
              <p className="text-text-muted text-sm">Ops, PMs, founders who are comfortable with tools and want to build a working AI helper.</p>
            </div>
          </div>

          <div className="bg-background/50 rounded-xl p-6 border border-primary/20">
            <p className="text-text-muted">
              <span className="text-primary font-semibold">You don't need to be an ML researcher.</span> Basic Python + comfort with using tools (or willingness to learn) is enough. By the end, you'll have <span className="text-text-main font-medium">one demo-ready project</span> you can show in interviews, at work, or as the first version of a product.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success">
              <Icons.Rocket />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">What You'll Get Out of It</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Build one end-to-end GenAI / agent system (RAG + tools + simple UI)",
              "Understand how LLM apps actually work – prompts, tools, memory, retrieval, orchestration",
              "Be comfortable using ChatGPT / Claude / Gemini / Cursor as serious dev tools",
              "Know how to wire together Python, Flask/FastAPI, vector DBs, LangChain / LlamaIndex / LangGraph",
              "Have a repeatable mental model for new GenAI projects instead of 'just trying prompts'"
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-chat-bg rounded-xl border border-border">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 text-success">
                  <Icons.Check />
                </div>
                <p className="text-text-muted">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
            <p className="text-center text-text-main font-medium">
              You don't finish with a certificate. You finish with <span className="text-primary">a real project and a clear story</span> of how you built it.
            </p>
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-20 bg-chat-bg">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Icons.Calendar />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Program Structure</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-background rounded-xl p-6 border border-border text-center">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-text-muted">Weeks Duration</div>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border text-center">
              <div className="text-4xl font-bold text-secondary mb-2">2x</div>
              <div className="text-text-muted">Weekly 1:1 Calls</div>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border text-center">
              <div className="text-4xl font-bold text-success mb-2">∞</div>
              <div className="text-text-muted">Async Support</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                <Icons.Clock />
                Session Format
              </h3>
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Two weekly 1:1 calls (45–60 min each)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Async chat support for questions & blockers
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Flexible around your working hours
                </li>
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                <Icons.Target />
                Weekly Rhythm
              </h3>
              <ul className="space-y-3 text-text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Week 0: Short intro call (15–20 min)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Weeks 1–2: Foundations + project design
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary">•</span>
                  Weeks 3–6: Build, iterate, polish, demo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Icons.Book />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Curriculum Overview</h2>
          </div>
          <p className="text-text-muted mb-8 ml-15">The program is modular. We don't rigidly march through every module – we <span className="text-primary">pull what you need</span> for your capstone.</p>

          <div className="grid gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-chat-bg rounded-xl p-6 border border-border hover:border-primary/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl font-bold">{course.id}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-text-main">{course.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{course.hours}</span>
                    </div>
                    <p className="text-text-muted text-sm mb-3">{course.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-background text-text-muted border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capstone Projects */}
      <section className="py-20 bg-chat-bg">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Icons.Briefcase />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Capstone Project Ideas</h2>
          </div>
          <p className="text-text-muted mb-8 ml-15">In the first week or two, we choose <span className="text-secondary">one capstone</span> that matches your background and goals.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {capstoneProjects.map((project) => (
              <div key={project.id} className="bg-background rounded-xl p-6 border border-border hover:border-secondary/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{project.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-main mb-1">{project.title}</h3>
                    <p className="text-xs text-secondary mb-2">For: {project.forWho}</p>
                    <p className="text-text-muted text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-chat-bg text-text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Week Flow */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center text-success">
              <Icons.Calendar />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Sample 6-Week Flow</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-success hidden md:block" />

            <div className="space-y-6">
              {weeklyFlow.map((week) => (
                <div key={week.week} className="relative flex gap-6">
                  {/* Week number */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-white font-bold">{week.week}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-chat-bg rounded-xl p-6 border border-border">
                    <h3 className="font-semibold text-text-main mb-3">Week {week.week}: {week.title}</h3>
                    <ul className="space-y-2">
                      {week.tasks.map((task, i) => (
                        <li key={i} className="flex items-center gap-2 text-text-muted text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="py-20 bg-chat-bg">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Icons.Currency />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Fees, Advance & Refund Policy</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-background rounded-xl p-6 border border-primary/30 relative overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1 px-10 shadow-lg animate-pulse">
                40% OFF
              </div>

              {/* Original Price - Strikethrough */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-lg text-text-muted line-through decoration-red-500 decoration-2">₹29,000</span>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">Save ₹11,600</span>
              </div>

              {/* Discounted Price */}
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2 animate-pulse">
                ₹17,400
              </h3>
              <p className="text-text-muted mb-4">
                <span className="text-green-400 font-medium">Limited Time Offer</span> · 6-week 1:1 track fee
              </p>
              <ul className="space-y-2 text-sm text-text-muted">
                <li className="flex items-center gap-2">
                  <Icons.Check />
                  ~12 × 45–60 min 1:1 calls
                </li>
                <li className="flex items-center gap-2">
                  <Icons.Check />
                  Async chat support between calls
                </li>
                <li className="flex items-center gap-2">
                  <Icons.Check />
                  Custom project design and reviews
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-6 border border-border">
              <h3 className="font-semibold text-text-main mb-4">Payment Schedule</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">1</div>
                  <div>
                    <p className="font-medium text-text-main flex items-center gap-2">
                      20% Advance
                      <span className="line-through text-text-muted text-sm">₹5,800</span>
                      <span className="text-green-400 font-bold">₹3,480</span>
                    </p>
                    <p className="text-sm text-text-muted">To confirm your slot</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">2</div>
                  <div>
                    <p className="font-medium text-text-main">Week 1 – Experience the Program</p>
                    <p className="text-sm text-text-muted">Try before you commit fully</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-sm font-bold">3</div>
                  <div>
                    <p className="font-medium text-text-main flex items-center gap-2">
                      80% Remaining
                      <span className="line-through text-text-muted text-sm">₹23,200</span>
                      <span className="text-green-400 font-bold">₹13,920</span>
                    </p>
                    <p className="text-sm text-text-muted">Pay at start of Week 2 if you continue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl p-6 border border-success/30">
            <h3 className="font-semibold text-text-main mb-2 flex items-center gap-2">
              <Icons.Target />
              Week 1 Satisfaction Guarantee
            </h3>
            <p className="text-text-muted text-sm">
              Up to 48 hours after your second Week 1 session, you may request a <span className="text-success font-medium">full refund of everything you've paid</span> (including the 20% advance). No questions asked – we stop the program on friendly terms.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <Icons.Question />
            </div>
            <h2 className="text-3xl font-heading font-bold text-text-main">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-chat-bg to-background">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-main mb-4">
            Ready to build your first serious GenAI project?
          </h2>
          <p className="text-text-muted mb-8">
            Send a short message with your background + what you want from GenAI/agents. If it seems like a good fit, we'll do a short intro call.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@mentorpathai.com?subject=Interested%20in%201:1%20Agentic%20AI%20Track"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
            >
              <Icons.Chat />
              Get in Touch
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-border text-text-main hover:bg-white/5 transition-colors"
            >
              Back to Home
            </a>
          </div>

          <p className="mt-8 text-sm text-text-muted">
            From there, we're partners for 6 weeks, focused on shipping one solid project. 🚀
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-text-muted text-sm">
            © {new Date().getFullYear()} MentorPath AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
