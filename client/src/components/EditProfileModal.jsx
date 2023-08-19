import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  Alert,
  useMediaQuery,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModeIcon from '@mui/icons-material/Mode';
import { updateUser } from '../services/auth';
import { IKContext, IKUpload } from 'imagekitio-react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';

const EditProfileModal = ({ user, handleCloseModal, openModal }) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [phone, setPhone] = useState(user.phoneNumber || '');
  const [email, setEmail] = useState(user.email || '');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorText, setPhoneErrorText] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const handleClick = () => setShow(!show);

  const handleSavePersonalDetails = () => {
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

    // Check first name length
    if (firstName && firstName.length < 2) {
      setFirstNameError(true);
      setFirstNameErrorText('Please provide your full first name');
      return;
    } else {
      setFirstNameError(false);
      setFirstNameErrorText('');
    }

    // Check last name length
    if (lastName && lastName.length < 2) {
      setLastNameError(true);
      setLastNameErrorText('Please provide your full last name');
      return;
    } else {
      setLastNameError(false);
      setLastNameErrorText('');
    }

    // Check password length
    if (password && password.length < 8) {
      setPasswordError(true);
      setPasswordErrorText('Password should be at least 8 characters long');
      console.log(password.length);
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorText('Passwords do not match');
      setIsLoading(false);
      return;
    } else {
      setPasswordError(false);
      setPasswordErrorText('');
    }

    setIsLoading(true);

    const updatedUser = {
      firstName,
      lastName,
      phoneNumber: phone,
      email,
      picture: picture ? picture : user.picture,
      password: password ? password : user.password
    };

    updateUser(user._id, updatedUser)
      .then(() => {
        setIsLoading(false);
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setEmail(updatedUser.email);
        setPhone(updatedUser.phoneNumber);
        setPassword('');
        setConfirmPassword('');
        setAlertMessage('User updated successfully.');
        setTimeout(() => {
          setAlertMessage('');
          handleCloseModal();
          dispatch(
            setLogin({
              user: { ...updatedUser, _id: user._id, isAdmin: user.isAdmin }
            })
          );
        }, 3000);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error updating user:', error);
        setAlertMessage('An error occurred while updating the user.');
      });
  };

  const handleSuccess = ({ url }) => {
    setPicture(url);
    setIsLoading(false);
  };

  const handleError = error => {
    console.error('Image upload failed:', error);
  };

  const onUploadStart = () => {
    setIsLoading(true);
    console.log('Is Loading', isLoading);
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

  return (
    <>
      {/* Personal Details Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            color: 'white',
            position: 'relative'
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: isMobileScreen ? 'unset' : '8px',
              bottom: isMobileScreen ? '8px' : 'unset',
              left: '8px',
              padding: '4px',
              minWidth: 'unset',
              borderRadius: '50%',
              '& .MuiSvgIcon-root': {
                color: 'black'
              },
              '&:hover': {
                background: 'none',
                '& .MuiSvgIcon-root': {
                  color: 'black'
                }
              }
            }}
          >
            <CloseIcon />
          </Button>
          {!isMobileScreen && (
            <Typography variant="h6" align="center" gutterBottom color="black">
              Modify Personal Details
              <ModeIcon sx={{ ml: 1, color: 'black' }} />
            </Typography>
          )}

          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
            error={firstNameError}
            helperText={firstNameErrorText}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            sx={{ mb: 2 }}
            error={lastNameError}
            helperText={lastNameErrorText}
          />
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
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            error={emailError}
            helperText={emailErrorText}
          />
          <TextField
            label="Password"
            type={show ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 2 }}
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
              autoComplete: 'new-password'
            }}
          />
          <TextField
            label="Confirm Password"
            type={show ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={passwordError}
            helperText={passwordErrorText}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </InputAdornment>
              )
            }}
          />

          <IKContext
            publicKey={process.env.REACT_APP_IMAGEIO_PUBLIC_KEY}
            authenticationEndpoint={process.env.REACT_APP_IMAGEIO_AUTH_ENDPOINT}
            urlEndpoint={process.env.REACT_APP_IMAGEIO_URL_ENDPOINT}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <label
                htmlFor="fileInput"
                style={{
                  marginBottom: '8px',
                  textAlign: 'center',
                  color: 'black'
                }}
              >
                Profile Picture:
              </label>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '150px',
                  height: '50px',
                  border: '1px dashed #ccc',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center',
                  margin: '0 auto'
                }}
              >
                <IKUpload
                  onSuccess={handleSuccess}
                  onError={handleError}
                  className="fileUploadInput"
                  onUploadStart={onUploadStart}
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '165px',
                    height: '65px'
                  }}
                />
                {picture ? (
                  <Avatar
                    src={picture}
                    alt="Selected"
                    sx={{ mt: 1, mb: 1, width: 48 }}
                  />
                ) : (
                  <Typography variant="body2" color="black">
                    Click to Upload
                  </Typography>
                )}
              </div>
            </div>
          </IKContext>

          {alertMessage && (
            <Box mt={2}>
              <Alert severity="success">{alertMessage}</Alert>
            </Box>
          )}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              {' '}
              <CircularProgress sx={{ my: 2 }} />{' '}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                disabled={isLoading || !!alertMessage}
                onClick={handleSavePersonalDetails}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default EditProfileModal;
