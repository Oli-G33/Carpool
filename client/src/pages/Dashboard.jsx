import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState('');

  const handleWeekSelect = e => {
    setSelectedWeek(e.target.value);
  };

  const handleViewPassengers = () => {
    // Logic to fetch and display passengers for the selected week
    // You can use the selectedWeek value to make API requests or retrieve data
    // Here, we're assuming a static set of passengers for demonstration purposes
    const passengersData = [
      { date: '2023-05-22', passengers: ['Passenger 1', 'Passenger 2'] },
      {
        date: '2023-05-23',
        passengers: ['Passenger 3', 'Passenger 4', 'Passenger 5']
      }
      // Add more data for other days
    ];

    // Render the passengers list based on the selected week
    return (
      <List>
        {passengersData.map(data => (
          <ListItem key={data.date}>
            <ListItemText
              primary={data.date}
              secondary={data.passengers.join(', ')}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <Navbar />
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <TextField
                    label="Select Week"
                    type="week"
                    value={selectedWeek}
                    onChange={handleWeekSelect}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {selectedWeek && (
              <Paper variant="outlined">
                <Typography variant="h5">
                  Passengers for Week: {selectedWeek}
                </Typography>
                {handleViewPassengers()}
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
