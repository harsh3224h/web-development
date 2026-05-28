import express from "express";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"
const app = express();
const PORT = 8000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable this if you plan to send cookies/sessions later
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library" });
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running at port-> ${PORT}`));
