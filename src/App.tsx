import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CVPage from './pages/CVPage'
import HackathonPage from './pages/HackathonPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProjectPage from './pages/ProjectPage'

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    // Never return scrollIntoView's result: newer browsers return a Promise,
    // and React treats a returned value as a cleanup function (crashes the app).
    if (hash) {
      // Wait a tick so the page (and the browser's own scroll restore) has settled,
      // otherwise opening a shared link like /#competitions stays at the top.
      const t = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      }, 80)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash, key]) // `key` changes on every click, so re-clicking the same link scrolls again
  return null
}

export default function App() {
  return (
    <div className="grain relative min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/hackathons/:slug" element={<HackathonPage />} />
          <Route path="/cv" element={<CVPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
