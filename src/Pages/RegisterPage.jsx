import React, { useState } from 'react';

const BookLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/3 bg-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">BookStore Pro</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          {!isLogin && (
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
          
          <p className="text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </form>
      </div>
      
      <div className="hidden md:block md:w-2/3 bg-gray-100">
        <img
          src="/api/placeholder/800/600"
          alt="Books background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BookLogin;