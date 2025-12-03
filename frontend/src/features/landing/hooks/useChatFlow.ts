import { useState, useCallback } from 'react'
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

export default function useChatFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [visibleBubbles, setVisibleBubbles] = useState<ChatBubble[]>([])
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null)
  const [initialInterest, setInitialInterest] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const addBubble = useCallback((step: typeof chatSteps[number]) => {
    const message = step.getDynamicMessage && selectedPersona
      ? step.getDynamicMessage(selectedPersona)
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
  }, [selectedPersona])

  const progressToNextStep = useCallback(async () => {
    if (currentStepIndex >= chatSteps.length) return

    setIsTyping(true)

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800))

    setIsTyping(false)

    const nextStep = chatSteps[currentStepIndex]
    addBubble(nextStep)

    setCurrentStepIndex(prev => prev + 1)
  }, [currentStepIndex, addBubble])

  const handleOptionSelect = useCallback((stepId: string, optionId: string) => {
    if (stepId === 'initial_interest') {
      setInitialInterest(optionId)
      progressToNextStep()
    } else if (stepId === 'how_it_works_prompt') {
      if (optionId === 'yes') {
        progressToNextStep()
      } else {
        // End conversation
        return
      }
    } else if (stepId === 'faq_prompt') {
      if (optionId === 'view_faq') {
        // This will be handled in the landing page to scroll to FAQ
        return
      } else {
        // End conversation
        return
      }
    } else {
      progressToNextStep()
    }
  }, [progressToNextStep])

  const handlePersonaSelect = useCallback((personaId: string) => {
    setSelectedPersona(personaId as PersonaType)
    progressToNextStep()
  }, [progressToNextStep])

  const handleEmailSubmit = useCallback((emailValue: string) => {
    setEmail(emailValue)
    progressToNextStep()
  }, [progressToNextStep])

  const startChat = useCallback(() => {
    progressToNextStep()
  }, [progressToNextStep])

  return {
    visibleBubbles,
    isTyping,
    selectedPersona,
    initialInterest,
    email,
    handleOptionSelect,
    handlePersonaSelect,
    handleEmailSubmit,
    startChat,
    progressToNextStep
  }
}
