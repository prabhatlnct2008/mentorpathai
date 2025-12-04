export default function FormatExpectationsSection() {
  return (
    <section className="py-20 bg-chat-bg">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            Format, time & expectations
          </h2>
        </div>

        {/* 3 Icon Blocks */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Block 1 - Time */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Time
            </h3>
            <p className="text-text-muted leading-relaxed">
              ~7 hours/week for 6 weeks: 2h live sessions, 3–4h building, 1–2h chat/office hours.
            </p>
          </div>

          {/* Block 2 - Format */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Format
            </h3>
            <p className="text-text-muted leading-relaxed">
              Live 1:1 calls via Zoom/Meet, plus async chat (Slack/Discord/WhatsApp) for questions, code reviews and debugging.
            </p>
          </div>

          {/* Block 3 - Cohort size */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 mb-6 text-primary">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Cohort size
            </h3>
            <p className="text-text-muted leading-relaxed">
              Limited 1:1 spots per 6-week cycle so we can go deep on your agent's design and behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
