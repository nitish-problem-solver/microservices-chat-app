import Message from "../models/Message.js";
import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/:roomId",authMiddleware, async (req, res) => {
  const { roomId } = req.params;

  const messages = await Message.find({
    roomId,
    type: "room",
  })
    .sort({ createdAt: 1 })
    .limit(100);

  res.json(messages);
});
export default router;