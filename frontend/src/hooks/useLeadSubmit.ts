import { useState } from 'react'
import { submitLead, LeadData } from '../api/leads'
import { ApiError } from '../api'

export default function useLeadSubmit() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: LeadData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await submitLead(data)
      setSuccess(true)
      return true
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('Failed to submit. Please try again.')
      }
      return false
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setLoading(false)
    setError(null)
    setSuccess(false)
  }

  return {
    submit,
    loading,
    error,
    success,
    reset
  }
}
