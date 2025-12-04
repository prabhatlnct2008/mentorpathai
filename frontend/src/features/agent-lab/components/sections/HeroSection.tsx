import SystemDiagram from './SystemDiagram'

interface HeroSectionProps {
  onApplyClick: () => void
  onViewCurriculumClick: () => void
}

export default function HeroSection({ onApplyClick, onViewCurriculumClick }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-chat-bg" />

      {/* Content container */}
      <div className="relative max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Content */}
          <div className="flex flex-col space-y-6 order-2 lg:order-1">
            {/* Top pill */}
            <div className="inline-flex self-start">
              <div
                className="px-4 py-2 rounded-full text-[11px] font-medium uppercase tracking-wider"
                style={{
                  background: 'rgba(148, 163, 184, 0.18)',
                  color: '#E5E7EB',
                  letterSpacing: '0.06em'
                }}
              >
                NEW • 6-Week 1:1 Agentic AI Mentoring
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-[52px] leading-tight text-text-main">
              Go from LLM tinkering to real AI agents in 6 weeks
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg leading-relaxed text-text-muted">
              MentorPath AI's Agent Systems Lab is a 6-week, 1:1 mentoring track inspired by Google-style agentic AI curricula. You'll design, build, and debug production-shaped agents with tools, memory, evaluation and a path to deployment.
            </p>

            {/* Bullets with check icons */}
            <ul className="space-y-4 py-2">
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-text-main text-base leading-relaxed">
                  <strong className="font-semibold">1:1 Agentic AI mentoring</strong> – weekly live sessions + work-hours chat support.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-text-main text-base leading-relaxed">
                  <strong className="font-semibold">System-first mindset</strong> – tools, memory, orchestration, evaluation and AgentOps.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon />
                <span className="text-text-main text-base leading-relaxed">
                  <strong className="font-semibold">One serious agent project</strong> – tailored to your product, team, or startup.
                </span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA */}
              <button
                onClick={onApplyClick}
                className="group relative px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #4C6FFF 0%, #7C3AED 100%)'
                }}
              >
                <span className="relative z-10">Join the Agent Systems Lab waitlist</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              </button>

              {/* Secondary CTA (ghost) */}
              <button
                onClick={onViewCurriculumClick}
                className="px-8 py-4 rounded-full font-semibold text-text-main border-2 transition-all duration-300 hover:border-primary/60 hover:bg-primary/5"
                style={{
                  borderColor: 'rgba(148, 163, 184, 0.45)'
                }}
              >
                View the 6-week curriculum
              </button>
            </div>

            {/* Microcopy */}
            <p className="text-sm text-text-muted italic pt-2">
              Limited 1:1 seats per cohort so we can actually review your agents in depth.
            </p>
          </div>

          {/* Right Column - System Diagram */}
          <div className="order-1 lg:order-2">
            <SystemDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

// Check icon component
function CheckIcon() {
  return (
    <svg
      className="w-6 h-6 flex-shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#4C6FFF"
        fillOpacity="0.2"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#4C6FFF"
        strokeWidth="2"
      />
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke="#4C6FFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
