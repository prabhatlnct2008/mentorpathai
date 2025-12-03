import { ReactNode } from 'react'
import Card from '../ui/Card'

export interface ChatContainerProps {
  children: ReactNode
}

export default function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="w-full max-w-[720px] mx-auto">
      <Card className="p-8">
        {children}
      </Card>
    </div>
  )
}
