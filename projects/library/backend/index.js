import express from "express";
import authRouter from "./routes/auth.routes.js";
const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library" });
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running at port-> ${PORT}`));
