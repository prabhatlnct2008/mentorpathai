export default function PersonaSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            Is MentorPath AI's Agent Systems Lab a fit for you?
          </h2>
        </div>

        {/* 3 Persona Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Card 1 - Builder/Indie Hacker */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              Builder / Indie Hacker
            </h3>
            <p className="text-text-muted leading-relaxed">
              You've shipped projects before and played with LLMs. You want your next project to use agents with tools, memory and evaluation, not just another chat wrapper.
            </p>
          </div>

          {/* Card 2 - PM/Tech Lead */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              PM / Tech Lead
            </h3>
            <p className="text-text-muted leading-relaxed">
              You're expected to have an opinion on agents for your product or team. You want to understand architectures, risks and evaluation well enough to make real decisions.
            </p>
          </div>

          {/* Card 3 - ML/Data Person */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-xl font-heading font-bold text-text-main mb-4">
              ML / Data Person moving into AgentOps
            </h3>
            <p className="text-text-muted leading-relaxed">
              You're comfortable with models and data, but you want the discipline around AgentOps: tools, state, quality, and deployment.
            </p>
          </div>
        </div>

        {/* Footer Line */}
        <div className="text-center">
          <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            If you'd rather ship one serious agent in 6 weeks than watch 50 hours of content, Agent Systems Lab was made for you.
          </p>
        </div>
      </div>
    </section>
  )
}
