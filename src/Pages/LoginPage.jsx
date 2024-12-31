import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side - Login Form */}
        <div className="col-12 col-md-5 col-lg-4 p-4 p-md-5 d-flex flex-column justify-content-between">
          <div>
            {/* Logo/Title */}
            <h1 className="fw-bold mb-5">BookLand</h1>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="needs-validation">
              <div className="mb-4">
                {/* Email Input */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="emailInput">Email</label>
                </div>

                {/* Password Input */}
                <div className="form-floating position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="passwordInput"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="passwordInput">Password</label>
                  <button
                    type="button"
                    className="btn position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 text-secondary pe-3"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ zIndex: 5 }}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-end mb-4">
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-4 text-uppercase fw-semibold"
              >
                Sign In
              </button>

              {/* Create Account Link */}
              <div className="text-center small">
                <span className="text-secondary">Don't have account? </span>
                <a href="/register" className="text-decoration-none text-primary">
                  Create account
                </a>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center small text-secondary mt-4">
            <p className="mb-0">
              Copyright © 2024 Design by BookLand
            </p>
          </div>
        </div>

        {/* Right side - Background Image */}
        <div
          className="col-md-7 col-lg-8 d-none d-md-block px-0"
          style={{
            backgroundImage: `url('https://pics.craiyon.com/2024-03-05/yA7nABViTq6csFr06k2zCA.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0px)',
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
