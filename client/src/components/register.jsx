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
import { CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { setLogin } from '../state';
import { useDispatch } from 'react-redux';
import { IKContext, IKUpload } from 'imagekitio-react';

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
  const [termsRead, setTermsRead]= useState(false)
  

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

  const handleTerms= ()=>{
    setTermsRead(!termsRead)
   
  }

  const handleSuccess = result => {
    const { url } = result;
    setPicture(url);
    setIsLoading(false);
    console.log(url);
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

    if (!termsRead){
      setAlertMessage("Please read the terms and conditions XD")
      return;
    } else{
      setAlertMessage("")
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
      console.log(error.message);
    }
  };

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
          <Typography component="h1" variant="h5" color="#D3D3D2">
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
                  autoFocus
                  onChange={event => setFirstName(event.target.value)}
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
              <Grid item xs={12}>
                {picture && (
                  <img src={picture} alt="Selected" width="100" height="100" />
                )}
                <IKContext
                  publicKey={process.env.REACT_APP_IMAGEIO_PUBLIC_KEY}
                  authenticationEndpoint={
                    process.env.REACT_APP_IMAGEIO_AUTH_ENDPOINT
                  }
                  urlEndpoint={process.env.REACT_APP_IMAGEIO_URL_ENDPOINT}
                >
                  <IKUpload
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="fileUploadInput"
                    onUploadStart={onUploadStart}
                  />
                </IKContext>
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
                <Link variant="body2" underline="hover" href="/terms" onClick={handleTerms}>
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
