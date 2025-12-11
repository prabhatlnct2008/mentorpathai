import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-main">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
