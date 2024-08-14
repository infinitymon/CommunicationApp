import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('agent');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/authentication/login', {
        email,
        password,
        role, // Include role in the request body
      });
      // Handle the login response (e.g., redirect to the dashboard)
      console.log('Login successful:', response.data);
      if (response.data.message === "Success"){
        navigate('/home')
      }

    } catch (error) {
      // Handle login errors (e.g., display an error message)
      console.error('Login error:', error);
    }
  };

  const [isOpen, setIsOpen] = useState(false); // Controls dropdown visibility
  const [selectedOption, setSelectedOption] = useState(null); // Stores the selected value

  const options = [
    { value: 'agent', label: 'Agent' },
    { value: 'admin', label: 'Admin' }
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="login-container">
      <div className='login-container_contentBox'>
        <div className='login-container_contentBox_items mb-2'>

          <h1>Log in to your Agent account</h1>
          <p>Please enter your email and password.</p>
          <form onSubmit={handleSubmit} className='col-12'>
            <div className='row mb-2'>
              <label className='col-2' htmlFor="email">Email:</label>
              <div className='col-8 d-flex justify-content-end'>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row mb-2'>
              <label className='col-2' htmlFor="password">Password:</label>
              <div className='col-8 d-flex justify-content-end'>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row mb-2'>
              <label className='col-2' htmlFor="role">Role:</label>
              <div className='col-8'>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  {options.map((option) => (
                    <option className='dropdown-item' key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
        <p>
          Don't have an account? <a href="/signup">Create your account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;