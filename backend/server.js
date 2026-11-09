const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/db.js");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

// Routes
const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes.js");
const governmentRoutes = require("./routes/GovernmentRoutes.js");
const cleanupRoutes = require("./routes/cleanupRoutes.js");
const analyzeRoute = require("./routes/visionRoutes.js");
const volunteerRoutes = require("./routes/volunteerRoutes.js");
const { initializeSocket } = require("./sockets/socket.js");

app.use("/", authRoutes);
app.use("/government", governmentRoutes);
app.use("/reports", reportRoutes);
app.use("/analyzeReport", analyzeRoute);
app.use("/volunteer", cleanupRoutes);
app.use("/volunteerProfile", volunteerRoutes);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Make io accessible to Express controllers/services later
app.set("io", io);

// Start application
const startServer = async () => {
  try {
    await connectDb();

    const PORT = process.env.PORT || 5001;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
