import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/auth/forgot-password',
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
