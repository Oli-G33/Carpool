import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInUser } from '../services/auth';
import { setLogin } from '../state';
import { useDispatch } from 'react-redux';

const theme = createTheme();

export default function Login({ isLogin, setIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState();
  const [emailErrorText, setEmailErrorText] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSwitchToRegistration = () => {
    setIsLogin(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setAlertMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setEmailError(true);
      setEmailErrorText('Please provide a valid email address');
      setLoading(false);
      return;
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }

    if (password.length < 8 || !password.length) {
      setPasswordError(true);
      setPasswordErrorText('Invalid password');
      setLoading(false);
      return;
    }

    try {
      const loggedInResponse = await logInUser({ email, password });

      if (loggedInResponse) {
        dispatch(
          setLogin({
            user: loggedInResponse.user,
            token: loggedInResponse.token
          })
        );
      }
      navigate('/booking');
    } catch (err) {
      console.error(err.response.data); // log the server error response

      // handle specific error messages
      if (err.response.data.msg === 'User does not exist') {
        setEmailError(true);
        setEmailErrorText(err.response.data.msg);
      } else if (err.response.data.msg === 'Invalid password') {
        setPasswordError(true);
        setPasswordErrorText(err.response.data.msg);
      } else {
        setAlertMessage('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(220, 220, 220, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '36px', 
            minWidth: "500px"
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: 'secondary.main', width: 62, height: 62 }}
          >
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Snackbar
              open={alertMessage !== ''}
              autoHideDuration={6000}
              onClose={() => setAlertMessage('')}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert severity="error" onClose={() => setAlertMessage('')}>
                {alertMessage}
              </Alert>
            </Snackbar>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  helperText={emailErrorText}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={event => setEmail(event.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={event => setPassword(event.target.value)}
                  error={passwordError}
                  helperText={passwordErrorText}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleSwitchToRegistration} variant="body2">
                  Not registered? Sign up!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
