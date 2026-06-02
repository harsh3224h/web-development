import { randomBytes, createHmac } from "node:crypto";

export async function createHashedPassword(password, existingSalt = null) {
  const salt = existingSalt || randomBytes(16).toString("hex");

  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, password: hashedPassword };
}
