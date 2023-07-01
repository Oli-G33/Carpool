import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  Stack,
  Divider
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Navbar from '../components/Navbar';
import { getMyRides, cancelMyRide } from '../services/weeklyRides';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';

const MyRidesPage = () => {
  const user = useSelector(state => state.user);

  const [rides, setRides] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // Fetch the rides for the signed-in user
        const userRides = await getMyRides(user._id);
        // Sort the rides by date in ascending order
        const sortedRides = userRides.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        });

        // Format the dates and update the state
        const formattedRides = sortedRides.map(ride => {
          const formattedDate = dayjs(ride.date).format('DD/MM/YYYY');
          return { ...ride, date: formattedDate };
        });

        setRides(formattedRides);
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchRides function
    fetchRides();
  }, [user._id]);

  const handleCancelRide = async (passengerId, date) => {
    try {
      setLoading(true);

      await cancelMyRide(passengerId, date);

      // Update the rides state to mark the cancelled ride
      setRides(prevRides =>
        prevRides.map(ride =>
          ride.passengerId === passengerId ? { ...ride, canceled: true } : ride
        )
      );

      // Fetch the updated rides and apply sorting and formatting
      const updatedRides = await getMyRides(user._id);
      const sortedRides = updatedRides.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      const formattedRides = sortedRides.map(ride => {
        const formattedDate = dayjs(ride.date).format('DD/MM/YYYY');
        return { ...ride, date: formattedDate };
      });

      // Update the rides state with the formatted rides
      setRides(formattedRides);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            <Typography
              variant="h4"
              sx={{
                color: '#D3D3D2'
              }}
            >
              My Rides
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(200, 200, 200, 0.6)',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '2px',
                maxWidth: '80%'
              }}
            >
              {rides.length > 0 ? (
                <List>
                  <Stack spacing={1}>
                    {rides.map((ride, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemText
                            sx={{
                              color: 'white'
                            }}
                            primary={ride.date}
                          />
                          {!ride.canceled ? (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() =>
                                handleCancelRide(ride.passengerId, ride.date)
                              }
                              disabled={loading}
                            >
                              {loading ? (
                                <CircularProgress size={25} />
                              ) : (
                                'Cancel'
                              )}
                            </Button>
                          ) : (
                            ''
                          )}
                        </ListItem>
                        {index !== rides.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </Stack>
                </List>
              ) : (
                <Typography
                  sx={{
                    color: 'white',
                    padding: '1%'
                  }}
                >
                  No rides found
                </Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} mb={12}>
              <Link href="#" onClick={handleOpenModal} color="#D3D3D2">
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
