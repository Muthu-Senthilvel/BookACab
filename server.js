const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Vehicle = require('./model/schema');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Bookmytravel', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

const validators = [
    body('vehicleId').notEmpty().isLength({ min: 1, max: 10 }),
    body('bookingStartDate').notEmpty().toDate().isISO8601().custom((value, { req }) => {
        if (new Date(req.body.bookingStartDate) < new Date()) {
            throw new Error('Booking date must be in the future');
        }
        return true;
    }),
    body('bookingEndDate').notEmpty().toDate().isISO8601().custom((value, { req }) => {
        if (new Date(req.body.bookingStartDate) > new Date(value)) {
            throw new Error('Booking end date must be after the start date');
        }
        return true;
    }),
    body('firstName').notEmpty().isLength({ min: 1, max: 30 }),
    body('lastName').notEmpty().isLength({ min: 1, max: 30 })
];

//app.get('/vehicles/')


app.post('/vehicles/bookings', validators, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const vehicleToBeBooked = await Vehicle.findOne({
            id: req.body.vehicleId
        });

        if (!vehicleToBeBooked) {
            return res.status(400).json({ message: 'Vehicle not found' });
        }
        // Make sure there is no olerlapping booking
        const reqBookingStartDate = new Date(req.body.bookingStartDate);
        const reqBookingEndDate = new Date(req.body.bookingEndDate);

        vehicleToBeBooked.bookings = vehicleToBeBooked.bookings || [];

        const overlappingBookings = await vehicleToBeBooked.bookings.filter(b =>
            (reqBookingStartDate >= b.bookingStartDate && reqBookingStartDate <= b.bookingEndDate)
            || (reqBookingEndDate >= b.bookingStartDate && reqBookingEndDate <= b.bookingEndDate)
        );

        if (overlappingBookings?.length) {
            return res.status(400).json({ message: 'Booking date overlaps with another booking. Please select a different date' });
        }

        vehicleToBeBooked.bookings.push({
            vehicleId: req.body.vehicleId,
            bookingStartDate: req.body.bookingStartDate,
            bookingEndDate: req.body.bookingEndDate,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        console.log(vehicleToBeBooked);
        await Vehicle.updateOne({ _id: vehicleToBeBooked._id }, { $set: vehicleToBeBooked })
        return res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
