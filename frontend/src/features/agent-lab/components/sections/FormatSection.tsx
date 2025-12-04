export default function FormatSection() {
  return (
    <section className="py-20 bg-chat-bg">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            6 weeks, ~7 hours per week, with a mentor in your corner
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - Weekly Deep Dive */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Weekly Deep Dive (2 hours live)
            </h3>
            <p className="text-text-muted leading-relaxed">
              Once a week, you and your MentorPath AI mentor meet live for 90–120 minutes. You review your agent's design, unblock architecture decisions, and work through tricky parts of tools, memory, or evaluation together.
            </p>
          </div>

          {/* Card 2 - Hands-On Building */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Hands-On Building (3–4 hours)
            </h3>
            <p className="text-text-muted leading-relaxed">
              You spend a few focused hours implementing what you discussed: wiring tools, adding memory, instrumenting logs and metrics. We draw on Google-style codelabs and patterns, but always in the context of your project.
            </p>
          </div>

          {/* Card 3 - Office Hours */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Office Hours & Chat Support (1–2 hours)
            </h3>
            <p className="text-text-muted leading-relaxed">
              Between sessions, you have async chat access for questions, code reviews and 'why is my agent doing this?' moments. Short ad-hoc calls as needed to keep you moving.
            </p>
          </div>
        </div>

        {/* Summary Line */}
        <div className="text-center">
          <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            Expect around <span className="text-text-main font-semibold">7 hours/week for 6 weeks</span>. Serious enough to make progress, realistic enough to fit around a full-time job.
          </p>
        </div>
      </div>
    </section>
  )
}
