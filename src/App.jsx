import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div className="bg-gray-950 min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-white">
        <CustomCursor />
        <Header />
        <main>
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
