interface FinalCTASectionProps {
  onApplyClick: () => void
  onSyllabusClick: () => void
}

export default function FinalCTASection({ onApplyClick, onSyllabusClick }: FinalCTASectionProps) {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #020617 0%, #0B1020 100%)'
        }}
      />

      {/* Content */}
      <div className="relative max-w-[900px] mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-6">
          Ready to go from LLM tinkerer to agent system builder?
        </h2>

        {/* Subheadline */}
        <p className="text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed">
          Apply to MentorPath AI's 6-week Agent Systems Lab and work 1:1 with a mentor on a serious agent project.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {/* Primary CTA */}
          <button
            onClick={onApplyClick}
            className="group relative px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #4C6FFF 0%, #7C3AED 100%)'
            }}
          >
            <span className="relative z-10">Apply for Agent Systems Lab</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
          </button>

          {/* Secondary CTA (ghost) */}
          <button
            onClick={onSyllabusClick}
            className="px-8 py-4 rounded-full font-semibold text-text-main border-2 transition-all duration-300 hover:border-primary/60 hover:bg-primary/5"
            style={{
              borderColor: 'rgba(148, 163, 184, 0.45)'
            }}
          >
            Get the detailed syllabus in your inbox
          </button>
        </div>

        {/* Microcopy */}
        <p className="text-sm text-text-muted italic">
          We review each application manually. If it's not a fit, we'll let you know – no spam.
        </p>
      </div>
    </section>
  )
}
