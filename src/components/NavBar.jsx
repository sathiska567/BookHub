import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LogOut } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLoginNavigate = async()=>{
    try {
      navigate("/login")
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleRegisterNavigate = async()=>{
    try {
      navigate("/register")
    } catch (error) {
      message.error(error.message)
    }
  }

  const handleLogOutNavigate = async()=>{
    try {
      localStorage.clear()
      message.success("Logout Successful")
      navigate("/home")
    } catch (error) {
      message.error(error.message)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-primary" href="/home">
        <span className="text-warning h4 mb-0">📚</span>
        <span className="ms-2">Bookland</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form className="d-flex mx-lg-auto w-50 my-2 my-lg-0">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>
              <input
                type="search"
                className="form-control border-start-0"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
          </form>

          {/* Auth Buttons */}
          <div className="d-flex gap-2 mt-3 mt-lg-0">
            <button className="btn btn-outline-light" type="button" onClick={handleLoginNavigate}>
              Sign In
            </button>
            <button className="btn btn-primary" type="button" onClick={handleRegisterNavigate}>
              Register
            </button>

            <button
                className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2"
                type="button"
                onClick={handleLogOutNavigate}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;