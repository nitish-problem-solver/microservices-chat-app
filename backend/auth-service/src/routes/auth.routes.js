import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../model/user.js";



const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await user.create({ email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const loginuser = await user.findOne({ email });
  if (!loginuser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, loginuser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: loginuser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token,userId:loginuser._id });
});

export default router;
