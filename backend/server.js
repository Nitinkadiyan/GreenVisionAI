const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const reportRoutes = require("./routes/reportRoutes.js");
const governmentRoutes = require("./routes/GovernmentRoutes.js");
const cleanupRoutes = require("./routes/cleanupRoutes.js");
connectDb();
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use("/", authRoutes);
app.use("/government", governmentRoutes);
app.use("/reports",reportRoutes);
app.use("/volunteer",cleanupRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
