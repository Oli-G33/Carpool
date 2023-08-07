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
  Divider,
  useMediaQuery
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Navbar from '../components/Navbar';
import { getMyRides, cancelMyRide } from '../services/weeklyRides';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import EditProfileModal from '../components/EditProfileModal';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MobileNavbar from '../components/MobileNavbar';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const MyRidesPage = () => {
  const user = useSelector(state => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width:800px)');

  const [rides, setRides] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  return (
    <>
      {isMobileScreen ? <MobileNavbar /> : <Navbar />}
      <Box sx={{ textAlign: 'center' }}>
        <Container sx={{ marginTop: '50px' }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(200, 200, 200, 0.6)',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  height: '10vh',
                  maxWidth: '80%',
                  textAlign: 'center',
                  margin: '0 auto'
                }}
              >
                <Typography
                  variant={isNonMobileScreens ? 'h4' : 'h5'}
                  sx={{ color: 'white', textAlign: 'center' }}
                >
                  My Rides
                </Typography>
                <DirectionsCarIcon
                  sx={{ marginLeft: '10px', fontSize: '32px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{
                  backgroundColor: 'rgba(200, 200, 200, 0.6)',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '2px',
                  maxWidth: '80%',
                  margin: '0 auto'
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
                            <Link
                              href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
                              color="inherit"
                              underline="none"
                              target="_blank"
                              mr={3}
                            >
                              <WhatsAppIcon
                                sx={{
                                  color: '#25D366',
                                  fontSize: '30px'
                                }}
                              />
                            </Link>
                            {!ride.canceled ? (
                              <Button
                                variant="contained"
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
                  Edit Profile
                  <ModeIcon sx={{ ml: 1 }} />
                </Link>
              </Box>
            </Grid>
          </Grid>

          {/* Personal Details Modal */}
          <EditProfileModal
            user={user}
            handleCloseModal={handleCloseModal}
            handleOpenModal={handleOpenModal}
            openModal={openModal}
          />
        </Container>
      </Box>
    </>
  );
};

export default MyRidesPage;
