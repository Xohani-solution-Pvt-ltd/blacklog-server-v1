const mongoose = require("mongoose");

const gyroSchema = new mongoose.Schema({

    vehicleNo: {
        type: String
    },
    GPSfix: {
        type: String
    },
    Date: {
        type: String
    },
    Time: {
        type: String
    },
    Latitude: {
        type: String
    },
    LatitudeDirection: {
        type: String
    },
    Longitude: {
        type: String
    },
    LongitudeDirection: {
        type: String
    },
    Speed: {
        type: String
    },
    Heading: {
        type: String
    },
    NoOfSatellites: {
        type: String
    },
    Altitude: {
        type: String
    },
    PDOP: {
        type: String
    },
    HDOP: {
        type: String
    },
    NetworkOperatorName: {
        type: String
    },
    Ignition: {
        type: String
    },
    MainPowerStatus: {
        type: String
    },
    MainInputVoltage: {
        type: String
    },
    EmergencyStatus: {
        type: String
    },
    GSMSignalStrength: {
        type: String
    },
    MCC: {
        type: String
    },
    MNC: {
        type: String
    },
    LAC: {
        type: String
    },
    CellId: {
        type: String
    },
    NMR: {
        type: String
    },
    DigitalInputStatus: {
        type: String
    },
    DigitalOutputStatus: {
        type: String
    },
    acceloX: {
        type: String
    },
    acceloY: {
        type: String
    },
    acceloZ: {
        type: String
    },
    gyroX: {
        type: String
    },
    gyroY: {
        type: String
    },
    gyroZ: {
        type: String
    },
    temperature: {
        type: String
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }
});

const gyro = new mongoose.model("Gyro", gyroSchema);

module.exports = gyro;




