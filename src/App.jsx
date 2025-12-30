import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import Progress from './pages/Progress.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  )
}

export default App