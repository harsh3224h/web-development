import express from "express";
import { createHashedPassword } from "../utils/users.utils.js";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validations/request.validation.js";
import { getUserByEmailId, createUser } from "../services/users.services.js";
import { creatUserToken } from "../utils/token.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import db from "../db/index.js";
import { usersTable, urlsTable } from "../models/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res.status(400).json({
        message: `Credentials must be in correct format`,
        error: validationResult.error.format(),
      });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    const existingUser = await getUserByEmailId(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email ${email} already exists` });
    }

    const { salt, password: hashedPassword } =
      await createHashedPassword(password);

    const createdUser = await createUser(
      firstname,
      lastname,
      email,
      salt,
      hashedPassword,
    );

    return res
      .status(201)
      .json({ message: `SignUp success`, data: createdUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
      req.body,
    );

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: `Credentials must be in correct format` });
    }

    const { email, password } = validationResult.data;

    const existingUser = await getUserByEmailId(email);

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `No user exists with email ${email}` });
    }

    const { salt, password: hashedPassword } = existingUser;

    const { password: incomingHashedPassword } = await createHashedPassword(
      password,
      salt,
    );

    if (hashedPassword !== incomingHashedPassword) {
      return res.status(400).json({ error: `Incorrect password` });
    }

    const token = await creatUserToken({ id: existingUser.id });

    return res.status(200).json({ message: `Login successful`, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/me", ensureAuthenticated, async (req, res) => {
  const [existingUser] = await db
    .select({
      first_name: usersTable.firstname,
      last_name: usersTable.lastname,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(req.user.id, usersTable.id));

  if (!existingUser) return res.status(404).json({ error: `User not found` });

  return res.status(201).json({ data: existingUser });
});

export default router;
