import express from "express";
import dotenv from "dotenv";
import authRouter from "./route/auth.js";
import usersRouter from "./route/users.js";
dotenv.config();

const app = express();
// middleware
app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", usersRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Modular Node.js App! 🎉");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`auth Server is running at http://localhost:${PORT} 🚀`);
});
