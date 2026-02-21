import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Splash } from './components/Splash';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Squad } from './components/Squad';
import { PlayerProfile } from './components/PlayerProfile';
import { Store } from './components/Store';
import { Voting } from './components/Voting';
import { Chat } from './components/Chat';
import { Menu } from './components/Menu';
import { Admin } from './components/Admin';
import { History } from './components/History';
import { Navbar } from './components/Navbar';

function AppContent() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const location = useLocation();

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const hideNavbarPaths = ['/chat', '/admin', '/voting', '/player'];
  const showNavbar = !hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/player/:id" element={<PlayerProfile />} />
        <Route path="/store" element={<Store />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/history" element={<History />} />
      </Routes>
      {showNavbar && <Navbar />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
