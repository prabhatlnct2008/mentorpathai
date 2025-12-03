import { ReactNode } from 'react'

export interface MentorBubbleProps {
  children: ReactNode
}

export default function MentorBubble({ children }: MentorBubbleProps) {
  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div
        className="
          max-w-[85%]
          px-6 py-4
          bg-bubble-bg
          border border-bubble-border
          text-text-main
          rounded-tl-[24px]
          rounded-tr-[18px]
          rounded-br-[18px]
          rounded-bl-[6px]
        "
      >
        {children}
      </div>
    </div>
  )
}
