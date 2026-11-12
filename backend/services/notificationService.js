const Notification = require("../models/Notification");

const createNotification = async (io, notificationData) => {
  try {
    console.log("1. Creating notification...");
    console.log("Notification data:", notificationData);

    // Save notification in MongoDB
    const notification = await Notification.create(notificationData);

    console.log("2. Notification saved:", notification._id);

    // Emit real-time notification
    const recipientRoom = `user:${notification.recipient.toString()}`;

    console.log("3. Emitting to room:", recipientRoom);

    io.to(recipientRoom).emit("notification:new", notification.toObject());

    console.log("4. Notification process completed!");

    return notification;
  } catch (error) {
    console.error("NOTIFICATION SERVICE ERROR:", error);
    throw error;
  }
};

module.exports = { createNotification };
