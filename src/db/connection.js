// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/gyroDB").then(() => {
//     console.log("connection successfull");
// }).catch((e) => {
//     console.log("No connection");
// });


const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://himanshumankar22:blacklog@cluster0.uo1cm.mongodb.net/gyroDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

