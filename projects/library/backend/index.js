import express from "express";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import db from "./model/db/index.js";
import { usersTable, sessionsTable } from "./model/db/schema.js";
import { eq } from "drizzle-orm";
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Enable this if you plan to send cookies/sessions later
  }),
);

// middleware to check if user logged in
app.use(async (req, res, next) => {
  const sessionId = req.headers["session-id"];
  if (!sessionId) {
    return next();
  }

  const [data] = await db
    .select({
      name: usersTable.name,
      email: usersTable.email,
      sessionId: sessionsTable.id,
    })
    .from(sessionsTable)
    .rightJoin(usersTable, eq(usersTable.id, sessionsTable.userId))
    .where(eq(sessionsTable.id, sessionId));

  if (!data) {
    return next();
  }

  req.user = data;
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to library" });
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Server is running at port-> ${PORT}`));
