import express from "express";
import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { usersTable, userSessions } from "../db/schema.js";
import { randomBytes, createHmac, hash, Hmac } from "node:crypto";
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

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword, salt })
    .returning({ id: usersTable.id });

  res.status(201).json({ message: `User created successfully`, data: user.id });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required` });

  const [user] = await db
    .select({
      userId: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      hashedPassword: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    return res
      .status(400)
      .json({ error: `User with email ${email} doesn't exists.` });
  }

  const { salt, hashedPassword } = user;

  const currentHashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
  if (currentHashedPassword !== hashedPassword)
    return res.status(404).json({ message: `Incorrect password!` });

  // creating a session after successfull authentication
  const newSession = await db
    .insert(userSessions)
    .values({ userId: user.userId });

  return res.status(201).json({ name: user.name, email: user.email });
});

router.delete("/me", async (req, res) => {
  const { email, password } = req.body;
  // validating if email & password are recieved
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required` });

  // validating if the email & password is incorrect
  const [user] = await db
    .select({
      email: usersTable.email,
      hashedPassword: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  if (!user) return res.status(404).json({ error: `Invalid email!` });

  const currentHashedPassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");

  if (user.password !== currentHashedPassword) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  await db.delete(usersTable).where(eq(usersTable.email, email));

  return res
    .status(201)
    .json({ message: `User with email ${email} deleted successfully.` });
});

export default router;
