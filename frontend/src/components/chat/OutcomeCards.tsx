export interface Outcome {
  id: string
  title: string
  description: string
}

export interface OutcomeCardsProps {
  outcomes: Outcome[]
}

export default function OutcomeCards({ outcomes }: OutcomeCardsProps) {
  return (
    <div className="mb-4 animate-slide-up">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
        {outcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="
              min-w-[280px]
              snap-start
              p-6
              bg-bubble-bg
              border border-bubble-border
              rounded-bubble
              hover:border-primary
              transition-colors
              cursor-pointer
            "
          >
            <h3 className="text-lg font-heading font-semibold text-text-main mb-2">
              {outcome.title}
            </h3>
            <p className="text-text-muted text-sm">
              {outcome.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
