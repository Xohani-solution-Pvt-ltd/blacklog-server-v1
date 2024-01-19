const mongoose = require("mongoose");
const EditDriver = new mongoose.Schema({
    name: {
        type: String,
        lovercase: true,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String
    },

    dateOfBirth: {
        type: String,
        required: true
    },
    licenseNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }
}, { timestamps: true });
const DriverModel = new mongoose.model("Driver", EditDriver);
module.exports = DriverModel;