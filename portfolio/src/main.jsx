import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'
import './styles.css' 



function initAnalytics() {
  const id = import.meta.env.VITE_ANALYTICS_ID
  if (!id) return
  
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'analytics:init', id })
}


initAnalytics()


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)