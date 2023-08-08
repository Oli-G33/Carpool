import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Divider,
  useMediaQuery
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
    setIsLoadingSeats(true);
    if (formattedDate) {
      wakeApi();
      const retryInterval = 10000;
      const maxRetries = 4;
      let retryCount = 0;
  
      const fetchSeatsWithRetry = () => {
        getAvailableSeats(formattedDate)
          .then(data => {
            setAvailableSeats(data);
            if (data && data.error) {
              setAlertMessage(data.error)}
          })
          .catch(error => {
            // Retry if not exceeding max retries
            if (retryCount < maxRetries) {
              retryCount++;
              setTimeout(fetchSeatsWithRetry, retryInterval);
            } else {
              setAlertMessage('Server is loading');
            }
          })
          .finally(() => {
            setIsLoadingSeats(false);
          });
      };
  
      fetchSeatsWithRetry();
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
            margin: '0 auto'
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

        <Box
          boxShadow={'2px 2px 4px rgba(0, 0, 0, 0.2)'}
          flexGrow={0}
          p={2}
          sx={{
            display: 'flex',
            flexDirection: isMobileScreen ? 'column' : 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '80%',
            height: isMobileScreen ? '40vh' : '30vh',
            margin: '0 auto',
            marginTop: 4
          }}
        >
          <Box
            width="50%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography
              variant={isNonMobileScreens ? 'h4' : 'h5'}
              sx={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}
            >
              Select date
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
                  }
                }}
                views={['month', 'year', 'day']}
              />
            </LocalizationProvider>
          </Box>
          <Divider
            orientation={isMobileScreen ? 'horizontal' : 'vertical'}
            sx={{
              margin: '0 20px',
              backgroundColor: 'gray'
            }}
          />
          <Box
            width="50%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant={isNonMobileScreens ? 'h4' : 'h5'}
              sx={{
                marginBottom: '10px',
                color: 'white',
                textAlign: 'center'
              }}
            >
              Availability
            </Typography>

            {availableSeats && (
              <Box
                flexGrow={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    borderColor: 'primary.main',
                    borderRadius: '4px',
                    padding: '4px',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    justifyContent: 'center',
                    '@media (min-width: 768px)': {
                      width: `${availableSeats * 4}%`
                    }
                  }}
                >
                  {isLoadingSeats ? (
                    <CircularProgress size={isMobileScreen ? 48 : 36} />
                  ) : (
                    renderSeatIcons(availableSeats)
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        {alertMessage && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Alert severity="error">{alertMessage}</Alert>
          </Box>
        )}

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            sx={{ mt: 4, width: '10rem' }}
            onClick={handleBookRide}
            variant="contained"
            color="primary"
            size="large"
            disabled={availableSeats <= 0 || isLoading || !!alertMessage}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Confirm ride'}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookingPage;
