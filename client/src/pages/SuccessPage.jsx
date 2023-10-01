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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              backgroundColor: 'rgba(200, 200, 200, 0.6)',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}
          >
            <Box textAlign="center" py={10}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  color: 'white'
                }}
              >
                Ride Requested!
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
                Your ride has been requested! The driver will confirm the ride
                details by email as soon as possible.
              </Typography>
        
              <Box mt={4}>
                <Button
                  component={Link}
                  to="/booking"
                  variant="contained"
                  color="primary"
                >
                  Find More Rides
                </Button>
                <br/>
                <br/>
                <Typography
                variant="body1"
                sx={{
                  color: 'white'
                }}
              >
               !!! Please be at your meeting point 3 minutes before the designated pickup time !!!
              </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SuccessPage;
