import React, { useReducer, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Grid, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(selectedDate);
  return (
    <>
      <Navbar />
      <Box boxShadow={'2px 2px 4px rgba(0, 0, 0, 0.2)'} flexGrow={0}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box>
              <Typography>Book a ride:</Typography>

              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  value={selectedDate}
                  onChange={newDate => setSelectedDate(newDate)}
                />
              </DemoContainer>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography>Available seats:</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BookingPage;
