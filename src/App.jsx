import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ModelViewer from './pages/ModelViewer'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#0d0d0d] text-white">
        <CustomCursor />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/model" element={<ModelViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
