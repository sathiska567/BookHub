import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdSinglePage from './Pages/AdSinglePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/book/:id" element={<AdSinglePage/>} />
      </Routes>
    </Router>
  )
}
