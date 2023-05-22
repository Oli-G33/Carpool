import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  TextField,
  Box,
  Link,
  Skeleton
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Navbar from '../components/Navbar';

const MyRidesPage = () => {
  const [rides, setRides] = useState([
    { id: 1, week: '2023-W21', date: '2023-05-22', canceled: false },
    { id: 2, week: '2023-W21', date: '2023-05-24', canceled: false },
    { id: 3, week: '2023-W22', date: '2023-05-30', canceled: false }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCancelRide = rideId => {
    setRides(prevRides =>
      prevRides.map(ride =>
        ride.id === rideId ? { ...ride, canceled: true } : ride
      )
    );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSavePersonalDetails = () => {
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Password:', password);

    handleCloseModal();
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '50px' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">My Rides</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined">
              {rides.length > 0 ? (
                <List>
                  {rides.map(ride => (
                    <ListItem key={ride.id} disablePadding>
                      <ListItemText
                        primary={
                          <Skeleton
                            animation="wave"
                            height={24}
                            width="40%"
                            style={{ marginBottom: 4 }}
                          />
                        }
                        secondary={
                          <Skeleton animation="wave" height={16} width="30%" />
                        }
                      />
                      {!ride.canceled ? (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleCancelRide(ride.id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Skeleton
                          animation="wave"
                          height={32}
                          width={80}
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No rides found</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Link href="#" onClick={handleOpenModal}>
                Modify Personal Details
                <ModeIcon sx={{ ml: 1 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Personal Details Modal */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px'
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
            <Button variant="contained" onClick={handleSavePersonalDetails}>
              Save
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default MyRidesPage;
