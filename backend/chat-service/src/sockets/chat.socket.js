import Message from "../models/Message.js";
import { validateToken } from "../grpc/auth.client.js";

const chatSocket = (io) => {
  /* ===================== AUTH ===================== */
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Token missing"));

      const result = await validateToken(token);
      if (!result.valid) return next(new Error("Invalid token"));

      socket.userId = result.userId;
      next();
    } catch (err) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    /* ===================== ROOMS ===================== */

    // Join a room
    socket.on("joinRoom", (roomId) => {
      if (!roomId) return;

      socket.join(roomId);

      socket.to(roomId).emit("systemMessage", {
        text: "User joined the room",
        userId: socket.userId,
        createdAt: new Date(),
      });
    });

    // Leave a room
    socket.on("leaveRoom", (roomId) => {
      if (!roomId) return;
      socket.leave(roomId);
    });

    // Send message to a room (MULTI-USER)
    socket.on("sendRoomMessage", async ({ roomId, text }) => {
      if (!roomId || !text) return;

      const message = await Message.create({
        userId: socket.userId,
        roomId,
        text,
        type: "room",
        createdAt: new Date(),
      });

      // 🔥 Broadcast to ALL users in the room
      io.to(roomId).emit("newRoomMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.userId);
    });
  });
};

export default chatSocket;
