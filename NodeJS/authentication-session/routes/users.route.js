import express from "express";
import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(201).json({ message: `you are on users route.` });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // validating if email & password is not empty
  if (!name || name === "")
    return res.status(400).json({ error: `Name is required` });
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required` });

  // validating if email already exists
  const [user_email] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  if (user_email)
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists` });

  await db.insert(usersTable).values({ name, email, password });

  res.status(201).json({ message: `User created successfully` });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required` });

  const [authenticated] = await db
    .select({
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.password, password));

  if (!authenticated)
    return res.status(404).json({ message: `Incorrect password!` });

  const [user] = await db
    .select({
      email: usersTable.email,
      name: usersTable.name,
      password: usersTable.password,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!user)
    return res
      .status(404)
      .json({ message: `User with email ${email} doesn't exists` });

  return res
    .status(201)
    .json({ name: user.name, email: user.email, password: user.password });
});

router.delete("/me", async (req, res) => {
  const { email, password } = req.body;
  // validating if email & password are recieved
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required` });

  // validating if the email & password is incorrect
  const [user_email] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  if (!user_email) return res.status(404).json({ error: `Invalid email!` });
  const [user_password] = await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where((table) => eq(table.password, password));
  if (!user_password)
    return res.status(404).json({ error: `Incorrect password!` });

  await db.delete(usersTable).where(eq(usersTable.email, email));

  return res
    .status(201)
    .json({ message: `User with email ${email} deleted successfully.` });
});

export default router;
