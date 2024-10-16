// const express = require("express");
// const cookieParser = require('cookie-parser');
// require('dotenv').config({ path: ".env" });
// require("../src/db/connection");
// const router = require("./router/router");
// const userRouter = require('./router/userRoute');
// const editRouter = require('./router/editRouter');
// const testRouter = require('./router/testRoute');
// const carRouter = require('./router/carRoute');
// const vehicleRoute = require('./router/vehicleRoute');

// var cors = require('cors')

// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT || 3000;
// const app = express();

// app.use(cors({ origin: '*' }))
// app.use(express.json());
// app.use("/api/v1/", router);
// app.use("/api/v1/", userRouter);
// app.use("/api/v1/", editRouter);
// app.use("/api/v1/", testRouter);
// app.use("/api/v1/", carRouter);
// app.use("/api/v1", vehicleRoute);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());


// // app.listen(port, () => {
// //     console.log(`connection is live at host and port :${hostname}:${port}`);
// // })

// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000');
// });


// const express = require("express");
// const cookieParser = require('cookie-parser');
// require('dotenv').config({ path: ".env" });
// require("../src/db/connection");
// const router = require("./router/router");
// const userRouter = require('./router/userRoute');
// const editRouter = require('./router/editRouter');
// const testRouter = require('./router/testRoute');
// const carRouter = require('./router/carRoute');
// const vehicleRoute = require('./router/vehicleRoute');
// const cors = require('cors');

// // MQTT Setup
// const mqtt = require('mqtt');
// const mqttClient = mqtt.connect('mqtt://test.mosquitto.org'); // Or use your actual broker's URL

// // Define MQTT connection and handling
// mqttClient.on('connect', () => {
//     console.log('Connected to MQTT broker');

//     // Subscribe to a topic
//     mqttClient.subscribe('abc', (err) => {
//         if (!err) {
//             console.log('Subscribed to the topic');
//         }
//     });
// });

// // Handle MQTT messages
// mqttClient.on('message', async (topic, message) => {
//     console.log(`Received message from ${topic}: ${message.toString()}`);

//     // Parse the message (assuming it's JSON)
//     let parsedMessage;
//     try {
//         parsedMessage = JSON.parse(message);
//     } catch (error) {
//         console.error('Failed to parse MQTT message', error);
//         return;
//     }

//     // Example logic to save the data into MongoDB
//     const { vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature } = parsedMessage;

//     try {
//         const carData = await carModel.findOne({ vehicleNo });

//         const gyroPostData = new gyroModel({
//             vehicleNo, GPSfix, Date, Time, Latitude, LatitudeDirection, Longitude, LongitudeDirection, Speed, Heading, NoOfSatellites, Altitude, PDOP, HDOP, NetworkOperatorName, Ignition, MainPowerStatus, MainInputVoltage, EmergencyStatus, GSMSignalStrength, MCC, MNC, LAC, CellId, NMR, DigitalInputStatus, DigitalOutputStatus, acceloX, acceloY, acceloZ, gyroX, gyroY, gyroZ, temperature,
//             car: carData ? carData._id : null
//         });

//         await gyroPostData.save();
//         console.log("Gyro data saved successfully.");
//     } catch (error) {
//         console.error('Error saving gyro data from MQTT message:', error);
//     }
// });

// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT || 3000;
// const app = express();

// app.use(cors({ origin: '*' }));
// app.use(express.json());
// app.use("/api/v1/", router);
// app.use("/api/v1/", userRouter);
// app.use("/api/v1/", editRouter);
// app.use("/api/v1/", testRouter);
// app.use("/api/v1/", carRouter);
// app.use("/api/v1", vehicleRoute);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000');
// });

const express = require("express");
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: ".env" });
require("../src/db/connection");
const router = require("./router/router");
const userRouter = require('./router/userRoute');
const editRouter = require('./router/editRouter');
const testRouter = require('./router/testRoute');
const carRouter = require('./router/carRoute');
const vehicleRoute = require('./router/vehicleRoute');
var cors = require('cors');

// MQTT Setup
// const mqtt = require('mqtt');
// const mqttClient = mqtt.connect('mqtt://52.66.172.170:1883'); // Use your broker's URL

// mqttClient.on('connect', () => {
//     console.log('Connected to MQTT broker');

//     // Subscribe to a topic
//     mqttClient.subscribe('vehicles/data', (err) => {
//         if (!err) {
//             console.log('Subscribed to the topic');
//         }
//     });
// });

// // Handle MQTT messages
// mqttClient.on('message', (topic, message) => {
//     console.log(`Received message from ${topic}: ${message.toString()}`);
//     // You can trigger any logic here like saving to MongoDB, etc.
// });

// Import the required libraries
const mqtt = require('mqtt');

// MQTT broker address (replace with your broker's IP address)
const brokerUrl = 'mqtt://52.66.172.170:1883';

// Create an MQTT client
const mqttClient = mqtt.connect(brokerUrl);

// Define the topic to subscribe to
const topic = 'your/topic/here'; // Replace with your topic

// Handle the connection event
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to the topic
    mqttClient.subscribe(topic, (err) => {
        if (err) {
            console.error(`Failed to subscribe to topic "${topic}":`, err);
        } else {
            console.log(`Subscribed to topic "${topic}"`);
        }
    });

    // Publish a message to the topic
    const message = 'Hello, MQTT!';
    mqttClient.publish(topic, message, (err) => {
        if (err) {
            console.error(`Failed to publish message:`, err);
        } else {
            console.log(`Message "${message}" published to topic "${topic}"`);
        }
    });
});

// Handle incoming messages
mqttClient.on('message', (topic, message) => {
    // message is a Buffer, convert it to string
    console.log(`Received message from topic "${topic}": ${message.toString()}`);
});

// Handle errors
mqttClient.on('error', (error) => {
    console.error('MQTT Error:', error);
});

// Handle the close event
mqttClient.on('close', () => {
    console.log('Connection to MQTT broker closed');
});


const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use("/api/v1/", router);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", editRouter);
app.use("/api/v1/", testRouter);
app.use("/api/v1/", carRouter);
app.use("/api/v1", vehicleRoute);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Listening to port
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});


