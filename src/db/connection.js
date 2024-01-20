const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/gyroDB").then((data) => {
    console.log("connection successfully",data);
}).catch((e) => {
    console.log(" No connection ", e);
});