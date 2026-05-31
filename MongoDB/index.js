import "dotenv/config";
import express from "express";
import { connectDB } from "./connection.js";
import userRouter from "./routes/user.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(authMiddleware);
app.use("/users", userRouter);

connectDB(process.env.MONGODB_URL).then(() =>
  console.log(`MongoDB connected.`),
);

app.listen(PORT, () => console.log(`Server is running on port -> ${PORT}`));
