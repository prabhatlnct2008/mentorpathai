import Button from '../ui/Button'

export interface UserChoiceButtonsProps {
  options: { id: string; label: string }[]
  onSelect: (id: string) => void
}

export default function UserChoiceButtons({ options, onSelect }: UserChoiceButtonsProps) {
  return (
    <div className="flex justify-end mb-4 animate-slide-up">
      <div className="flex flex-col gap-2 max-w-[85%]">
        {options.map((option) => (
          <Button
            key={option.id}
            variant="primary"
            onClick={() => onSelect(option.id)}
            className="text-left"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
