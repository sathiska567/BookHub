import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Eye, EyeOff } from 'lucide-react';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Full name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          return 'Name can only contain letters and spaces';
        }
        return '';

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
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*[0-9])/.test(value)) {
          return 'Password must contain at least one number';
        }
        if (!/(?=.*[!@#$%^&*])/.test(value)) {
          return 'Password must contain at least one special character (!@#$%^&*)';
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
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };

    setTouched({
      name: true,
      email: true,
      password: true
    });

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      console.log('Form submitted:', formData);

      try {
        const response = await axios.post("http://localhost:8080/api/v1/auth/register",{name:formData.name , email:formData.email , password:formData.password});
        console.log(response.data);
        message.success('Registration successful')
        navigate('/login')
        
      } catch (error) {
         message.error('Failed to Register. Please Check Email and Password.')
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        <div className="col-12 col-md-5 col-lg-4 p-4 p-md-5 d-flex flex-column justify-content-between">
          <div>
            
            <h1 className="fw-bold mb-5">BookLand</h1>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">

                {/* Name Input */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                  />
                  <label htmlFor="nameInput">Full Name</label>
                  {touched.name && errors.name && (
                    <div className="text-danger small">{errors.name}</div>
                  )}
                </div>

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
                    onBlur={handleBlur}
                    required
                  />
                  <label htmlFor="emailInput">Email</label>
                  {touched.email && errors.email && (
                    <div className="text-danger small">{errors.email}</div>
                  )}
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
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {touched.password && errors.password && (
                    <div className="text-danger small">{errors.password}</div>
                  )}
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <div className="small text-muted mt-2">
                    <p className="mb-1">Password must contain:</p>
                    <ul className="list-unstyled ps-3">
                      <li className={`${formData.password.length >= 8 ? 'text-success' : 'text-muted'}`}>
                        ✓ At least 8 characters
                      </li>
                      <li className={`${/[A-Z]/.test(formData.password) ? 'text-success' : 'text-muted'}`}>
                        ✓ One uppercase letter
                      </li>
                      <li className={`${/[0-9]/.test(formData.password) ? 'text-success' : 'text-muted'}`}>
                        ✓ One number
                      </li>
                      <li className={`${/[!@#$%^&*]/.test(formData.password) ? 'text-success' : 'text-muted'}`}>
                        ✓ One special character (!@#$%^&*)
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mb-4 text-uppercase fw-semibold"
              >
                Sign Up
              </button>

              {/* Login Link */}
              <div className="text-center small">
                <span className="text-secondary">Already have an account? </span>
                <a href="/login" className="text-decoration-none text-primary">
                  Login here
                </a>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center small text-secondary mt-4">
            <p className="mb-0">Copyright © 2024 Design by BookLand</p>
          </div>
        </div>

        {/* Right side - Background Image */}
        <div
          className="col-md-7 col-lg-8 d-none d-md-block px-0"
          style={{
            backgroundImage: `url('https://pics.craiyon.com/2024-03-05/yA7nABViTq6csFr06k2zCA.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
