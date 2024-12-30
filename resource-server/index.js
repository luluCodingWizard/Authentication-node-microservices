import express from "express";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.js";
dotenv.config();

const app = express();
// middleware
app.use(express.json());
app.use("/api", ordersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Modular Node.js App! 🎉");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT} 🚀`);
});
