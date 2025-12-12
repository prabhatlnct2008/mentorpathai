import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from './components/sections/HeroSection'
import WhySection from './components/sections/WhySection'
import FormatSection from './components/sections/FormatSection'
import ProjectsSection from './components/sections/ProjectsSection'
import CurriculumSection from './components/sections/CurriculumSection'
import PersonaSection from './components/sections/PersonaSection'
import FormatExpectationsSection from './components/sections/FormatExpectationsSection'
import AboutSection from './components/sections/AboutSection'
import FAQSection from './components/sections/FAQSection'
import FinalCTASection from './components/sections/FinalCTASection'
import ApplicationModal from './components/ApplicationModal'
import NewsletterModal from './components/NewsletterModal'
import SuccessModal from './components/SuccessModal'
import { submitAgentLabLead, subscribeNewsletter } from '../../api/agentLab'
import type { AgentLabLeadData as FormData } from './components/ApplicationModal'

export default function AgentLabPage() {
  // Modal states
  const [isApplicationOpen, setIsApplicationOpen] = useState(false)
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [successType, setSuccessType] = useState<'application' | 'newsletter'>('application')

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  // Refs for scrolling
  const curriculumRef = useRef<HTMLDivElement>(null)

  // Handlers
  const handleApplyClick = useCallback(() => {
    setSubmitError(undefined)
    setIsApplicationOpen(true)
  }, [])

  const handleSyllabusClick = useCallback(() => {
    setSubmitError(undefined)
    setIsNewsletterOpen(true)
  }, [])

  const handleViewCurriculumClick = useCallback(() => {
    curriculumRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleApplicationSubmit = useCallback(async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      // Transform form data to API format
      const apiData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        company: formData.company,
        agent_type: formData.agentIdea, // Map agentIdea to agent_type
        timeframe: formData.timeline,   // Map timeline to timeframe
        source: 'agent_systems_lab',
        persona: formData.userType      // Map userType to persona
      }
      await submitAgentLabLead(apiData)
      setIsApplicationOpen(false)
      setSuccessType('application')
      setIsSuccessOpen(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const handleNewsletterSubmit = useCallback(async (email: string) => {
    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      await subscribeNewsletter({ email, source: 'agent_systems_lab_syllabus' })
      setIsNewsletterOpen(false)
      setSuccessType('newsletter')
      setIsSuccessOpen(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection
        onApplyClick={handleApplyClick}
        onViewCurriculumClick={handleViewCurriculumClick}
      />

      {/* Why Agent Systems Lab */}
      <WhySection />

      {/* Format & Time Commitment */}
      <FormatSection />

      {/* What You'll Build */}
      <ProjectsSection />

      {/* 6-Week Curriculum */}
      <div ref={curriculumRef}>
        <CurriculumSection onApplyClick={handleApplyClick} />
      </div>

      {/* Who Is This For */}
      <PersonaSection />

      {/* Format, Time & Expectations */}
      <FormatExpectationsSection />

      {/* About MentorPath AI */}
      <AboutSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTASection
        onApplyClick={handleApplyClick}
        onSyllabusClick={handleSyllabusClick}
      />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-[1100px] mx-auto px-6 text-center space-y-2">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} MentorPath AI. All rights reserved.
          </p>
          <Link to="/privacy" className="text-primary hover:text-primary/80 transition-colors text-sm">
            Privacy Policy
          </Link>
        </div>
      </footer>

      {/* Modals */}
      <ApplicationModal
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
        onSubmit={handleApplicationSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <NewsletterModal
        isOpen={isNewsletterOpen}
        onClose={() => setIsNewsletterOpen(false)}
        onSubmit={handleNewsletterSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        type={successType}
      />
    </div>
  )
}
