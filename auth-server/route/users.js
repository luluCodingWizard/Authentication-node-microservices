import express from "express";

import { authenticateToken } from "../../middleware/authMiddleware.js";
import { hashPassword } from "../../utils/bcryptHelpers.js";
import { users } from "../../users.js";
const router = express.Router();

router.get("/users", authenticateToken, (req, res) => {
  res.json({ users });
});

router.post("/users", async (req, res) => {
  const { password, username } = req.body;

  // hash the password
  const hashedPassword = await hashPassword(password);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: "User created!" });
});

export default router;
