import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import Navbar from '../components/Navbar';
import MobileNavbar from '../components/MobileNavbar';

const SuccessPage = () => {
  const isMobileScreen = useMediaQuery('(max-width:600px)');
  return (
    <>
      {isMobileScreen ? <MobileNavbar /> : <Navbar />}
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Box textAlign="center" py={10}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                color: 'white'
              }}
            >
              Ride Booked Successfully!
            </Typography>
            <Box display="flex" justifyContent="center">
              <ConfettiExplosion
                particleCount={300}
                duration={5000}
                force={1}
                width={1500}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: 'white'
              }}
            >
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
    </>
  );
};

export default SuccessPage;
