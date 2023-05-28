import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { getMyRides } from '../services/weeklyRides';

const MyRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user.user);
  console.log(rides);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // Fetch the rides for the signed-in user
        const userRides = await getMyRides(user._id); // Update this with your API call

        // Set the fetched rides in the state
        setRides(userRides);
      } catch (error) {
        console.error(error);
        // Handle error, show error message, etc.
      }
    };

    // Call the fetchRides function
    fetchRides();
  }, []); // Empty dependency array to run the effect only once

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
                  {rides.map((ride, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={
                          <Skeleton
                            animation="wave"
                            height={24}
                            width="40%"
                            style={{ marginBottom: 4 }}
                          >
                            {ride && (
                              <Typography>
                                {new Date(ride).toLocaleDateString('de-DE', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </Typography>
                            )}
                          </Skeleton>
                        }
                      />
                      {!ride.canceled ? (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleCancelRide(index)}
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
