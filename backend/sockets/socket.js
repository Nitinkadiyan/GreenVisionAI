const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Authenticate every incoming socket connection
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Authentication token missing"));
      }

      const decoded = jwt.verify(token, process.env.TOKEN_KEY_SECRET);

      const user = await User.findById(decoded.id).select(
        "-password -confirmPassword",
      );

      if (!user) {
        return next(new Error("User not found"));
      }

      // Store verified identity on the socket
      socket.data.user = {
        id: user._id.toString(),
        role: user.role,
      };

      next();
    } catch (error) {
      console.error("Socket authentication failed:", error.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.user.id;
    const room = `user:${userId}`;

    // Join the authenticated user's private room
    socket.join(room);

    console.log(`User connected: ${userId}`);

    socket.on("disconnect", (reason) => {
      console.log(`User disconnected: ${userId}`, reason);
    });
  });

  return io;
};

module.exports = { initializeSocket };
