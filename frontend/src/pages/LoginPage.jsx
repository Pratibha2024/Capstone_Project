import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const LoginPage = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Toggle between Login and Register modes
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    setForm((prevForm) => ({
      email: prevForm.email, // Retain email
      password: '',
      username: '',
    }));
    setError(''); // Clear errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!form.email) {
      setError('Email is required.');
      return;
    }
    if (!form.password) {
      setError('Password is required.');
      return;
    }
    if (isRegister && !form.username) {
      setError('Username is required.');
      return;
    }

    try {
      const endpoint = isRegister
        ? 'http://localhost:5000/api/users/register'
        : 'http://localhost:5000/api/users/login';

      const cleanForm = isRegister
        ? form // Full form for registration
        : { email: form.email, password: form.password }; // Remove username for login

      console.log('Submitting to:', endpoint);
      console.log('Payload:', cleanForm);

      const { data } = await axios.post(endpoint, cleanForm);
      localStorage.setItem('user', JSON.stringify(data)); // Save user data
      setUser(data); // Update user state
      navigate('/'); // Redirect to the homepage
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p onClick={toggleAuthMode} className="toggle-auth">
          {isRegister
            ? 'Already have an account? Login'
            : 'Don’t have an account? Register'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
