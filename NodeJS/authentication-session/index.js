import express from "express";
import usersRouter from "./routes/users.route.js";
const app = express();
const PORT = 8000;

// using middleware to support json data
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).end("Welcome to the Express app!");
});

app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`Server started & running at port ${PORT}`));
