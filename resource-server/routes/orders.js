import express from "express";
import { authenticateToken } from "../../middleware/authMiddleware.js";
const router = express.Router();

// Mock data: A list of book orders
const orders = [
  { id: 1, username: "lulu", item: "Laptop", price: 1200 },
  { id: 2, username: "lulu1", item: "Phone", price: 800 },
  { id: 3, username: "lulu2", item: "Monitor", price: 300 },
];

router.get("/orders", authenticateToken, (req, res) => {
  const userOrders = orders.filter(
    (order) => order.username === req.user.username
  );
  res.json({ userOrders });
});

export default router;
