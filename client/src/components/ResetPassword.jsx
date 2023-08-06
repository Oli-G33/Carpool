import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { resetToken } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset-password/${resetToken}`,
        {
          password
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
