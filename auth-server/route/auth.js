import express from "express";
import jwt from "jsonwebtoken";
import { comparePasswords } from "../../utils/bcryptHelpers.js";
import { users } from "../../users.js";
const router = express.Router();

// In-memory storage for refresh tokens (just for demo purposes)
const refreshTokens = [];

// Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  const isMatch = await comparePasswords(password, user.password);

  if (!isMatch) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }

  // Generate JWT
  const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(
    { username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );
  refreshTokens.push(refreshToken);
  res.json({ accessToken, refreshToken });
});

// Refresh Token Route
router.post("/token", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send("Refresh token required.");

  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Invalid refresh token. 1");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid refresh token. 2");
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: newAccessToken });
  });
});

router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) refreshTokens.splice(index, 1);
  res.send("Logged out!");
});

export default router;
