import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import {Footer} from './components/footer';
import Home from '../src/Pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import HonoursPage from './pages/HonoursPage';
import ConnectPage from './pages/ConnectPage';

export default function App(){
  // initialize theme: prefer saved, else system
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if(saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="app-root min-h-screen flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/honours" element={<HonoursPage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
