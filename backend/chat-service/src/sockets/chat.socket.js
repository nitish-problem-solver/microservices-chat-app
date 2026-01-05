import Message from "../models/Message.js";
import { validateToken } from "../grpc/auth.client.js";
import { getDMRoomId } from "../utils/dmRoom.js";

const chatSocket = (io) => {
  // 🔐 Authentication middleware (gRPC)
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Token missing"));

      const result = await validateToken(token);
      if (!result.valid) return next(new Error("Invalid token"));

      socket.userId = result.userId;
      next();
    } catch {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    /* ===================== CHAT ROOMS ===================== */

    // Join a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit("systemMessage", {
        message: "User joined the room",
        userId: socket.userId,
      });
    });

    // Leave a room
    socket.on("leaveRoom", (roomId) => {
      socket.leave(roomId);
    });

    // Send message to a room
    socket.on("sendRoomMessage", async ({ roomId, text }) => {
      if (!roomId || !text) return;

      const message = await Message.create({
        userId: socket.userId,
        roomId,
        text,
        type: "room",
      });

      io.to(roomId).emit("newRoomMessage", message);
    });

    /* ===================== DIRECT MESSAGES ===================== */

    socket.on("sendDirectMessage", async ({ toUserId, text }) => {
      if (!toUserId || !text) return;

      const dmRoomId = getDMRoomId(socket.userId, toUserId);

      // Ensure sender joins the DM room
      socket.join(dmRoomId);

      const message = await Message.create({
        userId: socket.userId,
        roomId: dmRoomId,
        text,
        type: "dm",
      });

      io.to(dmRoomId).emit("newDirectMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.userId);
    });
  });
};

export default chatSocket;
