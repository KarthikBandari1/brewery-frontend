import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './auth.css'; 

const Signup = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      navigate('/login'); 
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className='auth-form-container'>
    <div className="container">
      <h2 className="header">Signup</h2>
      <form onSubmit={handleSignup} className="form">
        <div className="inputGroup">
          <label className="label">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
        </div>
        <div className="inputGroup">
          <label className="label">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        </div>
        <button type="submit" className="button">Signup</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="text">Already have an account? <Link to="/login" className="link">Login Here</Link></p>
    </div></div>
  );
};

export default Signup;
