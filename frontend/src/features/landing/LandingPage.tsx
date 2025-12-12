import { useState } from 'react'
import Badge from '../../components/ui/Badge'
import ChatFlow from './ChatFlow'
import SEOFallback from './SEOFallback'
import SuccessModal from '../agent-lab/components/SuccessModal'
import useLeadSubmit from '../../hooks/useLeadSubmit'

export default function LandingPage() {
  const { submit, loading, error } = useLeadSubmit()
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const handleEmailSubmit = async (email: string, persona: string | null = null) => {
    await submit({
      email,
      persona,
      source: 'landing_page'
    })
    // Show success popup after successful submission
    setIsSuccessOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Radial gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(76, 111, 255, 0.15), transparent 50%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="new">
              NEW • 1:1 GenAI Mentoring Program
            </Badge>
          </div>

          {/* Page Title */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-text-main mb-6">
              Learn GenAI by Building Real Projects
            </h1>
            <p className="text-xl text-text-muted">
              Go from zero AI knowledge to shipping production apps in 6 weeks.
              No CS degree required.
            </p>
          </div>

          {/* Chat Flow */}
          <ChatFlow
            onEmailSubmit={handleEmailSubmit}
            emailLoading={loading}
            emailError={error || undefined}
          />

          {/* SEO Fallback Content */}
          <SEOFallback
            onEmailSubmit={(email) => handleEmailSubmit(email)}
            emailLoading={loading}
            emailError={error || undefined}
          />
        </div>

        {/* Footer */}
        <footer className="mt-24 pb-12 text-center text-text-muted text-sm">
          <p>© 2025 MentorPath AI. All rights reserved.</p>
        </footer>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        type="landing"
      />
    </div>
  )
}
