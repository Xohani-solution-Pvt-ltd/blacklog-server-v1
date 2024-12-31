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
// const cors = require('cors');
// require('dotenv').config({ path: ".env" });
// require("../src/db/connection");
// const router = require("./router/router");
// const userRouter = require('./router/userRoute');
// const editRouter = require('./router/editRouter');
// const testRouter = require('./router/testRoute');
// const carRouter = require('./router/carRoute');
// const vehicleRoute = require('./router/vehicleRoute');
// const gyroModel = require("./models/gyro");
// const carModel = require("./models/car");
// const mqtt = require('mqtt');

// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT || 3000;
// const app = express();

// // Express Middleware
// app.use(cors({ origin: '*' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/", router);
// app.use("/api/v1/", userRouter);
// app.use("/api/v1/", editRouter);
// app.use("/api/v1/", testRouter);
// app.use("/api/v1/", carRouter);
// app.use("/api/v1", vehicleRoute);

// // MQTT Client Setup
// const mqttClient = mqtt.connect('mqtt://13.233.153.54');  // Replace with your broker address

// mqttClient.on('connect', () => {
//     console.log('Connected to MQTT Broker');
//     mqttClient.subscribe('test/topic', (err) => {  // Subscribe to all topics under `devices/gyroData`
//         if (!err) {
//             console.log('Subscribed to test/topic topic');
//         }
//     });
// });

// // Handle incoming MQTT messages
// mqttClient.on('message', async (topic, message) => {
//     try {
//         const data = JSON.parse(message.toString());  // Parse JSON data from MQTT
//         const { vehicleNo } = data;

//         // Find related car data by vehicleNo
//         const carData = await carModel.findOne({ vehicleNo });

//         // Create a new entry in gyroModel
//         const gyroPostData = new gyroModel({
//             ...data,
//             car: carData ? carData._id : null
//         });

//         await gyroPostData.save();  // Save data to MongoDB
//         console.log(`Device data from ${vehicleNo} saved successfully`);
//     } catch (error) {
//         console.error('Error processing MQTT message:', error);
//     }
// });

// // Start Express Server
// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000');
// });

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({ path: ".env" });
require("../src/db/connection");
const router = require("./router/router");
const userRouter = require('./router/userRoute');
const editRouter = require('./router/editRouter');
const testRouter = require('./router/testRoute');
const carRouter = require('./router/carRoute');
const vehicleRoute = require('./router/vehicleRoute');
const gyroModel = require("./models/gyro");
const carModel = require("./models/car");
const mqtt = require('mqtt');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;
const app = express();

// Express Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/", router);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", editRouter);
app.use("/api/v1/", testRouter);
app.use("/api/v1/", carRouter);
app.use("/api/v1", vehicleRoute);

// MQTT Client Setup for Test Topic
const mqttClientTest = mqtt.connect('mqtt://13.233.153.54'); // Broker for test/topic

mqttClientTest.on('connect', () => {
    console.log('Connected to MQTT Broker for test/topic');
    mqttClientTest.subscribe('test/topic', (err) => {
        if (!err) {
            console.log('Subscribed to test/topic');
        }
    });
});

// MQTT Client Setup for Emergency Topic
const mqttClientEmergency = mqtt.connect('mqtt://13.201.186.187'); // Replace with emergency broker IP

mqttClientEmergency.on('connect', () => {
    console.log('Connected to MQTT Broker for emergency/topic');
    mqttClientEmergency.subscribe('emergency/topic', (err) => {
        if (!err) {
            console.log('Subscribed to emergency/topic');
        }
    });
});

// Handle messages from test/topic
mqttClientTest.on('message', async (topic, message) => {
    try {
        const data = JSON.parse(message.toString()); // Parse JSON data from MQTT
        const { vehicleNo } = data;

        // Find related car data by vehicleNo
        const carData = await carModel.findOne({ vehicleNo });

        // Create a new entry in gyroModel
        const gyroPostData = new gyroModel({
            ...data,
            car: carData ? carData._id : null
        });

        await gyroPostData.save(); // Save data to MongoDB
        console.log(`Device data from ${vehicleNo} saved successfully`);
    } catch (error) {
        console.error('Error processing MQTT message from test/topic:', error);
    }
});

// Handle messages from emergency/topic
mqttClientEmergency.on('message', async (topic, message) => {
    try {
        const data = JSON.parse(message.toString()); // Parse JSON data from MQTT
        console.log('Emergency message received:', data);

        // Add your logic for emergency messages here, e.g., saving to a separate collection
    } catch (error) {
        console.error('Error processing MQTT message from emergency/topic:', error);
    }
});

// Start Express Server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});


