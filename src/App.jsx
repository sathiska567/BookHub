import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  )
}
