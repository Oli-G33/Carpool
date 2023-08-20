import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Link,
  useMediaQuery,
  Avatar,
  Box,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../components/Navbar';
import { getPassengers, fetchPendingRides } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MobileNavbar from '../components/MobileNavbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import RideConfirmModal from '../components/RideConfirmModal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RideInfoModal from '../components/RideInfoModal';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const [pendingPassengers, setPendingPassengers] = useState([]);
  const isNonMobileScreens = useMediaQuery('(min-width:800px)');
  const [currentTab, setCurrentTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [isRideInfoModalOpen, setIsRideInfoModalOpen] = useState(false);
  const [selectedPassengerForModal, setSelectedPassengerForModal] =
    useState(null);

  const user = useSelector(state => state.user);

  const driverId = user._id;

  useEffect(() => {
    if (currentTab === 1) {
      fetchPendingRides(driverId)
        .then(data => {
          setPendingPassengers(data);
          console.log(pendingPassengers);
        })
        .catch(error => {
          console.error('Error fetching pending passengers:', error);
        });
    }
  }, [currentTab, driverId]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDateChange = async date => {
    setSelectedDate(date);
    const formattedDate = dayjs(date).format('YYYY-MM-DD');

    try {
      const retrievedPassengers = await getPassengers(formattedDate);
      if (retrievedPassengers.length === 0) {
        setPassengers([]);
      } else {
        setPassengers(retrievedPassengers);
        console.log(retrievedPassengers);
      }
    } catch (error) {
      console.error('Here', error);
      if (error.message === 'No ride found for the date') {
        setPassengers([]);
        console.log(passengers);
      }
    }
  };

  const handleOpenRideInfoModal = passenger => {
    setSelectedPassenger(passenger);
    setSelectedPassengerForModal(passenger);
    setIsRideInfoModalOpen(true);
  };

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const boxStyle = {
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px'
  };

  const whiteFontStyle = {
    color: 'white'
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = passenger => {
    setSelectedPassenger(passenger);
    setOpenModal(true);
  };

  const handleRideConfirmed = () => {
    fetchPendingRides(driverId)
      .then(data => {
        setPendingPassengers(data);
      })
      .catch(error => {
        console.error('Error fetching pending passengers:', error);
      });
  };

  return (
    <>
      {isMobileScreen ? <MobileNavbar /> : <Navbar />}

      <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
        <Grid container spacing={3}>
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
                textAlign: 'center',
                margin: '0 auto'
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                color="white"
              >
                Dashboard
              </Typography>
              <DashboardIcon sx={{ marginLeft: '10px', fontSize: '32px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'rgba(200, 200, 200, 0.6)',
                border: '1px solid #ccc',
                borderRadius: '8px',
                height: '7.5vh',
                textAlign: 'center',
                margin: '0 auto',
                marginBottom: '0.5%'
              }}
            >
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Confirmed rides" sx={{ ...whiteFontStyle }} />
                <Tab label="Pending rides" sx={{ ...whiteFontStyle }} />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {currentTab === 0 && (
              <Paper elevation={3} sx={{ ...boxStyle }}>
                <Typography
                  variant="h6"
                  component="h2"
                  mb={2}
                  sx={{ ...whiteFontStyle }}
                >
                  Select a Date
                </Typography>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DatePicker
                    label="Choose a date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="custom-calendar"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: ' white'
                      },
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'white'
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'white'
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white'
                      },
                      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: 'white'
                        },
                      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: '#D3D3D2'
                        },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: 'white'
                        }
                    }}
                  />
                </LocalizationProvider>
              </Paper>
            )}
          </Grid>

          {currentTab === 0 && (
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ ...boxStyle, minHeight: '14.75vh' }}>
                <Typography
                  variant="h6"
                  component="h2"
                  mb={2}
                  sx={{ ...whiteFontStyle }}
                >
                  Passengers for{' '}
                  {selectedDate && dayjs(selectedDate).format('DD/MM/YYYY')}
                </Typography>

                {passengers.length > 0 ? (
                  passengers.map(passenger => (
                    <Paper
                      elevation={1}
                      key={passenger._id}
                      sx={{
                        ...boxStyle,
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        src={passenger.picture}
                        alt={`${passenger.firstName} ${passenger.lastName}`}
                        sx={{ marginRight: '24px' }}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="p"
                          sx={{ ...whiteFontStyle }}
                        >
                          {passenger.firstName} {passenger.lastName}
                        </Typography>

                        <Link
                          href={`https://wa.me/${passenger.phoneNumber}`}
                          color="inherit"
                          underline="none"
                          target="_blank"
                          ml={2}
                          sx={{ marginLeft: 'auto' }}
                        >
                          <WhatsAppIcon
                            sx={{
                              color: '#128c7e'
                            }}
                          />
                        </Link>
                        <MoreVertIcon
                          sx={{
                            marginLeft: 'auto',
                            cursor: 'pointer',
                            marginLeft: isMobileScreen ? 1 : 2
                          }}
                          onClick={() => handleOpenRideInfoModal(passenger)}
                        />
                      </div>
                    </Paper>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ ...whiteFontStyle }}
                  >
                    No passengers found for the selected date.
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}

          <Grid item xs={12} md={12}>
            {currentTab === 1 && (
              <Paper elevation={3} sx={{ ...boxStyle, minHeight: '14.75vh' }}>
                <Typography
                  variant="h6"
                  component="h2"
                  mb={2}
                  sx={{ ...whiteFontStyle }}
                >
                  Pending confirmation:
                </Typography>
                {pendingPassengers.length > 0 ? (
                  pendingPassengers.map(passenger => (
                    <Paper
                      elevation={1}
                      key={passenger._id}
                      sx={{
                        ...boxStyle,
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        src={passenger.userId.picture}
                        alt={`${passenger.userId.firstName} ${passenger.userId.lastName}`}
                        sx={{ marginRight: '24px' }}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="p"
                          sx={{ ...whiteFontStyle }}
                        >
                          {passenger.userId.firstName}{' '}
                          {passenger.userId.lastName}{' '}
                          {dayjs(passenger.date).format('DD/MM/YYYY')}
                        </Typography>

                        <Link
                          href="#"
                          color="inherit"
                          underline="none"
                          onClick={() => handleOpenModal(passenger)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 'auto',
                            marginRight: '10px'
                          }}
                        >
                          <CheckCircleOutlineIcon
                            sx={{
                              color: 'green',
                              marginRight: '4px'
                            }}
                          />
                        </Link>

                        <Link
                          href={`https://wa.me/${passenger.userId.phoneNumber}`}
                          color="inherit"
                          underline="none"
                          target="_blank"
                          ml={2}
                        >
                          <WhatsAppIcon
                            sx={{
                              color: '#128c7e'
                            }}
                          />
                        </Link>
                        <Link
                          href={`mailto:${passenger.userId.email}`}
                          color="inherit"
                          underline="none"
                          target="_blank"
                          ml={2}
                        >
                          <EmailIcon
                            sx={{
                              color: '#FF5722'
                            }}
                          />
                        </Link>
                      </div>
                    </Paper>
                  ))
                ) : (
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ ...whiteFontStyle }}
                  >
                    No pending rides
                  </Typography>
                )}
              </Paper>
            )}
          </Grid>
          <RideConfirmModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            selectedPassenger={selectedPassenger}
            onRideConfirmed={handleRideConfirmed}
          />
        </Grid>
        <RideInfoModal
          type="passenger"
          selectedData={selectedPassenger}
          isModalOpen={isRideInfoModalOpen}
          onClose={() => setIsRideInfoModalOpen(false)}
        />
      </Container>
    </>
  );
};

export default DashboardPage;
