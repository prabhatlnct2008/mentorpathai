export type ChatStep =
  | 'opening'
  | 'persona_select'
  | 'empathy'
  | 'outcomes'
  | 'email_capture'
  | 'success'
  | 'how_it_works'
  | 'faq'

export type Persona =
  | 'non_technical_founder'
  | 'laid_off_worried'
  | 'non_tech_role'
  | 'student_career_switcher'

export type InitialInterest = 'interested' | 'exploring'

export interface Bubble {
  id: string
  type: 'mentor' | 'user' | 'cards' | 'form' | 'success'
  content: string
  options?: ChatOption[]
  cards?: OutcomeCard[]
}

export interface ChatOption {
  id: string
  label: string
  value: string
}

export interface OutcomeCard {
  id: string
  title: string
  description: string
}

export interface ChatState {
  currentStep: ChatStep
  visibleBubbles: Bubble[]
  selectedPersona: Persona | null
  initialInterest: InitialInterest | null
  email: string | null
  isTyping: boolean
  isSubmitting: boolean
}

export interface LeadData {
  email: string
  persona: Persona
  initialInterest?: InitialInterest
  source?: string
}
