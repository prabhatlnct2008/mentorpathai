import { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'new' | 'online'
  children: ReactNode
  className?: string
}

export default function Badge({ variant = 'new', children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium'

  const variantStyles = {
    new: 'bg-primary text-text-main',
    online: 'bg-transparent border border-border text-text-main'
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {variant === 'online' && (
        <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
      )}
      {children}
    </div>
  )
}
