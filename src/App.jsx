import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ModelViewer from './pages/ModelViewer'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div className="relative min-h-screen text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.14]" />
          <div className="absolute left-[-8%] top-[-10%] h-[26rem] w-[26rem] rounded-full bg-[#FF653F]/18 blur-3xl" />
          <div className="absolute right-[-10%] top-[18%] h-[34rem] w-[34rem] rounded-full bg-[#452E5A]/40 blur-3xl" />
          <div className="absolute bottom-[-12%] left-[18%] h-[28rem] w-[28rem] rounded-full bg-[#FF653F]/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#12082f]/65 to-transparent" />
        </div>
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
