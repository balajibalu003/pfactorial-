import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'staff@clinic.com' && password === '123456') {
      setError('');
      onLogin(true);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Clinic Staff Login</h1>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <button type="submit" className="btn">
          Login
        </button>
        
        {error && <div className="error">{error}</div>}
        
        <div style={{ 
          marginTop: '20px', 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#666',
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '10px', color: '#333' }}>
            Demo Credentials
          </p>
          <p style={{ marginBottom: '5px' }}>Email: <strong>staff@clinic.com</strong></p>
          <p>Password: <strong>123456</strong></p>
        </div>
      </form>
    </div>
  );
}

export default Login; 