const mongoose = require('mongoose');
const Vehicle = require('./model/schema');

mongoose.connect('mongodb://127.0.0.1:27017/Bookmytravel', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
});

const allVehicles = [
    {
        model: 'Hyundai Verna',
        id: 1,
        wheels: 4,
        type: 'sedan',
        image: 'Hyundai-Verna.png'
    },
    {
        model: 'Skoda Rapid',
        id: 2,
        wheels: 4,
        type: 'sedan',
        image: 'Skoda-Rapid.png'
    },
    {
        model: 'Honda breeze',
        id: 3,
        wheels: 4,
        type: 'hatchback',
        image: 'Honda-breeze.png'
    },
    {
        model: 'volkswogen polo',
        id: 4,
        wheels: 4,
        type: 'hatchback',
        image: 'volkswogen-polo.png'
    },
    {
        model: 'Mahindra Thar',
        id: 5,
        wheels: 4,
        type: 'xuv',
        image: 'Mahindra-Thar.png'
    },
    {
        model: 'Hyundai Creta',
        id: 6,
        wheels: 4,
        type: 'xuv',
        image: 'Hyundai-Creta.png'
    },
    {
        model: 'Toyota Urban Cruiser Hyryder',
        id: 7,
        wheels: 4,
        type: 'xuv',
        image: 'Toyota-Urban Cruiser Hyryder.png'
    },
    {
        model: 'Mahindra XUV700',
        id: 8,
        wheels: 4,
        type: 'xuv',
        image: 'Mahindra-XUV700.png'
    },
    {
        model: 'Jawa 42 Bobber',
        id: 9,
        wheels: 2,
        type: 'cruiser',
        image: 'Jawa-42 Bobber.png'
    },
    {
        model: 'Royal Enfield Hunter 350',
        id: 10,
        wheels: 2,
        type: 'cruiser',
        image: 'Royal Enfield-Hunter 350.png'
    },
    {
        model: 'Yamaha R15 V4',
        id: 11,
        wheels: 2,
        type: 'sports',
        image: 'Yamaha-R15 V4.png'
    },
    {
        model: 'Suzuki Gixxer',
        id: 12,
        wheels: 2,
        type: 'sports',
        image: 'Suzuki-Gixxer.png'
    },
    {
        model: 'Bharat Benz',
        id: 13,
        wheels: 6,
        type: 'truck',
        image: 'Bharat-Benz.png'
    },
    {
        model: 'Tata',
        id: 14,
        wheels: 6,
        type: 'truck',
        image: 'Tata.png'
    },
    {
        model: 'Ashok Leyland',
        id: 15,
        wheels: 6,
        type: 'truck',
        image: 'Leyand.png'
    },
]

Vehicle.insertMany(allVehicles)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

