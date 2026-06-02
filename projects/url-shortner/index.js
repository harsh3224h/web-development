import express from "express";
import "dotenv/config";
import userRouter from "./routes/users.routes.js";
import urlRouter from "./routes/urls.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(express.json());
app.use(authenticationMiddleware);
app.use("/code", urlRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(201).json({ message: `Server is up and running..` });
});

app.listen(PORT, () => console.log(`Server is running at port -> ${PORT}`));
