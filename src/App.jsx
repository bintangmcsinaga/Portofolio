import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
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
        <Header />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 py-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Bintang Sinaga. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
