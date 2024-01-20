// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/gyroDB").then(() => {
//     console.log("connection successfully");
// }).catch((e) => {
//     console.log("No connection");
// });

const mongoose = require('mongoose');

// Replace this connection string with the actual connection string for your MongoDB database
const dbConnectionString = "mongodb://localhost:27017/gyroDB";

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successful");
}).catch((e) => {
    console.log("No connection", e.message);
});
