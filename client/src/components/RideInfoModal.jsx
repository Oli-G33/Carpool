import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

const RideInfoModal = ({ selectedRide, isModalOpen, onClose }) => {
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '400px',
          maxHeight: '80%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {selectedRide && (
          <div>
            <Typography variant="h6">Ride Details</Typography>
            <Typography>Date: {selectedRide.date}</Typography>
            <Typography>
              Driver:{' '}
              {`${selectedRide.driverFirstName} ${selectedRide.driverLastName}`}
            </Typography>
            <Typography>Pickup Time: {selectedRide.pickupTime}</Typography>
            <Typography>Location: {selectedRide.location}</Typography>
          </div>
        )}
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default RideInfoModal;
