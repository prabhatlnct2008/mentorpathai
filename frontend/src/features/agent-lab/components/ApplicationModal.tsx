import { useState, useEffect, FormEvent } from 'react'
import Input from '../../../components/ui/Input'

export interface AgentLabLeadData {
  name: string
  email: string
  role: string
  company?: string
  userType: 'builder' | 'pm' | 'ml' | 'other'
  agentIdea: string
  timeline: 'immediately' | '1-3months' | 'exploring'
}

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AgentLabLeadData) => Promise<void>
  isSubmitting: boolean
  submitError?: string
}

export default function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  submitError
}: ApplicationModalProps) {
  const [formData, setFormData] = useState<AgentLabLeadData>({
    name: '',
    email: '',
    role: '',
    company: '',
    userType: 'builder',
    agentIdea: '',
    timeline: 'immediately'
  })

  const [errors, setErrors] = useState<Partial<Record<keyof AgentLabLeadData, string>>>({})

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        role: '',
        company: '',
        userType: 'builder',
        agentIdea: '',
        timeline: 'immediately'
      })
      setErrors({})
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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AgentLabLeadData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role / Title is required'
    }

    if (!formData.agentIdea.trim()) {
      newErrors.agentIdea = 'Please describe your agent idea'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-chat-bg rounded-card border border-border shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-chat-bg border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-text-main">
            Apply for Agent Systems Lab
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-bubble-bg transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <Input
            label="Name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />

          {/* Role */}
          <Input
            label="Role / Title"
            type="text"
            placeholder="e.g. Software Engineer, Product Manager"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            error={errors.role}
            required
          />

          {/* Company */}
          <Input
            label="Company / Project context (optional)"
            type="text"
            placeholder="Where you work or what you're building"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />

          {/* User Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">
              Which best describes you? <span className="text-error">*</span>
            </label>
            <div className="space-y-3">
              {[
                { value: 'builder', label: 'Builder / Indie hacker' },
                { value: 'pm', label: 'PM / Tech lead' },
                { value: 'ml', label: 'ML / Data person' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="userType"
                    value={option.value}
                    checked={formData.userType === option.value}
                    onChange={(e) => setFormData({ ...formData, userType: e.target.value as AgentLabLeadData['userType'] })}
                    className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-text-main">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Agent Idea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">
              What kind of agent do you want to build in 6 weeks? <span className="text-error">*</span>
            </label>
            <textarea
              placeholder="Describe your agent idea or use case..."
              value={formData.agentIdea}
              onChange={(e) => setFormData({ ...formData, agentIdea: e.target.value })}
              rows={4}
              className={`
                px-4 py-3
                bg-bubble-bg
                border ${errors.agentIdea ? 'border-error' : 'border-border'}
                rounded-lg
                text-text-main
                placeholder:text-text-muted
                focus:outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
                transition-colors
              `}
              required
            />
            {errors.agentIdea && (
              <span className="text-sm text-error">{errors.agentIdea}</span>
            )}
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-main">
              How soon do you want to start? <span className="text-error">*</span>
            </label>
            <div className="space-y-3">
              {[
                { value: 'immediately', label: 'Immediately' },
                { value: '1-3months', label: '1–3 months' },
                { value: 'exploring', label: 'Just exploring' }
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="timeline"
                    value={option.value}
                    checked={formData.timeline === option.value}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value as AgentLabLeadData['timeline'] })}
                    className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-text-main">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Error message */}
          {submitError && (
            <div className="p-4 rounded-lg bg-error/10 border border-error/50">
              <p className="text-sm text-error">{submitError}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              background: 'linear-gradient(135deg, #4C6FFF 0%, #7C3AED 100%)'
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
