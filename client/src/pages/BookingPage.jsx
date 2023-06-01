import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography
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
  console.log(formattedTodayDate);
  const [selectedDate, setSelectedDate] = useState(dayjs(formattedTodayDate));

  const [availableSeats, setAvailableSeats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);

  const date = selectedDate.toDate();
  const formattedDate = selectedDate.format('DD-MM-YYYY');
  // const formattedDate = date
  //   .toLocaleDateString('en-GB', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric'
  //   })
  //   .replace(/\//g, '-');

  console.log(formattedDate); // Output: 25-05-2023

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
          console.log(data);
          setAvailableSeats(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [formattedDate]);

  const renderSeatIcons = count => {
    return Array.from({ length: count }, (_, index) => (
      <AirlineSeatReclineNormalIcon
        key={index}
        color="primary"
        sx={{ fontSize: 48 }}
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
      <Container sx={{ marginTop: '50px', minHeight: '80vh' }}>
        <Box boxShadow={'2px 2px 4px rgba(0, 0, 0, 0.2)'} flexGrow={0} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                  Select a date:
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
            </Grid>
            <Grid item xs={12} sm={6}>
              {availableSeats > 0 && (
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    Available Seats:
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: '4px',
                      padding: '4px',
                      maxWidth: '34%',
                      margin: '0 auto'
                    }}
                  >
                    {renderSeatIcons(availableSeats)}
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BookingPage;
