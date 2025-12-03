import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { faqData } from './chatSteps'

export interface SEOFallbackProps {
  onEmailSubmit?: (email: string) => Promise<void>
  emailLoading?: boolean
  emailError?: string
}

export default function SEOFallback({ onEmailSubmit, emailLoading, emailError }: SEOFallbackProps) {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setValidationError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email')
      return
    }

    setValidationError('')
    if (onEmailSubmit) {
      await onEmailSubmit(email)
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">
      {/* Static Email Form */}
      <Card className="p-8">
        <h2 className="text-2xl font-heading font-bold text-text-main mb-4">
          Get Started Today
        </h2>
        <p className="text-text-muted mb-6">
          Join hundreds of students already learning GenAI. Get instant access to our free intro lesson.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setValidationError('')
            }}
            error={validationError || emailError}
            disabled={emailLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={emailLoading}
          >
            {emailLoading ? 'Submitting...' : 'Get Free Intro Lesson'}
          </Button>
        </form>
      </Card>

      {/* Program Overview */}
      <div className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-text-main text-center">
          What You'll Learn
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-heading font-semibold text-text-main mb-2">
              AI Fundamentals
            </h3>
            <p className="text-text-muted">
              Master prompting, tokens, embeddings, and the core concepts behind GenAI.
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-heading font-semibold text-text-main mb-2">
              Build Real Projects
            </h3>
            <p className="text-text-muted">
              Create production-ready AI apps with RAG, vector databases, and API integration.
            </p>
          </Card>

          <Card className="p-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-heading font-semibold text-text-main mb-2">
              Ship to Production
            </h3>
            <p className="text-text-muted">
              Learn deployment, scaling, monitoring, and best practices for real-world apps.
            </p>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="space-y-6">
        <h2 className="text-3xl font-heading font-bold text-text-main text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-bubble-bg transition-colors"
              >
                <h3 className="text-lg font-heading font-semibold text-text-main">
                  {faq.question}
                </h3>
                <span className="text-primary text-2xl">
                  {expandedFaq === index ? '−' : '+'}
                </span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-text-muted">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <Card className="p-8 text-center">
        <h2 className="text-2xl font-heading font-bold text-text-main mb-4">
          Ready to Start Your GenAI Journey?
        </h2>
        <p className="text-text-muted mb-6">
          Join now and get your free intro lesson + early access pricing.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setValidationError('')
            }}
            error={validationError || emailError}
            disabled={emailLoading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={emailLoading}
          >
            {emailLoading ? 'Submitting...' : 'Get Started Free'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
