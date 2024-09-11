// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/gyroDB").then(() => {
//     console.log("connection successfully");
// }).catch((e) => {
//     console.log(" No connection ");
// });

// import mongoose, { Mongoose } from "mongoose";
const mongoose = require('mongoose');


const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null };

// export const connectMongo = async () => {
//     if (cached.conn) return cached.conn;

//     cached.conn = await mongoose.connect(MONGO_URI);

//     return cached.conn;
// };
