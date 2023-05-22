import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [passengers, setPassengers] = useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
    // Call an API or perform a database query to get the passengers for the selected date
    // Update the 'passengers' state with the retrieved data
    // setPassengers([...]);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" align="center">
              Dashboard
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" mb={2}>
                Select a Date
              </Typography>
              <DatePicker
                label="Choose a date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={props => <TextField {...props} />}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" mb={2}>
                Passengers for {selectedDate ? selectedDate.toDateString() : ''}
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
