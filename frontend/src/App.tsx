import { Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/LandingPage'
import AgentLabPage from './features/agent-lab/AgentLabPage'
import SyllabusPage from './features/syllabus/SyllabusPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/agent-systems-lab" element={<AgentLabPage />} />
      <Route path="/syllabus" element={<SyllabusPage />} />
    </Routes>
import AdminLoginPage from './features/admin/AdminLoginPage'
import AdminDashboardPage from './features/admin/AdminDashboardPage'
import ProtectedRoute from './features/admin/ProtectedRoute'
import PrivacyPolicyPage from './features/legal/PrivacyPolicyPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/agent-systems-lab" element={<AgentLabPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App
