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
  )
}

export default App
