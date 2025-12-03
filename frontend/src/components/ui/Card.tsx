import { ReactNode } from 'react'

export interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-chat-bg border border-border rounded-card shadow-chat ${className}`}>
      {children}
    </div>
  )
}
