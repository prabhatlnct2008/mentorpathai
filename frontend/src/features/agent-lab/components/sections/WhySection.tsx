export default function WhySection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline & Subheadline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-6">
            You already know how to talk to GPT. Now learn how to build agents.
          </h2>
          <p className="text-xl text-text-muted max-w-4xl mx-auto leading-relaxed">
            Most people stop at 'prompting an LLM'. Agentic AI is about systems – tools, memory, evaluation, and production. Agent Systems Lab is where you work through that, 1:1, on a real project.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <p className="text-text-muted leading-relaxed">
              If you've built a few prototypes with ChatGPT or Claude, you've probably felt the gap between 'cool demo' and 'reliable system'.
            </p>
            <p className="text-text-muted leading-relaxed">
              In MentorPath AI's Agent Systems Lab, we close that gap. We start from your actual use case – support, internal tools, workflow agents, or product features – and guide you through the components that make agents work in the real world.
            </p>

            {/* Bullets with icons */}
            <div className="space-y-6 pt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  <span className="font-semibold">Agent mindset, not just prompts</span> – understand agents as long-running systems with tools, state and policies.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  <span className="font-semibold">Google-style structure, applied to you</span> – inspired by Google's Agents Intensive, adapted to 1:1 mentoring and your stack.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-main leading-relaxed">
                  <span className="font-semibold">AgentOps discipline</span> – logging, tracing, evaluation and deployment baked in from week one.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Comparison Card */}
          <div className="bg-[#0B1020] rounded-[20px] border border-[rgba(148,163,184,0.22)] p-8">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-6">
              Why not just do another course?
            </h3>

            <div className="space-y-6">
              {/* Comparison Row 1 */}
              <div className="pb-6 border-b border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                    <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted font-semibold mb-1">Typical AI course</p>
                    <p className="text-text-muted text-sm">Videos, generic examples, no feedback.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-main font-semibold mb-1">Agent Systems Lab</p>
                    <p className="text-text-muted text-sm">1:1 mentor, your use case, weekly reviews of your agent.</p>
                  </div>
                </div>
              </div>

              {/* Comparison Row 2 */}
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                    <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-muted font-semibold mb-1">Prototype-only mindset</p>
                    <p className="text-text-muted text-sm">Build a demo, then get stuck.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-text-main font-semibold mb-1">System + AgentOps mindset</p>
                    <p className="text-text-muted text-sm">Tools, memory, eval, deployment from day one.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
