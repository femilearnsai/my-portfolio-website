import React from 'react'
import { NavLink } from 'react-router-dom'
import { Mails, Sparkles, BriefcaseBusiness, House, Sun, Moon, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

function Navbar({ theme, setTheme}) {
    const NAV = [
        { to: '/', label: 'Home', icon: <House className="w-5 h-5 inline-block mr-2" /> },
        { to: '/projects', label: 'Projects', icon: <BriefcaseBusiness className="w-5 h-5 inline-block mr-2" /> },
        { to: '/skills', label: 'Skills', icon: <Sparkles className="w-5 h-5 inline-block mr-2" /> },
        { to: '/honours', label: 'Honours', icon: <Award className="w-5 h-5 inline-block mr-2" /> },
        { to: '/connect', label: 'Connect', icon: <Mails className="w-5 h-5 inline-block mr-2" /> }
    ]
  return (
    <header className="w-full py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-lg font-semibold tracking-tight fade-in-up">Oluwapelumi Awoyale</div>

          <nav className="hidden md:flex gap-2">
            {NAV.map(i => (
              <NavLink key={i.to} to={i.to}
                className={({isActive}) => `px-3 py-2 rounded-md nav-item card ${isActive ? 'ring-1 ring-offset-1' : 'hover:scale-[1.02]'}`}>
                {i.icon}<span className="align-middle">{i.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* THEME TOGGLE (top-right) */}
          <button
            aria-label="Toggle light / dark"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="btn-primary fade-in-up"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* mobile select */}
          <div className="md:hidden">
            <select onChange={(e)=> window.location.href = e.target.value} defaultValue="/" className="bg-transparent border border-black/6 p-2 rounded">
              {NAV.map(i => <option key={i.to} value={i.to}>{i.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar