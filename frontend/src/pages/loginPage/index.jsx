import React, { useState } from 'react';
import './style.scss'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
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