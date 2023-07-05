import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import { updateUser } from '../services/auth';
import { IKContext, IKUpload } from 'imagekitio-react';

const EditProfileModal = ({ user, handleCloseModal, openModal }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSavePersonalDetails = () => {
    setIsLoading(true);
    updateUser()
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const handleSuccess = async ({ url }) => {
    try {
      setIsLoading(true);
      await setPicture(url);
    } catch (error) {
      console.error('Error setting picture:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = error => {
    console.error('Image upload failed:', error);
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
            color: 'white'
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Modify Personal Details
            <ModeIcon sx={{ ml: 1 }} />
          </Typography>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            fullWidth
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <IKContext
            publicKey={process.env.REACT_APP_IMAGEIO_PUBLIC_KEY}
            authenticationEndpoint={process.env.REACT_APP_IMAGEIO_AUTH_ENDPOINT}
            urlEndpoint={process.env.REACT_APP_IMAGEIO_URL_ENDPOINT}
          >
            <IKUpload
              onSuccess={handleSuccess}
              onError={handleError}
              className="fileUploadInput"
            />
          </IKContext>

          {isLoading && <CircularProgress sx={{ my: 2 }} />}
          {picture && (
            <img src={picture} alt="Selected" width="100" height="100" />
          )}
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleSavePersonalDetails}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EditProfileModal;
