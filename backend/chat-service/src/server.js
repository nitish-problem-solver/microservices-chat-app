import dotenv from "dotenv";


import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import chatSocket from "./sockets/chat.socket.js";
console.log("🔥 CHAT SERVER FILE EXECUTED");
const result = dotenv.config();
console.log("DOTENV RESULT:", result.parsed);

await connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

chatSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Chat Service running on port ${process.env.PORT}`);
});
