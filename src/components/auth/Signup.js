import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'; 
import api from '../../services/api';
import './auth.css';

const Signup = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); 
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await api.post('/auth/register', { email, password });
      navigate('/login'); 
    } catch (error) {
      setError('Error signing up. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='auth-form-container'>
      <div className="container">
        <h2 className="header">Signup</h2>
        <form onSubmit={handleSignup} className="form">
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
            <div className="passwordContainer">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="input" 
              />
              <span className="icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>
          <div className="inputGroup">
            <label className="label">Confirm Password:</label>
            <div className="passwordContainer">
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                className="input" 
              />
              <span className="icon" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="button">Signup</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="text">Already have an account? <Link to="/login" className="link">Login Here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
