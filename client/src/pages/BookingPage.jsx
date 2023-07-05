import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Divider
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

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [availableSeats, setAvailableSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const formattedDate = selectedDate ? selectedDate.format('DD-MM-YYYY') : null;

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
    const seatIconSize = 6;

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

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '30px', minHeight: '80vh' }}>
        <Typography
          variant="h3"
          sx={{ marginBottom: '20px', color: '#D3D3D2', textAlign: 'center' }}
        >
          Book your ride
        </Typography>
        <Box
          boxShadow={'2px 2px 4px rgba(0, 0, 0, 0.2)'}
          flexGrow={0}
          p={2}
          sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(200, 200, 200, 0.6)',
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '100%',
            height: '40vh'
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
              variant="h4"
              sx={{ marginBottom: '20px', color: 'white' }}
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
                  variant="h4"
                  sx={{
                    marginBottom: '10px',
                    color: 'white'
                  }}
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
            sx={{ mt: 4 }}
            onClick={handleBookRide}
            variant="contained"
            color="primary"
            size="large"
            disabled={availableSeats <= 0 || isLoading || !!alertMessage}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            Book Your Ride
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default BookingPage;
