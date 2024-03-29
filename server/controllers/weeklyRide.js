const express = require('express');
const router = express.Router();
require('dotenv').config();
const WeeklyRide = require('../models/WeeklyRide');
const { availableSeats } = require('../data');
const User = require('../models/user');
const { ObjectId } = require('mongodb');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fs = require('fs');
const handlebars = require('handlebars');

const getSeats = async (req, res) => {
  const { date } = req.params;
  const formattedDate = date.split('-').reverse().join('-');

  try {
    const rides = await WeeklyRide.aggregate([
      {
        $match: {
          [`availableSeats.${formattedDate}`]: { $exists: true }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'driver',
          foreignField: '_id',
          as: 'driverInfo'
        }
      },
      {
        $project: {
          _id: 0,
          availableSeats: `$availableSeats.${formattedDate}`,
          shift: `$shifts.${formattedDate}`,
          driverInfo: {
            $arrayElemAt: ['$driverInfo', 0]
          }
        }
      }
    ]);

    if (rides.length === 0) {
      return res
        .status(200)
        .json({ error: `No rides found for date ${formattedDate}` });
    }

    const response = rides.map((ride) => ({
      availableSeats: ride.availableSeats,
      shift: ride.shift,
      driverFirstName: ride.driverInfo.firstName,
      driverLastName: ride.driverInfo.lastName,
      driverPicture: ride.driverInfo.picture
    }));

    console.log(response);

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res
      .status(503)
      .json({ error: 'An error occurred while fetching available seats.' });
  }
};

const bookSeat = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const formattedDate = date.split('-').reverse().join('-');

    // Check if the user has already booked a ride for the date
    const existingBooking = await WeeklyRide.findOne({
      passengers: { $elemMatch: { userId, date: formattedDate } }
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: 'You already have a booking for the selected date' });
    }

    // Find and update the WeeklyRide document for the specified date
    const ride = await WeeklyRide.findOneAndUpdate(
      { [`availableSeats.${formattedDate}`]: { $exists: true } },
      {
        $inc: { [`availableSeats.${formattedDate}`]: -1 },
        $push: {
          passengers: { userId, date: formattedDate, status: 'pending' }
        }
      },
      { new: true }
    );

    if (!ride) {
      // No ride found for the date
      return res
        .status(404)
        .json({ message: `No ride found for date ${formattedDate}` });
    }

    // Get the updated available seats count
    const availableSeats = ride.availableSeats[formattedDate];

    // Send User email notification
    const user = await User.findById(userId);
    const userEmail = user.email;
    const userName = user.firstName + ' ' + user.lastName;

    const templateSource = fs.readFileSync(
      './views/emails/rideRequestedDriver.hbs',
      'utf8'
    );
    const template = handlebars.compile(templateSource);
    const htmlContent = template({ date });

    const msg = {
      to: userEmail,
      from: process.env.CARPOOLER_EMAIL,
      subject: 'Ride requested',
      html: htmlContent
    };

    //await sgMail.send(msg);

    const driverId = ride.driver;
    const driver = await User.findById(driverId);
    const driverEmail = driver.email;
    const driverName = driver.firstName + ' ' + driver.lastName;

    const driverTemplateSource = fs.readFileSync(
      './views/emails/rideRequestedDriver.hbs',
      'utf8'
    );
    const driverTemplate = handlebars.compile(driverTemplateSource);
    const driverHtmlContent = driverTemplate({ date, userName, driverName });
    console.log(`User Name:${userName}`, `Driver Name:${driverName}`);

    const driverMsg = {
      to: driverEmail,
      from: process.env.CARPOOLER_EMAIL,
      subject: 'Passenger booked a seat',
      html: driverHtmlContent
    };

    await sgMail.send(driverMsg);

    // Return the updated available seats count
    res.json({ availableSeats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchPassengers = async (req, res) => {
  try {
    const { date } = req.params;
    const desiredDate = new Date(date);

    // Query the WeeklyRide collection for a specific date's passengers
    const ride = await WeeklyRide.findOne(
      { 'passengers.date': desiredDate },
      'passengers'
    ).populate({
      path: 'passengers.userId', // Specify the path to populate
      select: 'firstName lastName phoneNumber email picture' // Select the fields you want to populate
    });

    if (!ride || !ride.passengers || ride.passengers.length === 0) {
      // Handle case where no ride with passengers for the desired date is found
      return res.json([]); // Respond with an empty array
    }

    // Filter passengers based on the desired date and status
    const passengersWithRideOnDate = ride.passengers.filter(
      (passenger) =>
        passenger.date.getTime() === desiredDate.getTime() &&
        passenger.status === 'confirmed'
    );

    const passengerDataToSend = passengersWithRideOnDate.map((passenger) => ({
      userId: passenger.userId._id,
      _id: passenger._id,
      firstName: passenger.userId.firstName,
      lastName: passenger.userId.lastName,
      phoneNumber: passenger.userId.phoneNumber,
      email: passenger.userId.email,
      picture: passenger.userId.picture,
      location: passenger.location,
      pickupTime: passenger.pickupTime,
      date: passenger.date
    }));

    res.json(passengerDataToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchMyRides = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the WeeklyRide collection for rides where the user is a passenger
    const rides = await WeeklyRide.find({
      'passengers.userId': userId
    }).populate('driver', 'phoneNumber picture firstName lastName'); // Populate driver's data with phoneNumber and picture fields

    // Extract the dates, passenger IDs, driver's phone number, and driver's picture where the user is a passenger
    const passengerData = rides.reduce((result, ride) => {
      const passengerDates = ride.passengers
        .filter((passenger) => passenger.userId.toString() === userId)
        .map((passenger) => ({
          date: passenger.date,
          passengerId: passenger._id,
          driverPhoneNumber: ride.driver.phoneNumber,
          driverPicture: ride.driver.picture,
          driverFirstName: ride.driver.firstName,
          driverLastName: ride.driver.lastName,
          status: passenger.status,
          location: passenger.location,
          pickupTime: passenger.pickupTime
        }));
      return [...result, ...passengerDates];
    }, []);

    res.json(passengerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cancelMyRide = async (req, res) => {
  try {
    const { passengerId: _id, formattedDate } = req.body;

    // Find the ride in the database using the passengerId
    const ride = await WeeklyRide.findOne({
      'passengers._id': new ObjectId(_id)
    });

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found1' });
    }

    // Find the passenger index in the ride's passengers array
    const passengerIndex = ride.passengers.findIndex(
      (passenger) => passenger._id.toString() === _id
    );

    if (passengerIndex === -1) {
      return res
        .status(404)
        .json({ message: 'Passenger not found in the ride' });
    }

    // Remove the passenger from the ride's passengers array
    ride.passengers.splice(passengerIndex, 1);

    const query = {};
    query[`availableSeats.${formattedDate}`] = { $exists: true };

    const update = {};
    update[`availableSeats.${formattedDate}`] = 1;

    const updatedRide = await ride.save();

    if (!updatedRide) {
      return res.status(404).json({ message: 'Ride not found2' });
    }

    // Update the available seats
    await WeeklyRide.findOneAndUpdate(query, { $inc: update }, { new: true });

    res.json({ message: 'Ride canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getPendingPassengers = async (req, res) => {
  const { id } = req.params;

  try {
    const pendingPassengers = await WeeklyRide.find({
      driver: id,
      'passengers.status': 'pending'
    })
      .select('passengers')
      .populate(
        'passengers.userId',
        'firstName lastName picture phoneNumber email'
      );

    const formattedPendingPassengers = pendingPassengers.map((ride) =>
      ride.passengers
        .filter((passenger) => passenger.status === 'pending')
        .map((passenger) => ({
          userId: passenger.userId,
          _id: passenger._id,
          date: passenger.date,
          status: passenger.status,
          location: passenger.location,
          pickupTime: passenger.pickupTime
        }))
    );

    res.json(formattedPendingPassengers.flat());
  } catch (error) {
    console.error('Error fetching pending passengers:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching pending passengers.' });
  }
};

const confirmRide = async (req, res) => {
  const { location, pickupTime, rideId } = req.body;

  try {
    const updatedRide = await WeeklyRide.findOneAndUpdate(
      {
        'passengers._id': rideId
      },
      {
        $set: {
          'passengers.$.status': 'confirmed',
          'passengers.$.location': location,
          'passengers.$.pickupTime': pickupTime
        }
      },
      { new: true }
    );

    if (!updatedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const passenger = updatedRide.passengers.find(
      (passenger) => passenger._id.toString() === rideId
    );

    if (passenger && passenger.userId) {
      const passengerUser = await User.findById(passenger.userId);

      if (passengerUser && passengerUser.email) {
        // Fetch driver's name and ride date from the WeeklyRide document
        const driverId = updatedRide.driver;
        const driver = await User.findById(driverId);
        const driverFirstName = driver.firstName;
        const driverLastName = driver.lastName;
        const rideDate = passenger.date;

        function formatDateToDDMMYYYY(date) {
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
          const year = date.getFullYear();

          return `${day}/${month}/${year}`;
        }

        const formattedDate = formatDateToDDMMYYYY(rideDate);

        const templatePath = './views/emails/bookingConfirmation.hbs';
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const compiledTemplate = handlebars.compile(templateContent);

        const emailContent = compiledTemplate({
          location,
          pickupTime,
          driverName: `${driverFirstName} ${driverLastName}`,
          rideDate: formattedDate
        });

        const msg = {
          to: passengerUser.email,
          from: process.env.CARPOOLER_EMAIL,
          subject: 'Ride Confirmation 🚗',
          html: emailContent
        };

        await sgMail.send(msg);
      }
    }

    res.json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSeats,
  bookSeat,
  fetchPassengers,
  fetchMyRides,
  cancelMyRide,
  getPendingPassengers,
  confirmRide
};
