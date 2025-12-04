export default function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            What is MentorPath AI?
          </h2>
        </div>

        {/* Main copy */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-text-muted leading-relaxed mb-6">
            MentorPath AI is a mentoring-first way to learn GenAI. Instead of dropping you into a giant course, we pair you with a mentor and focus on real projects: from your first AI product to agentic systems with tools, memory and evaluation.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            Agent Systems Lab is our specialist track for people who want to go beyond prompts and build agents as systems.
          </p>
        </div>

        {/* Bullets */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0B1020] rounded-[20px] border border-border p-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  1:1 GenAI mentoring across projects and roles.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  Focus on shipping, not just understanding.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  Friendly to non-traditional and self-taught backgrounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
