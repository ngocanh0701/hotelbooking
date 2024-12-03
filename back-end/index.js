import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import detailRoute from "./routes/detail.js";
import userhotelRoute from "./routes/userhotel.js";
import momoRoutes from "./routes/momo.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import pkg from 'body-parser';
const { urlencoded } = pkg;

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({
  origin : ["https://hotelbookingui.vercel.app", "http://localhost:3000", ],
  credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/detail", detailRoute);
app.use("/api/userhotel", userhotelRoute);
app.use('/api/momo', momoRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.get('/api', function (req, res) {
  res.send('Hello Bro, Welcome to my API - Anh U API!');
});
app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
