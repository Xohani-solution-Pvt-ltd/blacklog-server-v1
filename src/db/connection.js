const mongoose = require('mongoose');

mongoose.connect("mongodb://13.232.113.131/gyroDB").then(() => {
    console.log("connection successfully");
}).catch((e) => {
    console.log(" No connection ");
});


