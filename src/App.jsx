import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import Progress from './pages/Progress.jsx'
import Progress1 from './pages/Progress1.jsx'
import End from './pages/End.jsx'
import Record from './pages/Record.jsx'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/record" element={<Record />} />
      <Route path="/start" element={<Start />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/progress1" element={<Progress1 />} />
      <Route path="/end" element={<End />} />
    </Routes>
  )
}

export default App