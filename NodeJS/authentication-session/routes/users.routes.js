import express from "express";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { execSync } from "node:child_process";
import { randomBytes, createHmac } from "node:crypto";

const router = express.Router();

router.get("/", (req, res) => res.status(201).end("Hi user"));

router.post("/signup", async function (req, res) {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (existingUser)
    return res
      .status(400)
      .json({ error: `user with email ${email} already exists` });

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [newUser] = await db
    .insert(usersTable)
    .values({ name, email, password: hashedPassword, salt })
    .returning({ id: usersTable.id });

  return res
    .status(201)
    .json({ status: `Success`, data: { userId: newUser.id } });
});

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  const [existingUser] = await db
    .select({
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
      id: usersTable.id,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser)
    return res
      .status(404)
      .json({ error: `User with email ${email} does not exists!` });

  const salt = existingUser.salt;
  const existingHash = existingUser.password;
  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHash)
    return res.status(400).json({ error: `Incorrect password` });

  const [session] = await db
    .insert(userSessions)
    .values({ userId: existingUser.id })
    .returning({ id: userSessions.id });

  return res.status(201).json({ message: "Success", sessionId: session.id });
});

export default router;
