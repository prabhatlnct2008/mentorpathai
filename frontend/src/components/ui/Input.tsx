import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-text-main">
          {label}
        </label>
      )}
      <input
        className={`
          px-4 py-3
          bg-bubble-bg
          border ${error ? 'border-error' : 'border-border'}
          rounded-lg
          text-text-main
          placeholder:text-text-muted
          focus:outline-none
          focus:border-primary
          transition-colors
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-error">{error}</span>
      )}
    </div>
  )
}
