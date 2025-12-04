import { useEffect, useRef, useState } from 'react'
import Button from '../../../../components/ui/Button'

interface CurriculumSectionProps {
  onApplyClick: () => void
}

interface WeekData {
  week: number
  title: string
  copy: string
  outcome: string
}

const weeks: WeekData[] = [
  {
    week: 1,
    title: 'Agent Foundations & Your Use Case',
    copy: 'Clarify what an AI agent is (vs a single LLM call) and map that to your context. We pick one primary agent use case and sketch the initial architecture: model, tools, memory, orchestration.',
    outcome: 'A clearly defined agent use case and first draft of your system diagram.'
  },
  {
    week: 2,
    title: 'Tools & Interoperability (MCP-style thinking)',
    copy: "Design and implement tools so your agent can 'take action'. We'll turn your Python functions/APIs into actions and discuss interoperability patterns inspired by Model Context Protocol (MCP).",
    outcome: 'Your agent can call at least one real tool reliably, with clear contracts and error handling.'
  },
  {
    week: 3,
    title: 'Context Engineering: Sessions & Memory',
    copy: 'Make your agent stateful. We add short-term context (sessions) and long-term memory (vector stores or databases) so your agent can handle multi-turn tasks and remember important facts across runs.',
    outcome: 'An agent with working session history and a simple memory layer tailored to your scenario.'
  },
  {
    week: 4,
    title: 'Agent Quality, Observability & Evaluation',
    copy: 'Introduce an AgentOps mindset: logs (the diary), traces (the narrative), metrics (the health report). We instrument your agent, then design evaluation strategies with LLM-as-a-judge and selective human review.',
    outcome: 'A basic observability and eval loop so you can see how your agent behaves and where it fails.'
  },
  {
    week: 5,
    title: 'Prototype to Production Surface',
    copy: 'Wrap your agent in a usable surface: CLI, web app, Slack bot, or another interface that makes sense for your context. Discuss safety, access control, and rollout patterns.',
    outcome: 'A shareable agent interface and a checklist for safe usage within your team or product.'
  },
  {
    week: 6,
    title: 'Stabilization, Demo & Next-Phase Plan',
    copy: "Polish your agent, tighten logs and evals, and prepare a short demo. We also define what 'Phase 2' could look like: more tools, multi-agent setups, or deeper integration with your stack.",
    outcome: 'A recorded demo, a written system diagram, and a realistic roadmap for where to take your agent next.'
  }
]

function WeekCard({ week, isVisible }: { week: WeekData; isVisible: boolean }) {
  const isEven = week.week % 2 === 0

  return (
    <div
      className={`
        relative transition-all duration-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${week.week * 100}ms` }}
    >
      {/* Desktop: alternating layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        {/* Left side content (odd weeks) */}
        {!isEven && (
          <div className="pr-12">
            <WeekContent week={week} />
          </div>
        )}

        {/* Timeline node (center) */}
        <div className="relative flex justify-center">
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full -top-8 bottom-0">
            {/* Timeline connector line */}
            {week.week < 6 && (
              <div
                className="absolute top-12 left-0 w-full h-full"
                style={{
                  background: `linear-gradient(to bottom,
                    ${week.week === 1 ? 'transparent' : 'rgba(76, 111, 255, 0.5)'},
                    rgba(124, 58, 237, 0.5))`
                }}
              />
            )}
          </div>

          {/* Week number circle */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-xl font-bold text-text-main">{week.week}</span>
          </div>
        </div>

        {/* Right side content (even weeks) */}
        {isEven && (
          <div className="pl-12">
            <WeekContent week={week} />
          </div>
        )}

        {/* Empty space for opposite side */}
        {!isEven && <div></div>}
        {isEven && <div></div>}
      </div>

      {/* Mobile: stacked layout */}
      <div className="lg:hidden flex gap-4">
        {/* Timeline node */}
        <div className="relative flex flex-col items-center">
          {/* Week number circle */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0">
            <span className="text-lg font-bold text-text-main">{week.week}</span>
          </div>

          {/* Timeline connector line */}
          {week.week < 6 && (
            <div
              className="w-1 flex-1 mt-4"
              style={{
                background: `linear-gradient(to bottom,
                  rgba(76, 111, 255, 0.5),
                  rgba(124, 58, 237, 0.5))`
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <WeekContent week={week} />
        </div>
      </div>
    </div>
  )
}

function WeekContent({ week }: { week: WeekData }) {
  return (
    <div className="bg-chat-bg rounded-card p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
      {/* Week label */}
      <div className="text-primary text-sm font-semibold mb-2">
        Week {week.week}
      </div>

      {/* Title */}
      <h3 className="text-xl font-heading font-bold text-text-main mb-3">
        {week.title}
      </h3>

      {/* Copy */}
      <p className="text-text-muted text-sm leading-relaxed mb-4">
        {week.copy}
      </p>

      {/* Outcome */}
      <div className="flex gap-2 items-start">
        {/* Checkmark icon */}
        <svg
          className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-text-main text-sm font-medium">
          {week.outcome}
        </p>
      </div>
    </div>
  )
}

export default function CurriculumSection({ onApplyClick }: CurriculumSectionProps) {
  const [visibleWeeks, setVisibleWeeks] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const weekNumber = parseInt(entry.target.getAttribute('data-week') || '0')
            setVisibleWeeks((prev) => new Set(prev).add(weekNumber))
          }
        })
      },
      { threshold: 0.2 }
    )

    const weekElements = sectionRef.current?.querySelectorAll('[data-week]')
    weekElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            Week-by-week: from foundations to production-shaped agents
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            We mirror the structure of modern agentic AI curricula (like Google's Agents Intensive on Kaggle)
            and adapt it to your use case in a 1:1 mentoring format.
          </p>
        </div>

        {/* Timeline */}
        <div ref={sectionRef} className="space-y-0">
          {weeks.map((week) => (
            <div key={week.week} data-week={week.week}>
              <WeekCard
                week={week}
                isVisible={visibleWeeks.has(week.week)}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-text-muted mb-6">
            Want to see if your use case fits this curriculum?
          </p>
          <Button onClick={onApplyClick}>
            Share your use case
          </Button>
        </div>
      </div>
    </section>
  )
}
