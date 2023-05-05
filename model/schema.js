const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    vehicleId: Number,
    bookingStartDate: Date,
    bookingEndDate: Date,
    firstName: String,
    lastName: String
});

const vehicleSchema = new Schema({
    wheels: { type: Number, enum: [2, 4, 6] },
    type: { type: String, enum: ["sedan", "xuv", "hatchback", "cruiser", "sports", "truck"] },
    model: String,
    image: String,
    id: Number,
    bookings: {
        type: [bookingSchema],
        required: false,
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
