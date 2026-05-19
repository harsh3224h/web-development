import express from "express";
const app = express();
const PORT = 8000;

app.use(express.json());

// data structures
const EMAILS = new Set();
const DIARY = [];

app.get("/", (req, res) => {
  res.status(201).end(`Welcome to parking!\nParked vehicles: ${EMAILS.size}`);
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || name === "") return res.status(400).end(`Name is required`);
  if (!email || email === "") return res.status(400).end(`Email is required`);
  if (!password || password === "")
    return res.status(400).end(`Password is required`);

  if (EMAILS.has(email)) return res.status(400).end(`Email already taken.`);

  const token = Date.now();

  const user = { name, email, password, token };
  DIARY.push(user);
  EMAILS.add(email);

  return res
    .status(201)
    .json({ message: "Registered successfully", token: token });
});

app.post("/me", (req, res) => {
  const { token } = req.body;

  if (!token || token === "") return res.status(300).end(`Token is required.`);

  const details = DIARY.find((item) => item.token === token);
  if (!details) return res.status(400).end(`Token is invalid`);

  res.status(201).json(details);
});

app.listen(PORT, () => console.log(`Server started at port-> ${PORT}`));
