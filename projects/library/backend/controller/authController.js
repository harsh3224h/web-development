import { usersTable } from "../model/db/schema.js";
import db from "../model/db/index.js";
import { eq, and } from "drizzle-orm";
import { randomBytes, createHmac, hash, Hmac } from "node:crypto";

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "")
    return res.status(400).json({ error: "Email is required." });
  if (!password || password.trim() === "")
    return res.status(400).json({ error: "Password is required." });

  try {
    const [user] = await db
      .select({
        hashedPassword: usersTable.password,
        salt: usersTable.salt,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return res.status(400).json({ message: "Email not found!" });
    }

    const { salt, hashedPassword } = user;

    const currentHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (currentHashedPassword !== hashedPassword)
      return res.status(404).json({ message: `Incorrect password!` });

    return res.status(200).json({
      message: "Login Successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || name === "")
    return res.status(400).json({ error: `Name is required.` });
  if (!email || email === "")
    return res.status(400).json({ error: `Email is required.` });
  if (!password || password === "")
    return res.status(400).json({ error: `Password is required.` });

  const [result] = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (result)
    return res
      .status(400)
      .json({ error: `${email} is already associated with an account` });

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [insertOperation] = await db
    .insert(usersTable)
    .values({ name, email, salt, password: hashedPassword })
    .returning({ email: usersTable.email });

  if (insertOperation) {
    return res.status(201).json({
      message: `User created successfully`,
      email: insertOperation.email,
    });
  }

  return res.status(400).json({ message: `Something bad happened...` });
};

export default { login, signup };
