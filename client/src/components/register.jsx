import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { CircularProgress, InputAdornment, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { setLogin } from '../state';
import { useDispatch } from 'react-redux';
import { IKContext, IKUpload } from 'imagekitio-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

export default function SignUp({ isLogin, setIsLogin, props }) {
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setPicture] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [checked, setChecked] = useState(false);
  const [firstNameError, setFirstNameError] = useState();
  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [phoneError, setPhoneError] = useState();
  const [phoneErrorText, setPhoneErrorText] = useState('');
  const [lastNameError, setLastNameError] = useState();
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [emailError, setEmailError] = useState();
  const [emailErrorText, setEmailErrorText] = useState();
  const [passwordError, setPasswordError] = useState();
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsRead, setTermsRead] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSwitchToRegistration = () => {
    setIsLogin(true);
  };
  const handleChange = value => {
    const isValid = matchIsValidTel(value);
    if (!isValid) {
      setPhoneError(true);
      setPhoneErrorText('Invalid mobile number');
    } else {
      setPhoneError(false);
      setPhoneErrorText('');
    }
    setPhone(value);
  };

  const handleTerms = () => {
    setTermsRead(true);
  };

  const handleSuccess = result => {
    const { url } = result;
    setPicture(url);
    setIsLoading(false);
  };

  const handleError = error => {
    console.log(error);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !phone) {
      setAlertMessage('Please fill in all required fields');
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setEmailError(true);
      setEmailErrorText('Please provide a valid email address');
      return;
    } else {
      setEmailError(false);
      setEmailErrorText('');
    }

    if (!checked) {
      setAlertMessage('Please accept the Terms & Conditions');
      return;
    }

    if (firstName.length < 2) {
      setFirstNameError(true);
      setFirstNameErrorText('Please provide your full first name');
      return;
    } else {
      setFirstNameError(false);
      setFirstNameErrorText('');
    }

    if (lastName.length < 2) {
      setLastNameError(true);
      setLastNameErrorText('Please provide your full last name');
      return;
    } else {
      setLastNameError(false);
      setLastNameErrorText('');
    }

    if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorText('Password should be at least 8 characters long');
      console.log(password.length);
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    if (!termsRead) {
      setAlertMessage('Please read the terms and conditions :)');
      return;
    } else {
      setAlertMessage('');
    }

    try {
      const registerResponse = await registerUser({
        firstName,
        lastName,
        email,
        picture,
        password,
        phoneNumber: phone
      });

      const registeredUser = await registerResponse;
      console.log(registeredUser);
      if (registeredUser) {
        dispatch(
          setLogin({
            user: registeredUser
          })
        );
      }
      navigate('/booking');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        console.log(errorMessage);
        if (errorMessage.includes('E11000 duplicate key error collection')) {
          setEmailError(true);
          setEmailErrorText('This email address is already registered');
          return;
        }
      } else {
        setEmailError(false);
        setEmailErrorText('');
      }
    }
  };

  const handleClick = () => setShow(!show);

  const onUploadStart = () => {
    setIsLoading(true);
    console.log('Is Loading', isLoading);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          xs={12}
          sm={6}
          md={4}
          xl="100%"
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '36px',
            maxWidth: '100%'
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: 'secondary.main', width: 62, height: 62 }}
          >
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Sign up
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  error={firstNameError}
                  helperText={firstNameErrorText}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={event => setFirstName(event.target.value)}
                  InputProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={event => setLastName(event.target.value)}
                  error={lastNameError}
                  helperText={lastNameErrorText}
                  InputProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              </Grid>
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
                  InputProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  error={phoneError}
                  label="Mobile number"
                  helperText={phoneErrorText}
                  required
                  id="phoneNumber"
                  value={phone}
                  onChange={handleChange}
                  fullWidth
                  defaultCountry="DE"
                  focusOnSelectCountry
                  disableFormatting
                  onlyCountries={['ES', 'DE', 'FR', 'IT', 'US', 'CA', 'PT']}
                  InputProps={{
                    sx: {
                      color: 'white'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={show ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  onChange={event => setPassword(event.target.value)}
                  error={passwordError}
                  helperText={passwordErrorText}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Button>
                      </InputAdornment>
                    ),
                    sx: {
                      color: 'white'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type={show ? 'text' : 'password'}
                  fullWidth
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  error={passwordError}
                  helperText={passwordErrorText}
                  sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                      {
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Button>
                      </InputAdornment>
                    ),
                    sx: {
                      color: 'white'
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" color="white" sx={{ mb: 1 }}>
                    Upload Profile Picture:
                  </Typography>
                  <label
                    htmlFor="fileInput"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{
                        opacity: 0,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                      onChange={event => {
                        const file = event.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = e => {
                            handleSuccess({ url: e.target.result });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px dashed #ccc',
                        borderRadius: '8px',
                        padding: '8px',
                        textAlign: 'center',
                        width: '150px', // Set a specific width if needed
                        margin: '0 auto' // Center horizontally
                      }}
                    >
                      {picture ? (
                        <Avatar src={picture} alt="Selected" sx={{ mt: 1 }} />
                      ) : (
                        <Typography variant="body2" color="white">
                          Click to Upload
                        </Typography>
                      )}
                    </div>
                  </label>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      id="terms"
                      name="terms"
                      value="terms"
                      color="primary"
                      onChange={() => setChecked(!checked)}
                      sx={{ marginLeft: '15px' }}
                    />
                  }
                />
                <Link
                  href="/terms"
                  variant="body2"
                  underline="hover"
                  target="_blank"
                  onClick={handleTerms}
                >
                  I accept the Terms & Conditions*
                </Link>
              </Grid>
            </Grid>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress sx={{ my: 2 }} />
              </Box>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  underline="hover"
                  onClick={handleSwitchToRegistration}
                  variant="body2"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
