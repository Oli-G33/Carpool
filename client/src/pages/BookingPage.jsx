import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAvailableSeats } from '../services/weeklyRides';
import dayjs from 'dayjs';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSeats, setAvailableSeats] = useState(null);

  const date = new Date(selectedDate.$d);
  const formattedDate = date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    .replace(/\//g, '-');

  console.log(formattedDate); // Output: 25-05-2023

  const presentDate = dayjs();
  const maxSelectableDate = presentDate.add(14, 'day');

  const isWeekend = date => {
    const day = date.day();

    return day === 6 || day === 0;
  };

  useEffect(() => {
    if (formattedDate) {
      getAvailableSeats()
        .then(data => {
          console.log(data);
          setAvailableSeats(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [formattedDate]);

  return (
    <>
      <Navbar />
      <Container>
        <Box boxShadow={'2px 2px 4px rgba(0, 0, 0, 0.2)'} flexGrow={0} p={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h5">Select a date:</Typography>
                <LocalizationProvider>
                  <DatePicker
                    value={selectedDate}
                    onChange={newDate => setSelectedDate(newDate)}
                    inputVariant="outlined"
                    fullWidth
                    margin="normal"
                    disablePast
                    format="DD/MM/YYYY"
                    placeholder="Select a date"
                    maxDate={maxSelectableDate}
                    shouldDisableDate={isWeekend}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h5">Available Seats:</Typography>
                {availableSeats && (
                  <Typography>{`Available seats: ${availableSeats}`}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" size="large">
                  Book Your Ride
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default BookingPage;
