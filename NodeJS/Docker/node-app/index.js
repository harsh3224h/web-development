import express from "express";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  return res.status(201).json({ message: `Welcome to Homepage.` });
});

app.listen(PORT, () => console.log(`Server is running at port => ${PORT}`));
