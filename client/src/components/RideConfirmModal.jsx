import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Typography, TextField, Button, Box } from '@mui/material';
import { confirmRide } from '../services/weeklyRides';
import dayjs from 'dayjs';

const RideConfirmModal = ({
  open,
  onClose,
  selectedPassenger,
  onRideConfirmed
}) => {
  const [location, setLocation] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const rideId = selectedPassenger ? selectedPassenger._id : null;

  const handleConfirm = async () => {
    await confirmRide({ location, pickupTime, rideId });
    onClose();
    onRideConfirmed();
  };

  const handleClose = () => {
    setLocation('');
    setPickupTime('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: '300px',
          outline: 'none',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Ride for {selectedPassenger?.userId.firstName}{' '}
          {selectedPassenger?.userId.lastName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Date: {dayjs(selectedPassenger?.date).format('DD/MM/YYYY')}
        </Typography>
        <TextField
          label="Pickup Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Pickup Time"
          value={pickupTime}
          onChange={e => setPickupTime(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!location || !pickupTime}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default RideConfirmModal;
