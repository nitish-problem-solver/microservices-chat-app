import express from "express";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/auth.middleware.js";



const router = express.Router();

/* CREATE ROOM */
router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;

  const room = await Room.create({
    name,
    createdBy: req.userId,
    members: [req.userId], // creator auto-added
  });

  res.status(201).json(room);
});

/* GET ROOMS FOR USER */
router.get("/", authMiddleware, async (req, res) => {
  const rooms = await Room.find({
    members: req.userId,
  });

  res.json(rooms);
});

/* DELETE ROOM */
router.delete("/:id", authMiddleware, async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  await room.deleteOne();
  res.json({ message: "Room deleted" });
});



/* GET messages for a room */






export default router;
