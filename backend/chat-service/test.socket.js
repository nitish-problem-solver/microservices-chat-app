import { io } from "socket.io-client";

const socket = io("http://localhost:4002", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWE1MDBlZmVlZmJiNGU1MDRmYjViOCIsImlhdCI6MTc2NzUyOTkxNywiZXhwIjoxNzY3NTMzNTE3fQ.BRoTTfcNfB_dhS2m6syW_7BIj-ZUOGLySdaq8dKhB6A",
  },
});

socket.on("connect", () => {
  console.log("Connected");
  socket.emit("sendMessage", "Hello from Node client");
});

socket.on("newMessage", (msg) => {
  console.log("New message:", msg);
});

socket.on("connect_error", (err) => {
  console.error("Error:", err.message);
});
