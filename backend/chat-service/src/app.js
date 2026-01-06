import express from "express";
import cors from "cors";
import roomRoutes from "./routes/room.routes.js";
import messageRoutes from "./routes/message.routes.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/rooms", roomRoutes);
app.use("/messages",messageRoutes)
app.get("/", (req, res) => {
  res.send("Chat Service Running");
});

export default app;
