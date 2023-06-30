import React from 'react';
import { Box, Typography } from '@mui/material';

const TermsPage = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2, color: '#D3D3D2' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Terms and Conditions for Carpooling
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Thank you for choosing to use our carpooling app for your daily commute.
        Before you start using our service, please read these terms and
        conditions carefully. By using our service, you agree to be bound by
        these terms and conditions.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        1. Meeting Point and Time
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        1.1 The meeting point and time for each carpool ride will be agreed upon
        by the driver and the passengers before the ride.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        1.2 Passengers are expected to arrive at the meeting point a few minutes
        prior to the agreed time. The driver will wait for a maximum of five
        minutes after the agreed time. If the passenger does not arrive within
        this time frame, the driver has the right to leave without them.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        2. Booking Rides
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        2.1 Rides must be booked at least 8 hours in advance.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        3. Cancellations
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        3.1 Passengers can cancel a ride up to two hours before the agreed
        meeting time without any penalty.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        4. Conduct During the Ride
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        4.1 Passengers are expected to behave in a respectful and courteous
        manner towards the driver and other passengers during the ride.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        4.2 Passengers must not smoke, consume alcohol or drugs, or engage in
        any other illegal or dangerous activity during the ride.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        4.3 Passengers must not leave garbage or any other belongings in the car
        after the ride.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        4.4 Passengers must wear seat belts during the ride.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        5. Liability
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        5.1 The carpooling app is not liable for any damage, loss, or injury
        that occurs during the ride.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        5.2 Drivers and passengers are responsible for their own safety during
        the ride.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        5.3 The carpooling app is not liable for any damage or loss that occurs
        to the driver's or passenger's car during the ride.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        5.4 The carpooling app is not liable for any damage, loss, or injury
        that occurs due to the actions or behavior of a driver or passenger.
      </Typography>
      <hr />
      <Typography variant="h5" sx={{ mb: 2 }}>
        6. Changes to the Terms and Conditions
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        6.1 The carpooling app reserves the right to change these terms and
        conditions at any time without prior notice.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        6.2 Any changes to the terms and conditions will be posted on the app
        and will be effective immediately upon posting.
      </Typography>
      <hr />
      <Typography variant="h6" sx={{ mb: 2, mt: 2, fontStyle: 'italic' }}>
        By using our carpooling app, you agree to comply with these terms and
        conditions. If you do not agree with these terms and conditions, please
        do not use our service.
      </Typography>
    </Box>
  );
};

export default TermsPage;
