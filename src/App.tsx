import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

// Pages
import SplashScreen from './pages/SplashScreen'
import HomeScreen from './pages/HomeScreen'
import NewsScreen from './pages/NewsScreen'
import NewsDetail from './pages/NewsDetail'
import ElencoScreen from './pages/ElencoScreen'
import PlayerProfile from './pages/PlayerProfile'
import GaleriaScreen from './pages/GaleriaScreen'
import MantoScreen from './pages/MantoScreen'
import StatsScreen from './pages/StatsScreen'
import ResenhaScreen from './pages/ResenhaScreen'
import ParceirosScreen from './pages/ParceirosScreen'
import VotoScreen from './pages/VotoScreen'
import HistoriaScreen from './pages/HistoriaScreen'
import LoginScreen from './pages/LoginScreen'
import MenuScreen from './pages/MenuScreen'
import AdminScreen from './pages/AdminScreen'

// Components
import BottomNav from './components/BottomNav'
import Toast from './components/Toast'
import InstallPWA from './components/InstallPWA'

import { createContext } from 'react'
export const ToastCtx = createContext<(msg: string) => void>(() => { })

function AppShell() {
  const location = useLocation()
  const noNavPages = ['/', '/login']
  const showNav = !noNavPages.includes(location.pathname)

  return (
    <div id="app-shell">
      <div className={`app-content${showNav ? '' : ' full-height'}`}>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/news" element={<NewsScreen />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/elenco" element={<ElencoScreen />} />
          <Route path="/elenco/:id" element={<PlayerProfile />} />
          <Route path="/galeria" element={<GaleriaScreen />} />
          <Route path="/manto" element={<MantoScreen />} />
          <Route path="/stats" element={<StatsScreen />} />
          <Route path="/resenha" element={<ResenhaScreen />} />
          <Route path="/parceiros" element={<ParceirosScreen />} />
          <Route path="/voto" element={<VotoScreen />} />
          <Route path="/historia" element={<HistoriaScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  )
}

function App() {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }

  return (
    <ToastCtx.Provider value={showToast}>
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
          {toast && <Toast message={toast} />}
          <InstallPWA />
        </AuthProvider>
      </BrowserRouter>
    </ToastCtx.Provider>
  )
}

export default App
