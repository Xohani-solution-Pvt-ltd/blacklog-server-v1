const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/gyroDB").then(() => {
// mongoose.connect("mongodb+srv://himanshumankar22:blacklog@cluster0.uo1cm.mongodb.net/gyroDB?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connection successfully");
}).catch((e) => {
    console.log(" No connection ");
});