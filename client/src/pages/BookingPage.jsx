import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
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

const BookingPage = () => {
  const today = new Date(); // Get the present date
  const formattedTodayDate = today
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '-');

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [availableSeats, setAvailableSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const date = selectedDate.toDate();
  const formattedDate = selectedDate.format('DD-MM-YYYY');

  const presentDate = dayjs();
  const maxSelectableDate = presentDate.add(14, 'day');

  const isWeekend = date => {
    const day = dayjs(date).day();

    return day === 6 || day === 0;
  };

  useEffect(() => {
    if (formattedDate) {
      getAvailableSeats(formattedDate)
        .then(data => {
          setAvailableSeats(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [formattedDate]);

  const renderSeatIcons = count => {
    const seatIconSize = 16 / count;

    return Array.from({ length: count }, (_, index) => (
      <AirlineSeatReclineNormalIcon
        key={index}
        color="primary"
        sx={{
          fontSize: `6vh`,
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
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: '30px', minHeight: '80vh' }}>
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
            padding: '36px',
            maxWidth: '100%',
            height: '40vh'
          }}
        >
          <Box width="50%">
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
          <Box width="50%" sx={{ justifyContent: 'center' }}>
            {availableSeats > 0 && (
              <Box flexGrow={0} sx={{ justifyContent: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: '10px',
                    color: 'white',
                    ml: '25%'
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
                    maxWidth: '400px', // Adjust the maximum width as needed
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            onClick={handleBookRide}
            variant="contained"
            color="primary"
            size="large"
            disabled={availableSeats <= 0 || isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
          >
            Book Your Ride
          </Button>
        </Box>
        {availableSeats <= 0 && (
          <Box display="flex" justifyContent="center" mt={1}>
            <Typography variant="body2" color="error">
              There are no available seats for the selected date :(
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default BookingPage;
