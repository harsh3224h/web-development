import express from "express";
const app = express();
const port = 8000;
import bookRouter from "./routes/book.routes.js";
import { loggerMiddleware } from "./middlewares/logger.js";

app.use(express.json());

app.get("/", (req, res) => res.status(201).end("You are on homepage"));

app.use(loggerMiddleware);

app.use("/books", bookRouter);

app.listen(port, () => console.log(`Server started at port -> ${port}`));
