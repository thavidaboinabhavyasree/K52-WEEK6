import express from "express";
import mongoose from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://mern-app-emps.vercel.app",
      "https://mern-app-emps-k1ideeqbc-bhavya123s-projects.vercel.app",
      "https://mern-app-emps-qq2v17jea-bhavya123s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/emp-api", empRoute);

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB connected");

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}..`);
    });

  } catch (err) {
    console.log("err in DB connection", err.message);
  }
};

connectDB();

app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});