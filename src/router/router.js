const router = require("express").Router();
const gyroModel = require("../models/gyro");
const carModel = require("../models/car");

//POST REQ
router.post("/addGyro", async (req, res) => {
    // try {
    //     const { vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature } = req.body;

    //     const carData = await carModel.findOne({ vehicleNo });

    //     const gyroPostData = new gyroModel({
    //         vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature,
    //         car: carData ? carData._id : null
    //     });

    //     await gyroPostData.save().then(() => {
    //         res.status(200).json({ message: "GyroData Added Successfully" });
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
    mqttClient.on('message', async (topic, message) => {
        console.log(`Received message from ${topic}: ${message.toString()}`);

        // Parse the message (assuming it's JSON)
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.error('Failed to parse MQTT message', error);
            return;
        }

        // Assuming parsedMessage contains vehicleNo and other gyro data
        const { vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature } = parsedMessage;

        try {
            const carData = await carModel.findOne({ vehicleNo });

            const gyroPostData = new gyroModel({
                vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature,
                car: carData ? carData._id : null
            });

            await gyroPostData.save();
            console.log("Gyro data saved successfully.");
        } catch (error) {
            console.error('Error saving gyro data from MQTT message:', error);
        }
    });

})

// GET REQ
router.get("/fetchGyro", async (req, res) => {
    try {
        const data = await gyroModel.find();
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
    }
})


//GET REQ WITH ID
router.get("/fetchGyro/id", async (req, res) => {
    let data;
    const id = req.query.id;
    try {
        data = await gyroModel.findById(id);
        res.status(200).json({ data });

    } catch (error) {
        console.log(error);
    }
})

//UPDATE BOOK BY ID
router.patch("/updateGyro/id", async (req, res) => {
    const id = req.query.id;
    let data;
    try {
        data = await gyroModel.findByIdAndUpdate(id, req.body);
        await data.save()
            .then(() =>
                res.json({ message: "Data Updated Successfully" }))

    } catch (error) {
        console.log(error);
    }
})

// DELETE BOOK BY ID 
router.delete("/deleteGyro/id", async (req, res) => {
    const id = req.query.id;
    try {
        const data = await gyroModel.findByIdAndDelete(id)
            .then(() => res.status(201).json({ message: "Data Deleted Successfully" }))
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

