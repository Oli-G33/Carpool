import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Container,
  Button,
  Box
} from '@mui/material';
import { startOfWeek, addDays, format, getISOWeek, getYear } from 'date-fns';

const WeeklyRideForm = driverId => {
  const getCurrentYear = () => {
    const currentDate = new Date();
    return getYear(currentDate);
  };

  const getCurrentWeek = () => {
    const currentDate = new Date();
    return getISOWeek(currentDate);
  };
  const [selectedWeek, setSelectedWeek] = useState(
    `${getCurrentYear()}-W${getCurrentWeek()}`
  );
  const [businessDays, setBusinessDays] = useState([]);
  const [formData, setFormData] = useState(
    new Array(5).fill({
      date: '',
      availableSeats: 4,
      shift: ''
    })
  );

  useEffect(() => {
    const initialFormData = new Array(5).fill({
      date: '',
      availableSeats: 4,
      shift: ''
    });
    setFormData(initialFormData);
  }, []);

  const handleWeekChange = newWeek => {
    setSelectedWeek(newWeek);

    const [year, week] = newWeek.split('-W');

    const startDate = startOfWeek(new Date(year, 0, 1), { weekStartsOn: 1 });
    const businessDays = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = addDays(startDate, (week - 1) * 7 + i);
      businessDays.push(format(currentDate, 'yyyy-MM-dd'));
    }
    setBusinessDays(businessDays);

    const updatedFormData = businessDays.map(date => ({
      date,
      availableSeats: formData[date]?.availableSeats || 4,
      shift: formData[date]?.shift || ''
    }));
    setFormData(updatedFormData);
  };

  const handleInputChange = (event, index, field) => {
    const { value } = event.target;

    const updatedFormData = [...formData];

    if (field === 'date') {
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value
      };
    } else {
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value
      };
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Handle form submission here, e.g., send formData to server
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(200, 200, 200, 0.6)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          height: '90vh',
          textAlign: 'center',
          margin: '0 auto'
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            type="week"
            label="Select a Week"
            value={selectedWeek}
            onChange={event => handleWeekChange(event.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
              style: { color: 'white' }
            }}
            inputProps={{
              min: `${getCurrentYear()}-W${getCurrentWeek()}`,
              style: { color: 'white' }
            }}
            sx={{
              marginBottom: '16px',

              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D3D3D2'
              },
              '& .MuiInputLabel-root': {
                color: 'white'
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'white'
                },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'white'
                }
            }}
          />
          {businessDays.map((day, index) => (
            <Grid container spacing={2} key={day}>
              <Grid item xs={4} style={{ marginBottom: '16px' }}>
                <TextField
                  label="Date"
                  value={formData[index].date || day}
                  fullWidth
                  disabled
                  onChange={event => handleInputChange(event, index, 'date')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="number"
                  label="Available Seats"
                  value={formData[index].availableSeats || 4}
                  onChange={event =>
                    handleInputChange(event, index, 'availableSeats')
                  }
                  fullWidth
                  inputProps={{ min: 0, max: 4 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  label="Shift"
                  value={formData[index]?.shift || ''}
                  onChange={event => handleInputChange(event, index, 'shift')}
                  fullWidth
                >
                  <MenuItem value="E1">E1</MenuItem>
                  <MenuItem value="E2">E2</MenuItem>
                  <MenuItem value="L1">L1</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Upload WeeklyRides
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default WeeklyRideForm;
