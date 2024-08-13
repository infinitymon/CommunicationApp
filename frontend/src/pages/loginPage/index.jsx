import React, { useState } from 'react';
import axios from 'axios';
import './style.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setRole(option.value);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="login-container">
      <div className='login-container_contentBox'>
        <div className='login-container_contentBox_items'>

          <h1>Log in to your Agent account</h1>
          <p>Please enter your email and password.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='dropdown'>
              <label htmlFor="role">Role:</label>
              <button className="dropdown-button" onClick={handleToggle}>
                {selectedOption ? selectedOption.label : 'Select an option'}
              </button>
              {isOpen && (
                <ul className="dropdown-menu">
                  {options.map((option) => (
                    <li key={option.value} onClick={() => handleOptionSelect(option)}>
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
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