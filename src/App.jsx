import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AdSinglePage from './Pages/AdSinglePage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import ForgottenPasswordPage from './Pages/ForgottenPasswordPage';
import OTPPage from './Pages/OTPPage';
import ResetPassword from './Pages/ResetPassword';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/book" element={<AdSinglePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/forgotten-password" element={<ForgottenPasswordPage/>} />
        <Route path="/otp" element={<OTPPage/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </Router>
  )
}
