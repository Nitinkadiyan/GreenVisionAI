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
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

// Routes
const reportRoutes = require("./routes/reportRoutes.js");
const governmentRoutes = require("./routes/GovernmentRoutes.js");
const cleanupRoutes = require("./routes/cleanupRoutes.js");
const analyzeRoute = require("./routes/visionRoutes.js");
const volunteerRoutes = require("./routes/volunteerRoutes.js");
const rewardRoutes = require("./routes/rewardRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

// Socket.IO
const {initializeSocket} = require("./sockets/socket.js");

// Create HTTP server ONLY ONCE
const server = http.createServer(app);

// Initialize Socket.IO on the same HTTP server
const io = initializeSocket(server);

// Make Socket.IO accessible inside controllers
app.set("io", io);

// Register routes
app.use("/", authRoutes);
app.use("/government", governmentRoutes);
app.use("/reports", reportRoutes);
app.use("/analyzeReport", analyzeRoute);
app.use("/volunteer", cleanupRoutes);
app.use("/volunteerProfile", volunteerRoutes);
app.use("/rewards", rewardRoutes);

// Start application
const startServer = async () => {
    try {
        // Connect to MongoDB only once
        await connectDb();

        const PORT = process.env.PORT || 5001;

        server.listen(PORT, () => {
            console.log("----------------------------------");
            console.log("GreenVision AI Backend Started");
            console.log(`Server running on port ${PORT}`);
            console.log("Socket.IO initialized successfully");
            console.log("MongoDB connected successfully");
            console.log("----------------------------------");
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
