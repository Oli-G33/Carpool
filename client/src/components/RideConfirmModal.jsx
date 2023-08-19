import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Typography, TextField, Button, Box } from '@mui/material';
import { confirmRide } from '../services/weeklyRides';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers';

const RideConfirmModal = ({
  open,
  onClose,
  selectedPassenger,
  onRideConfirmed
}) => {
  const [location, setLocation] = useState('');
  const [pickupTime, setPickupTime] = useState(null);

  const rideId = selectedPassenger ? selectedPassenger._id : null;

  const handleConfirm = async () => {
    const formattedPickupTime = pickupTime.format('HH:mm');
    await confirmRide({
      location,
      pickupTime: formattedPickupTime,
      rideId
    });
    handleClose();
    onRideConfirmed();
  };

  const handleClose = () => {
    setLocation('');
    setPickupTime(null);
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
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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

        <TimePicker
          label="Pickup Time"
          value={pickupTime}
          onChange={setPickupTime}
          fullWidth
          margin="normal"
          ampm={false}
          renderInput={params => <TextField {...params} />}
          sx={{
            width: '100%'
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!location || !pickupTime}
          sx={{ marginTop: 4 }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
};

export default RideConfirmModal;
