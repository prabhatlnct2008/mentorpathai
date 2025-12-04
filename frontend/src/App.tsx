import { Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/LandingPage'
import AgentLabPage from './features/agent-lab/AgentLabPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/agent-systems-lab" element={<AgentLabPage />} />
    </Routes>
  )
}

export default App
