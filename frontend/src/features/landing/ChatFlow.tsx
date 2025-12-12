import { useEffect } from 'react'
import ChatContainer from '../../components/chat/ChatContainer'
import ChatHeader from '../../components/chat/ChatHeader'
import MentorBubble from '../../components/chat/MentorBubble'
import UserChoiceButtons from '../../components/chat/UserChoiceButtons'
import TypingIndicator from '../../components/chat/TypingIndicator'
import OutcomeCards from '../../components/chat/OutcomeCards'
import EmailForm from '../../components/chat/EmailForm'
import useChatFlow from './hooks/useChatFlow'

export interface ChatFlowProps {
  onEmailSubmit?: (email: string, persona: string | null) => Promise<void>
  emailLoading?: boolean
  emailError?: string
}

export default function ChatFlow({ onEmailSubmit, emailLoading, emailError }: ChatFlowProps) {
  const {
    visibleBubbles,
    isTyping,
    selectedPersona,
    handleOptionSelect,
    handlePersonaSelect,
    handleEmailSubmit,
    startChat
  } = useChatFlow()

  useEffect(() => {
    // Start the chat flow when component mounts (only once)
    startChat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleEmailFormSubmit = async (emailValue: string) => {
    if (onEmailSubmit) {
      // When external handler is provided, it handles success (shows modal)
      // Don't progress to inline success bubble
      await onEmailSubmit(emailValue, selectedPersona)
    } else {
      // Only show inline success bubble when no external handler
      handleEmailSubmit(emailValue)
    }
  }

  return (
    <ChatContainer>
      <ChatHeader />

      <div className="space-y-4">
        {visibleBubbles.map((bubble) => (
          <div key={bubble.id}>
            {bubble.type === 'message' && bubble.message && (
              <MentorBubble>
                <div className="whitespace-pre-line">{bubble.message}</div>
              </MentorBubble>
            )}

            {bubble.type === 'options' && bubble.options && (
              <>
                {bubble.message && (
                  <MentorBubble>
                    <div className="whitespace-pre-line">{bubble.message}</div>
                  </MentorBubble>
                )}
                <UserChoiceButtons
                  options={bubble.options}
                  onSelect={(optionId) => handleOptionSelect(bubble.stepId, optionId)}
                />
              </>
            )}

            {bubble.type === 'personas' && bubble.personas && (
              <>
                {bubble.message && (
                  <MentorBubble>
                    <div className="whitespace-pre-line">{bubble.message}</div>
                  </MentorBubble>
                )}
                <UserChoiceButtons
                  options={bubble.personas}
                  onSelect={handlePersonaSelect}
                />
              </>
            )}

            {bubble.type === 'outcomes' && bubble.outcomes && (
              <>
                {bubble.message && (
                  <MentorBubble>
                    <div className="whitespace-pre-line">{bubble.message}</div>
                  </MentorBubble>
                )}
                <OutcomeCards outcomes={bubble.outcomes} />
              </>
            )}

            {bubble.type === 'email' && (
              <EmailForm
                onSubmit={handleEmailFormSubmit}
                loading={emailLoading}
                error={emailError}
              />
            )}

            {bubble.type === 'success' && bubble.message && (
              <MentorBubble>
                <div className="whitespace-pre-line">{bubble.message}</div>
              </MentorBubble>
            )}

            {bubble.type === 'info' && bubble.message && (
              <MentorBubble>
                <div className="whitespace-pre-line">{bubble.message}</div>
              </MentorBubble>
            )}
          </div>
        ))}

        {isTyping && <TypingIndicator />}
      </div>
    </ChatContainer>
  )
}
