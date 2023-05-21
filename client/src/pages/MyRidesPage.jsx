import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  TextField,
  Box,
  Link
} from '@mui/material';
import ModeIcon from '@mui/icons-material/Mode';
import Navbar from '../components/Navbar';

const MyRidesPage = () => {
  const [rides, setRides] = useState([
    { id: 1, week: '2023-W21', date: '2023-05-22', canceled: false },
    { id: 2, week: '2023-W21', date: '2023-05-24', canceled: false },
    { id: 3, week: '2023-W22', date: '2023-05-30', canceled: false }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCancelRide = rideId => {
    setRides(prevRides =>
      prevRides.map(ride =>
        ride.id === rideId ? { ...ride, canceled: true } : ride
      )
    );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSavePersonalDetails = () => {
    // Logic to save personal details
    // Here, we're simply logging the values for demonstration purposes
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);

    handleCloseModal();
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">My Rides</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined">
              {rides.length > 0 ? (
                <List>
                  {rides.map(ride => (
                    <ListItem key={ride.id} disablePadding>
                      <ListItemText
                        primary={`Week ${ride.week}`}
                        secondary={`Date: ${ride.date}`}
                      />
                      {!ride.canceled && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleCancelRide(ride.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No rides found</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Link href="#" onClick={handleOpenModal}>
                Modify Personal Details
                <ModeIcon sx={{ ml: 1 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Personal Details Modal */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px' // Add rounded corners
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Modify Personal Details
              <ModeIcon sx={{ ml: 1 }} />
            </Typography>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSavePersonalDetails}>
              Save
            </Button>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default MyRidesPage;
