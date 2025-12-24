import { useEffect } from 'react'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'application' | 'newsletter' | 'landing'
}

export default function SuccessModal({ isOpen, onClose, type }: SuccessModalProps) {
  // Track Lead event when modal opens
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead')
    }
  }, [isOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const content = {
    application: {
      headline: 'Application received!',
      message: "Thanks for your interest! We'll review your application and get in touch with you soon."
    },
    newsletter: {
      headline: "You're on the list!",
      message: "Thanks for subscribing! We'll be in touch with updates about the program and GenAI insights."
    },
    landing: {
      headline: 'Thanks for your interest!',
      message: "We'll get in touch with you soon to discuss how we can help you on your GenAI journey."
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[440px] bg-chat-bg rounded-card border border-border shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center space-y-6">
          {/* Animated Checkmark */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Outer circle with scale animation */}
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-success/30 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-success animate-checkmark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-heading font-bold text-text-main">
            {content[type].headline}
          </h2>

          {/* Message */}
          <p className="text-text-muted leading-relaxed">
            {content[type].message}
          </p>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #4C6FFF 0%, #7C3AED 100%)'
            }}
          >
            Got it
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dasharray: 0, 100;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 100, 100;
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-checkmark {
          animation: checkmark 0.6s ease-in-out 0.2s forwards;
        }
      `}</style>
    </div>
  )
}
