import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login({ username, password })
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Radial gradient background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(76, 111, 255, 0.15), transparent 50%)'
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-chat-bg rounded-card p-8 shadow-chat border border-border">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-main">
              Admin Login
            </h1>
            <p className="text-text-muted mt-2">
              MentorPath AI Dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg
                         text-text-main placeholder-text-muted
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-colors"
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-main mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg
                         text-text-main placeholder-text-muted
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-colors"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-hover
                       text-white font-medium rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                       focus:ring-offset-background
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
