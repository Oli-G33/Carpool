import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Link,
  useMediaQuery,
  Avatar,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../components/Navbar';
import { getPassengers } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MobileNavbar from '../components/MobileNavbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const isNonMobileScreens = useMediaQuery('(min-width:800px)');

  const handleDateChange = async date => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

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
                maxWidth: isNonMobileScreens ? '82.5%' : '90%',
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
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ ...boxStyle }}>
              <Typography
                variant="h6"
                component="h2"
                mb={2}
                sx={{ ...whiteFontStyle }}
              >
                Passengers for {selectedDate}
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
                      style={{ flex: 1, display: 'flex', alignItems: 'center' }}
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
                      <Link
                        href={`mailto:${passenger.email}`}
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
                  No passengers found for the selected date.
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;
