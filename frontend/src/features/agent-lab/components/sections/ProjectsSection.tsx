export default function ProjectsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Headline & Subheadline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-6">
            Pick one serious agent project and we'll build it together.
          </h2>
          <p className="text-xl text-text-muted max-w-4xl mx-auto leading-relaxed">
            Agent Systems Lab is not about toy examples. From week one, we anchor everything to a single, meaningful agent for your work or product.
          </p>
        </div>

        {/* 4 Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card 1 - Support/Knowledge Agent */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">
              Support / Knowledge Agent
            </h3>
            <p className="text-sm text-primary font-semibold mb-4 tracking-wide">
              TOOLS • RAG • MEMORY • EVALUATION
            </p>
            <p className="text-text-muted leading-relaxed">
              An agent that answers customer or internal questions using your knowledge base, with tools for search, logs for observability, and evaluation runs to keep quality in check.
            </p>
          </div>

          {/* Card 2 - Workflow/Ops Agent */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">
              Workflow / Ops Agent
            </h3>
            <p className="text-sm text-primary font-semibold mb-4 tracking-wide">
              API TOOLS • APPROVALS • MULTI-STEP FLOWS
            </p>
            <p className="text-text-muted leading-relaxed">
              An agent that calls APIs, generates reports, drafts emails, and triggers workflows – with safe human approval steps and clear traces of what happened.
            </p>
          </div>

          {/* Card 3 - Product Feature Agent */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">
              Product Feature Agent
            </h3>
            <p className="text-sm text-primary font-semibold mb-4 tracking-wide">
              IN-APP AGENT • GUARDRAILS • METRICS
            </p>
            <p className="text-text-muted leading-relaxed">
              An embedded feature inside your product – an in-app assistant that uses tools and memory, with metrics and guardrails so you can deploy it with confidence.
            </p>
          </div>

          {/* Card 4 - Experimentation Sandbox */}
          <div className="bg-[#0B1020] rounded-[18px] border border-border p-8 shadow-lg hover:border-primary/30 transition-colors">
            <h3 className="text-2xl font-heading font-bold text-text-main mb-2">
              Experimentation & Evaluation Sandbox
            </h3>
            <p className="text-sm text-primary font-semibold mb-4 tracking-wide">
              A/B TESTS • EVAL HARNESS • RAPID ITERATION
            </p>
            <p className="text-text-muted leading-relaxed">
              A sandbox setup where you can run experiments, log traces and compare different agent configurations using LLM-as-a-judge and human-in-the-loop samples.
            </p>
          </div>
        </div>

        {/* CTA Line */}
        <div className="text-center">
          <p className="text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            Not sure what to build yet? <span className="text-text-main font-semibold">Your mentor will help you pick a realistic agent use case in Week 1.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
