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

// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000');
// });

// mqtt code start ----->

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

// // MQTT Client Setup for Test Topic
// const mqttClientTest = mqtt.connect('mqtt://13.233.153.54'); // Broker for test/topic

// mqttClientTest.on('connect', () => {
//     console.log('Connected to MQTT Broker for test/topic');
//     mqttClientTest.subscribe('test/topic', (err) => {
//         if (!err) {
//             console.log('Subscribed to test/topic');
//         }
//     });
// });

// // MQTT Client Setup for Emergency Topic
// const mqttClientEmergency = mqtt.connect('mqtt://13.201.186.187'); // Replace with emergency broker IP

// mqttClientEmergency.on('connect', () => {
//     console.log('Connected to MQTT Broker for emergency/topic');
//     mqttClientEmergency.subscribe('emergency/topic', (err) => {
//         if (!err) {
//             console.log('Subscribed to emergency/topic');
//         }
//     });
// });

// // Handle messages from test/topic
// mqttClientTest.on('message', async (topic, message) => {
//     try {
//         const data = JSON.parse(message.toString()); // Parse JSON data from MQTT
//         const { vehicleNo } = data;

//         // Find related car data by vehicleNo
//         const carData = await carModel.findOne({ vehicleNo });

//         // Create a new entry in gyroModel
//         const gyroPostData = new gyroModel({
//             ...data,
//             car: carData ? carData._id : null
//         });

//         await gyroPostData.save(); // Save data to MongoDB
//         console.log(`Device data from ${vehicleNo} saved successfully`);
//     } catch (error) {
//         console.error('Error processing MQTT message from test/topic:', error);
//     }
// });

// // Handle messages from emergency/topic
// mqttClientEmergency.on('message', async (topic, message) => {
//     try {
//         const data = JSON.parse(message.toString()); // Parse JSON data from MQTT
//         console.log('Emergency message received:', data);

//         // Add your logic for emergency messages here, e.g., saving to a separate collection
//     } catch (error) {
//         console.error('Error processing MQTT message from emergency/topic:', error);
//     }
// });

// // Start Express Server
// app.listen(3000, '0.0.0.0', () => {
//     console.log('Server running on port 3000');
// });

// mqtt code end ----->

// web socket code start ----->
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
// const WebSocket = require('ws');

// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT || 3000;
// const app = express();

// app.use(cors({ origin: '*' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// app.use("/api/v1/", router);
// app.use("/api/v1/", userRouter);
// app.use("/api/v1/", editRouter);
// app.use("/api/v1/", testRouter);
// app.use("/api/v1/", carRouter);
// app.use("/api/v1", vehicleRoute);

// // Create HTTP server
// const server = app.listen(3000, '0.0.0.0', () => {
//     console.log(`Server running on port ${3000}`);
// });

// // const socket = new WebSocket('ws://3.110.10.75:443');
// const socket = new WebSocket('ws://13.233.139.30:1337');

// socket.on('open', () => {
//     console.log('WebSocket connected');
//     socket.send('Hello Server111');
// });

// socket.on('message', (data) => {
//     console.log('Message from server:', data.toString());
// });

// socket.on('close', () => {
//     console.log('WebSocket disconnected');
// });

// module.exports = { app };
// web socket code end ----->

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
const cors = require('cors');
const WebSocket = require('ws');

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/", router);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", editRouter);
app.use("/api/v1/", testRouter);
app.use("/api/v1/", carRouter);
app.use("/api/v1", vehicleRoute);

// Create HTTP server
const server = app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on port ${3000}`);
});

// WebSocket connections to both servers
const sockets = [
    new WebSocket('ws://3.110.10.75:1337'), // First server
    new WebSocket('ws://13.233.139.30:1337') // Second server
];

// Function to handle connection events
sockets.forEach((socket, index) => {
    socket.on('open', () => {
        console.log(`WebSocket ${index + 1} connected`);
        // Send an initial message
        socket.send(`Hello Server from connection ${index + 1}`);
    });

    socket.on('message', (data) => {
        console.log(`Message from server ${index + 1}:`, data.toString());
    });

    socket.on('close', () => {
        console.log(`WebSocket ${index + 1} disconnected`);
    });

    socket.on('error', (error) => {
        console.error(`Error on WebSocket ${index + 1}:`, error.message);
    });
});

// Send data in a loop
setInterval(() => {
    sockets.forEach((socket, index) => {
        if (socket.readyState === WebSocket.OPEN) {
            // Customize message for each WebSocket connection
            const message = index === 0
                ? "Message for Server 1" // Message for the first server
                : "Message for Server 2"; // Message for the second server

            socket.send(message);
            console.log(`Sent to WebSocket ${index + 1}:`, message);
        }
    });
}, 20000); // Send every 20 seconds

module.exports = { app };

