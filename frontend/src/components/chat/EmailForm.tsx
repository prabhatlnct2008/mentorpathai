import { FormEvent, useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

export interface EmailFormProps {
  onSubmit: (email: string) => void
  loading?: boolean
  error?: string
}

export default function EmailForm({ onSubmit, loading = false, error }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email) {
      setValidationError('Email is required')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError('Please enter a valid email')
      return
    }

    setValidationError('')
    onSubmit(email)
  }

  return (
    <div className="mb-4 animate-slide-up">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setValidationError('')
          }}
          error={validationError || error}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Submitting...' : 'Get Started'}
        </Button>
      </form>
    </div>
  )
}
