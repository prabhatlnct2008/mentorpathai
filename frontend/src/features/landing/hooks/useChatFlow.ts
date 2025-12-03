import { useState, useCallback, useRef, useEffect } from 'react'
import { chatSteps, PersonaType } from '../chatSteps'

export interface ChatBubble {
  id: string
  stepId: string
  type: 'message' | 'options' | 'personas' | 'outcomes' | 'email' | 'success' | 'info'
  message?: string
  options?: { id: string; label: string }[]
  personas?: { id: string; label: string }[]
  outcomes?: { id: string; title: string; description: string }[]
}

// Steps that WAIT for user interaction (don't auto-progress after showing)
const WAIT_FOR_INPUT_STEPS = new Set([
  'initial_interest',  // Wait for user to pick interested/exploring
  'persona_select',    // Wait for user to pick persona
  'email_capture',     // Wait for user to submit email
  'how_it_works_prompt', // Wait for yes/no
  'faq_prompt'         // Wait for view_faq/done
])

export default function useChatFlow() {
  const [visibleBubbles, setVisibleBubbles] = useState<ChatBubble[]>([])
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null)
  const [initialInterest, setInitialInterest] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  // Use refs to prevent issues with stale closures
  const currentStepIndexRef = useRef(0)
  const isInitializedRef = useRef(false)
  const selectedPersonaRef = useRef<PersonaType | null>(null)
  const isProcessingRef = useRef(false)

  // Keep persona ref in sync
  useEffect(() => {
    selectedPersonaRef.current = selectedPersona
  }, [selectedPersona])

  const showStep = useCallback(async (stepIndex: number): Promise<boolean> => {
    const step = chatSteps[stepIndex]
    if (!step) return false

    // Show typing indicator
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 400))
    setIsTyping(false)

    // Build the bubble
    const message = step.getDynamicMessage && selectedPersonaRef.current
      ? step.getDynamicMessage(selectedPersonaRef.current)
      : step.message

    const bubble: ChatBubble = {
      id: `${step.id}-${Date.now()}`,
      stepId: step.id,
      type: step.type,
      message,
      options: step.options,
      personas: step.personas,
      outcomes: step.outcomes
    }

    setVisibleBubbles(prev => [...prev, bubble])

    // Return whether we should wait for user input
    return WAIT_FOR_INPUT_STEPS.has(step.id)
  }, [])

  const progressChat = useCallback(async () => {
    // Prevent concurrent progression
    if (isProcessingRef.current) return
    isProcessingRef.current = true

    try {
      while (currentStepIndexRef.current < chatSteps.length) {
        const stepIndex = currentStepIndexRef.current
        const shouldWait = await showStep(stepIndex)

        currentStepIndexRef.current = stepIndex + 1

        if (shouldWait) {
          // Stop and wait for user interaction
          break
        }

        // Small delay before showing next auto-message
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    } finally {
      isProcessingRef.current = false
    }
  }, [showStep])

  const handleOptionSelect = useCallback((stepId: string, optionId: string) => {
    if (stepId === 'initial_interest') {
      setInitialInterest(optionId)
    }

    // For "no" options on optional prompts, don't progress further
    if (stepId === 'how_it_works_prompt' && optionId === 'no') {
      return
    }
    if (stepId === 'faq_prompt') {
      // Both options end the chat - view_faq scrolls to FAQ section
      return
    }

    // Continue the chat
    progressChat()
  }, [progressChat])

  const handlePersonaSelect = useCallback((personaId: string) => {
    const persona = personaId as PersonaType
    setSelectedPersona(persona)
    selectedPersonaRef.current = persona

    // Continue to empathy message and beyond
    progressChat()
  }, [progressChat])

  const handleEmailSubmit = useCallback((emailValue: string) => {
    setEmail(emailValue)
    progressChat()
  }, [progressChat])

  const startChat = useCallback(() => {
    // Only initialize once
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    progressChat()
  }, [progressChat])

  return {
    visibleBubbles,
    isTyping,
    selectedPersona,
    initialInterest,
    email,
    handleOptionSelect,
    handlePersonaSelect,
    handleEmailSubmit,
    startChat
  }
}
