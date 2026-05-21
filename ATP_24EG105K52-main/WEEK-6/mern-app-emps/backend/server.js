import express from "express";
import mongoose from "mongoose";
import { empRoute } from "./API/empApp.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


// VERY IMPORTANT
app.use(cors());

app.use(express.json());


// ROUTES
app.use("/emp-api", empRoute);


// TEST ROUTES
app.get("/", (req, res) => {
  res.send("Backend working");
});

app.get("/emp-api/test", (req, res) => {
  res.json({ message: "API working" });
});


// DATABASE CONNECTION
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


// ERROR HANDLER
app.use((err, req, res, next) => {

  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });

});