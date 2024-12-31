import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';

      case 'password':
        if (!value) {
          return 'Password is required';
        }
        return '';

      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, value)
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };

    // Set all fields as touched
    setTouched({
      email: true,
      password: true
    });

    setErrors(newErrors);

    // Check if there are any errors
    if (!Object.values(newErrors).some(error => error)) {
      console.log('Form submitted:', formData);

      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/login",{email:formData.email,password:formData.password});
        if(response.data.success){
          console.log(response.data);
          localStorage.setItem('token', response.data.data.token);
          message.success('Login successful');
          navigate('/home');
        }
        
      } catch (error) {
        message.error(error.message)
      }

    }
  };

  const getInputBorderColor = (fieldName) => {
    if (touched[fieldName]) {
      return errors[fieldName] ? 'border-danger' : 'border-success';
    }
    return '';
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
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                {/* Email Input */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${getInputBorderColor('email')}`}
                    id="emailInput"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                  />
                  <label htmlFor="emailInput">Email</label>
                  {touched.email && errors.email && (
                    <div className="text-danger small mt-1">{errors.email}</div>
                  )}
                </div>

                {/* Password Input */}
                <div className="form-floating position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${getInputBorderColor('password')}`}
                    id="passwordInput"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
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
                  {touched.password && errors.password && (
                    <div className="text-danger small mt-1">{errors.password}</div>
                  )}
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
                <span className="text-secondary">Don't have an account? </span>
                <a href="/register" className="text-decoration-none text-primary">
                  Create account
                </a>
              </div>
            </form>
          </div>

          <div className="text-center small text-secondary mt-4">
            <p className="mb-0">
              Copyright © 2024 Design by BookLand
            </p>
          </div>
        </div>

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