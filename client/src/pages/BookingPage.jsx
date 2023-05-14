import React, { useReducer, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { deDE } from '@mui/x-date-pickers/locales';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const maxSelectableDate = new Date();
maxSelectableDate.setDate(maxSelectableDate.getDate() + 7);

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
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
                    startOfWeek={0}
                    maxDate="14"
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h5">Available Seats:</Typography>
                {/* Here you can display the available seats for the selected date */}
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
