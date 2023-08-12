import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Container, Box } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://carpooler-backend.onrender.com/auth/forgot-password',
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '400px',
          padding: '16px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom color="white">
          Forgot Password{' '}
          <LockResetIcon
            sx={{
              fontSize: '1.2em',
              verticalAlign: 'middle'
            }}
          />
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Enter your email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputProps={{
              sx: {
                color: 'white'
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D2'
              },
              '& .MuiInputLabel-root': {
                color: 'white'
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'white'
                },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'white'
                }
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send reset link
          </Button>
        </form>
        <Typography variant="body1" color="textSecondary" mt={2}>
          {message}
        </Typography>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
