import React from 'react';
import { Typography, Avatar, Box, useMediaQuery } from '@mui/material';

const DriverInfoCard = ({ driverInfo, handleBookRide }) => {
  const isMobileScreen = useMediaQuery('(max-width:600px)');

  const handleRequestRide = () => {
    handleBookRide();
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={`${driverInfo.driverFirstName} ${driverInfo.driverLastName}`}
          src={driverInfo.driverPicture}
          sx={{
            width: isMobileScreen ? 35 : 50,
            height: isMobileScreen ? 35 : 50,
            marginRight: 2
          }}
        />

        <Typography variant="h6" sx={{ marginRight: 2, fontSize: '12px' }}>
          {`${driverInfo.driverFirstName} ${driverInfo.driverLastName}`}
        </Typography>
      </Box>
      <Typography variant="subtitle1" sx={{ marginRight: 1, fontSize: '12px' }}>
        Seats Left: {driverInfo.availableSeats}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginRight: 2, fontSize: '12px' }}>
        Shift: {driverInfo.shift}
      </Typography>

      <button
        onClick={handleBookRide}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        Book
      </button>
    </>
  );
};

export default DriverInfoCard;
