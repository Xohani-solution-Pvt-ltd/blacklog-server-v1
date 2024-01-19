const mongoose = require("mongoose");

const carModel = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },

    vehicleNo: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Car = new mongoose.model("Car", carModel);
module.exports = Car;
