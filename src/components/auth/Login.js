import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './auth.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response);
      
      if (response && response.token) {
        localStorage.setItem('token', response.token); 
        navigate('/'); 
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='auth-form-container'>
    <div className="container">
      <h2 className="header">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="inputGroup">
          <label className="label">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input"
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="text">
        New User? <Link to="/signup" className="link">Register Here</Link>
      </p>
    </div></div>
  );
};

export default Login;
