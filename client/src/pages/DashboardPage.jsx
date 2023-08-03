import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, Link } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../components/Navbar';
import { getPassengers } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [passengers, setPassengers] = useState([]);

  const handleDateChange = async date => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);

    try {
      const retrievedPassengers = await getPassengers(formattedDate);
      if (retrievedPassengers.length === 0) {
        setPassengers([]);
      } else {
        setPassengers(retrievedPassengers);
      }
    } catch (error) {
      console.error('Here', error);
      if (error.message === 'No ride found for the date') {
        setPassengers([]);
        console.log(passengers);
      }
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
                  <Typography key={passenger._id} variant="body1" component="p">
                    {passenger.firstName} {passenger.lastName}
                    <Link
                      href={`https://wa.me/${passenger.phoneNumber}`}
                      color="inherit"
                      underline="none"
                      target="_blank"
                      m={2}
                    >
                      <WhatsAppIcon sx={{ color: '#25D366' }} />
                    </Link>{' '}
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
