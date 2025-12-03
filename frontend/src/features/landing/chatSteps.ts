export type PersonaType =
  | 'non_technical_founder'
  | 'laid_off_worried'
  | 'non_tech_role'
  | 'student_career_switcher'

export interface ChatOption {
  id: string
  label: string
}

export interface ChatStep {
  id: string
  type: 'message' | 'options' | 'personas' | 'outcomes' | 'email' | 'success' | 'info'
  message?: string
  options?: ChatOption[]
  personas?: ChatOption[]
  outcomes?: { id: string; title: string; description: string }[]
  getDynamicMessage?: (persona: PersonaType) => string
}

const empathyMessages: Record<PersonaType, string> = {
  non_technical_founder: "I get it - you want to build AI features without hiring a whole team. That's exactly what I'm here to help you with.",
  laid_off_worried: "I understand. The job market is tough, but AI skills are your unfair advantage right now. Let me show you what's possible.",
  non_tech_role: "Perfect! You don't need to become a developer. I'll teach you to use AI tools to 10x your work - no coding required.",
  student_career_switcher: "Great timing. GenAI is creating thousands of new jobs, and I'll help you get the skills to land one."
}

export const chatSteps: ChatStep[] = [
  {
    id: 'opening',
    type: 'message',
    message: "Hey, I'm your GenAI mentor. I help people like you go from zero AI knowledge to building real projects in weeks, not months."
  },
  {
    id: 'initial_interest',
    type: 'options',
    message: "Quick question - what brings you here today?",
    options: [
      { id: 'interested', label: "I want to learn GenAI" },
      { id: 'exploring', label: "Just exploring what's possible" }
    ]
  },
  {
    id: 'persona_select',
    type: 'personas',
    message: "Cool! Which one sounds most like you?",
    personas: [
      { id: 'non_technical_founder', label: "Non-technical founder who wants to build AI features" },
      { id: 'laid_off_worried', label: "Laid off / worried about job security" },
      { id: 'non_tech_role', label: "In a non-tech role, want to use AI to work smarter" },
      { id: 'student_career_switcher', label: "Student or career switcher exploring AI" }
    ]
  },
  {
    id: 'empathy',
    type: 'message',
    getDynamicMessage: (persona: PersonaType) => empathyMessages[persona]
  },
  {
    id: 'outcomes',
    type: 'outcomes',
    message: "Here's what you'll be able to do after my program:",
    outcomes: [
      {
        id: 'build_product',
        title: 'Build an AI product',
        description: 'Ship a production-ready AI app with just ChatGPT and basic prompts'
      },
      {
        id: 'use_rag',
        title: 'Use RAG with your data',
        description: 'Create AI that actually knows your business data and documents'
      },
      {
        id: 'vibe_code',
        title: 'Vibe-code complex features',
        description: 'Describe what you want, let AI write the code, you just review and ship'
      }
    ]
  },
  {
    id: 'email_prompt',
    type: 'message',
    message: "Interested? Drop your email and I'll send you the details + a free intro lesson."
  },
  {
    id: 'email_capture',
    type: 'email'
  },
  {
    id: 'success',
    type: 'success',
    message: "Awesome! Check your email in the next 5 minutes. I just sent you:\n\n✓ Free intro lesson\n✓ Program curriculum\n✓ Early access pricing\n\nP.S. If you don't see it, check spam!"
  },
  {
    id: 'how_it_works_prompt',
    type: 'options',
    message: "Want to know how the program works?",
    options: [
      { id: 'yes', label: "Yes, tell me more" },
      { id: 'no', label: "No thanks, I'll check my email" }
    ]
  },
  {
    id: 'how_it_works',
    type: 'info',
    message: "Here's how it works:\n\n📚 Week 1-2: AI Fundamentals\nLearn prompting, tokens, embeddings\n\n🛠️ Week 3-4: Build Your First AI App\nRAG, vector databases, API integration\n\n🚀 Week 5-6: Ship to Production\nDeployment, scaling, monitoring\n\n💬 Plus: 1:1 mentoring sessions every week"
  },
  {
    id: 'faq_prompt',
    type: 'options',
    message: "Any questions?",
    options: [
      { id: 'view_faq', label: "Show me the FAQ" },
      { id: 'done', label: "Nope, I'm good!" }
    ]
  }
]

export const faqData = [
  {
    question: "Do I need coding experience?",
    answer: "No! If you can use ChatGPT, you can build AI apps. I teach you to use AI to write the code."
  },
  {
    question: "How much time do I need per week?",
    answer: "5-7 hours. 2 hours of lessons, 3-5 hours building your project. Totally flexible schedule."
  },
  {
    question: "What if I get stuck?",
    answer: "You get 1:1 mentoring sessions every week, plus access to our Discord community for quick help."
  },
  {
    question: "Is this live or pre-recorded?",
    answer: "Hybrid. Pre-recorded lessons you can watch anytime + live weekly mentoring sessions."
  },
  {
    question: "What do I get at the end?",
    answer: "A portfolio AI project, certificate of completion, and job referrals if you want them."
  }
]
