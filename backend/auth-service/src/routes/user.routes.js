import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import user from "../model/user.js";

const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await user.find(
      { _id: { $ne: req.userId } },
      { email: 1 }
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
