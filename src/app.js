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

var cors = require('cors')

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: '*' }))
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


// app.listen(port, () => {
//     console.log(`connection is live at host and port :${hostname}:${port}`);
// })

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});

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
// const http = require('http'); // Import http module
// const WebSocket = require('ws'); // Import WebSocket library

// const hostname = process.env.HOSTNAME;
// const port = process.env.PORT || 3000;
// const app = express();

// // Middleware
// app.use(cors({ origin: '*' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // API Routes
// app.use("/api/v1/", router);
// app.use("/api/v1/", userRouter);
// app.use("/api/v1/", editRouter);
// app.use("/api/v1/", testRouter);
// app.use("/api/v1/", carRouter);
// app.use("/api/v1", vehicleRoute);

// // Create HTTP server
// const server = http.createServer(app);

// // Create WebSocket server
// const wss = new WebSocket.Server({ server });

// // Handle WebSocket connections
// wss.on('connection', (ws) => {
//     console.log('New client connected');

//     ws.on('message', async (message) => {
//         const data = JSON.parse(message);

//         // Assuming you have a gyroModel defined somewhere
//         const gyroPostData = new gyroModel(data);

//         try {
//             await gyroPostData.save();
//             ws.send(JSON.stringify({ message: "GyroData Added Successfully" }));
//         } catch (error) {
//             console.error(error);
//             ws.send(JSON.stringify({ message: "Error saving data", error: error.message }));
//         }
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// // Start the server
// // server.listen(port, '0.0.0.0', () => {
// //     console.log(`Server running on http://${hostname}:${port}`);
// // });
// // app.listen(3000, '0.0.0.0', () => {
// //     console.log('Server running on port 3000');
// // }); 
// server.listen(port, '0.0.0.0', () => {
//     console.log(`Server running on http://${hostname}:${port}`);
// });