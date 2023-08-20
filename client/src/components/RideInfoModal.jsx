import { Box, Button, Modal, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const RideInfoModal = ({ type, selectedData, isModalOpen, onClose }) => {
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
        {selectedData && (
          <div>
            <Typography variant="h6">Ride Details</Typography>
            <hr
              sx={{
                width: '80%',
                marginTop: '16px',
                marginBottom: '16px',
                borderColor: '#ccc'
              }}
            />
            <Typography>
              Date:{' '}
              {type === 'driver'
                ? selectedData.date
                : dayjs(selectedData.date).format('DD/MM/YYYY')}
            </Typography>
            <Typography>
              {type === 'passenger' ? 'Passenger:' : 'Driver:'}{' '}
              {type === 'driver'
                ? `${selectedData.driverFirstName} ${selectedData.driverLastName}`
                : `${selectedData.firstName} ${selectedData.lastName}`}
            </Typography>
            <Typography>Pickup Time: {selectedData.pickupTime}</Typography>
            <Typography>Location: {selectedData.location}</Typography>
          </div>
        )}
        <br />
        <Button onClick={onClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default RideInfoModal;
