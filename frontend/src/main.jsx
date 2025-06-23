import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Dash from './components/Dash' // 👈 Import your Dash component
import './index.css'
import User from './components/User'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dash />} />
          <Route path="user" element={<User />} />
          <Route path="user/:id" element={<User />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
