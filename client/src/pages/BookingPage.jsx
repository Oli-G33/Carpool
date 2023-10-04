import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Grid,
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAvailableSeats } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { bookRide } from '../services/weeklyRides';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { wakeApi } from '../services/api';
import { Alert } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MobileNavbar from '../components/MobileNavbar';
import DriverInfoCard from '../components/DriverInfoCard';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoadingSeats, setIsLoadingSeats] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState('Oliver');

  const [availableSeats, setAvailableSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const formattedDate = selectedDate ? selectedDate.format('DD-MM-YYYY') : null;
  const isNonMobileScreens = useMediaQuery('(min-width:800px)');

  const presentDate = dayjs();
  const maxSelectableDate = presentDate.add(14, 'day');

  const isWeekend = date => {
    const day = dayjs(date).day();

    return day === 6 || day === 0;
  };

  useEffect(() => {
    if (formattedDate) {
      setIsLoadingSeats(true);
      wakeApi();
      getAvailableSeats(formattedDate)
        .then(data => {
          setAvailableSeats(data);
          if (data && data.error) {
            setAlertMessage(data.error);
          } else {
            setAlertMessage('');
          }
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoadingSeats(false);
        });
    }
  }, [formattedDate]);

  const renderSeatIcons = count => {
    const seatIconSize = isMobileScreen ? 4 : 6;

    return Array.from({ length: count.availableSeats }, (_, index) => (
      <AirlineSeatReclineNormalIcon
        key={index}
        color="primary"
        sx={{
          fontSize: `${seatIconSize}vh`,
          margin: '0 2px'
        }}
      />
    ));
  };

  const handleBookRide = () => {
    setIsLoading(true);
    bookRide(formattedDate, user._id)
      .then(() => {
        navigate('/success');
      })
      .catch(error => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setAlertMessage(error.response.data.message);
        } else {
          setAlertMessage('An error occurred while booking the ride.');
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleDriverChange = event => {
    setSelectedDriver(event.target.value);
  };

  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const boxStyle = {
    backgroundColor: 'rgba(200, 200, 200, 0.6)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white'
  };

  return (
    <>
      {isMobileScreen ? <MobileNavbar /> : <Navbar />}

      <Container
        sx={{
          marginTop: isMobileScreen ? '50px' : '30px',
          minHeight: isMobileScreen ? '60vh' : '70vh'
        }}
      >
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
            margin: '0 auto',
            marginBottom: 4
          }}
        >
          <Typography
            variant={isNonMobileScreens ? 'h4' : 'h5'}
            sx={{ color: 'white', textAlign: 'center' }}
          >
            Book your ride
          </Typography>
          <ConfirmationNumberIcon
            sx={{ marginLeft: '10px', fontSize: '32px' }}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'rgba(200, 200, 200, 0.6)',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                maxWidth: isNonMobileScreens ? '82.5%' : '90%',
                padding: 3
              }}
            >
              <Typography
                variant={'h5'}
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  marginRight: 2,
                  marginLeft: 1
                }}
              >
                Select date:
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="en-gb"
              >
                <DatePicker
                  value={selectedDate}
                  onChange={newDate => {
                    setSelectedDate(dayjs(newDate));
                    setIsLoadingSeats(true);
                  }}
                  inputVariant="outlined"
                  fullWidth
                  margin="normal"
                  disablePast
                  format="DD/MM/YYYY"
                  placeholder="Select a date"
                  shouldDisableDate={isWeekend}
                  defaultValue={selectedDate}
                  maxDate={maxSelectableDate}
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
                        borderColor: '#D3D3D2'
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
                  views={['month', 'year', 'day']}
                />
              </LocalizationProvider>
            </Box>
          </Grid>

          {alertMessage && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Alert severity="error">{alertMessage}</Alert>
            </Box>
          )}

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                ...boxStyle
              }}
            >
              <Box
                sx={{
                  maxWidth: '100%'
                }}
              >
                {availableSeats !== null &&
                availableSeats !== undefined &&
                availableSeats.length > 0 ? (
                  availableSeats.map((driverInfo, index) =>
                    driverInfo.availableSeats > 0 ? (
                      <Paper
                        elevation={3}
                        sx={{
                          ...boxStyle,
                          marginBottom: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          minWidth: '80%'
                        }}
                      >
                        <DriverInfoCard
                          key={index}
                          driverInfo={driverInfo}
                          handleBookRide={handleBookRide}
                        />
                      </Paper>
                    ) : (
                      <Box>
                        <Typography variant="body1" color="white">
                          No available rides for the selected date.
                        </Typography>
                      </Box>
                    )
                  )
                ) : (
                  <h1>Null</h1>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookingPage;
