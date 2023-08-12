import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const { resetToken } = useParams();

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorText('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorText('Password should be at least 8 characters long');
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    try {
      const response = await axios.post(
        `https://carpooler-backend.onrender.com/auth/reset-password/${resetToken}`,
        {
          password
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
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
          Reset Password
          <LockResetIcon
            sx={{
              fontSize: '1.2em',
              verticalAlign: 'middle',
              marginLeft: '8px'
            }}
          />
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorText}
            margin="normal"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              sx: {
                color: 'white'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
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
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            error={passwordError}
            helperText={passwordErrorText}
            variant="outlined"
            margin="normal"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            InputProps={{
              sx: {
                color: 'white'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
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
            Reset Password
          </Button>
        </form>
        <Typography variant="body1" color="textSecondary" mt={2}>
          {message}
        </Typography>
      </Box>
    </Container>
  );
}

export default ResetPassword;
