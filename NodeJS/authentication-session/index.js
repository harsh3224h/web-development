import express from "express";
import usersRouter from "./routes/users.routes.js";
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Server is up and running" });
});

app.use("/user", usersRouter);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
