import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import CustomCursor from './components/CustomCursor'
import WaterfallBackground from './components/WaterfallBackground'

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-white relative">
        <WaterfallBackground />
        <CustomCursor />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
