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

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
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
      wakeApi();
      getAvailableSeats(formattedDate)
        .then(data => {
          setAvailableSeats(data);
          console.log(data);
          if (data && data.error) {
            setAlertMessage(data.error);
          } else {
            setAlertMessage('');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [formattedDate]);

  const renderSeatIcons = count => {
    const seatIconSize = isNonMobileScreens ? 6 : 4;

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

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '30px', minHeight: '70vh' }}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '82%',
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
            alignItems: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '80%',
            height: '30vh',
            margin: '0 auto',
            marginTop: 4
          }}
        >
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
              sx={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}
            >
              Select a date
            </Typography>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DatePicker
                value={selectedDate}
                onChange={newDate => setSelectedDate(dayjs(newDate))}
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
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
          <Divider orientation="vertical" sx={{ margin: '0 20px' }} />
          <Box
            width="50%"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {availableSeats && (
              <Box
                flexGrow={0}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography
             variant={isNonMobileScreens ? 'h4' : 'h5'}
             sx={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}
                >
                  Available Seats
                </Typography>
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
                  {renderSeatIcons(availableSeats)}
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
