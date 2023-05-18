import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';

const SuccessPage = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Box textAlign="center" py={10}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ride Booked Successfully!
          </Typography>
          <ConfettiExplosion
            particleCount={300}
            duration={5000}
            force={1}
            width={1000}
          />
          <Typography variant="body1">
            Thank you for booking your ride. We look forward to seeing you on
            the selected date.
          </Typography>
          <Box mt={4}>
            <Button
              component={Link}
              to="/booking"
              variant="contained"
              color="primary"
            >
              Book More Rides
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessPage;
