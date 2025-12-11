import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser,
  verifyAuth,
  isAuthenticated as checkIsAuthenticated,
  AdminUser,
  LoginRequest
} from '../api/admin'

interface AuthContextType {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (!checkIsAuthenticated()) {
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)
      return false
    }

    try {
      const isValid = await verifyAuth()
      if (isValid) {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(true)
        return true
      } else {
        setIsAuthenticated(false)
        setUser(null)
        return false
      }
    } catch {
      setIsAuthenticated(false)
      setUser(null)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (credentials: LoginRequest): Promise<void> => {
    setIsLoading(true)
    try {
      await apiLogin(credentials)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setIsAuthenticated(true)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    apiLogout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
