import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../components/Navbar';
import { getPassengers } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [passengers, setPassengers] = useState([]);

  const handleDateChange = async date => {
    console.log(date);
    const formattedDate = dayjs(date.$d).format('YYYY-MM-DD');
    // const selectedDate = new Date(formattedDate);
    setSelectedDate(formattedDate);

    try {
      const retrievedPassengers = await getPassengers(formattedDate);
      setPassengers(retrievedPassengers);
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the API call
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              color="#D3D3D2"
            >
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" mb={2}>
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
                />
              </LocalizationProvider>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" mb={2}>
                Passengers for {selectedDate}
              </Typography>
              {passengers.length > 0 ? (
                passengers.map(passenger => (
                  <Typography key={passenger.id} variant="body1" component="p">
                    {passenger.firstName} {passenger.lastName}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" component="p">
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
