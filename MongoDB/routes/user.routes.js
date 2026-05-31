import express from "express";
import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.patch("/", ensureAuthenticated, async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "")
    return res.status(400).json({ error: `Name is required.` });
  const result = await User.findByIdAndUpdate(req.user.userId, {
    name,
  });
  return res.status(201).json({ message: `Name updated successfully.` });
});

router.delete("/", ensureAuthenticated, async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user.userId);
  console.log(deletedUser);
  return res
    .status(201)
    .json({ message: `User deleted from DB successfully.` });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name.trim() === "")
    return res.status(400).json({ error: `Name is required.` });
  if (!email || email.trim() === "")
    return res.status(400).json({ error: `Email is required.` });
  if (!password || password.trim() === "")
    return res.status(400).json({ error: `Password is required.` });

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser)
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists.` });

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await User.insertOne({
    name,
    email,
    salt,
    password: hashedPassword,
  });

  return res.status(201).json({ status: `Success`, data: { id: user._id } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.trim() === "")
    return res.status(400).json({ error: `Email is required.` });
  if (!password || password.trim() === "")
    return res.status(400).json({ error: `Password is required.` });

  const existingUser = await User.findOne({ email });

  if (!existingUser)
    return res
      .status(400)
      .json({ error: `User with email ${email} doesn't exists.` });

  const hashedPassword = createHmac("sha256", existingUser.salt)
    .update(password)
    .digest("hex");

  if (existingUser.password !== hashedPassword)
    return res.status(400).json({ error: `Incorrect password.` });

  const payload = {
    userId: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(201).json({ message: `Authentication successful.`, token });
});

export default router;
