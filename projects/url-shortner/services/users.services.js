import db from "../db/index.js";
import { usersTable } from "../models/schema.js";
import { eq } from "drizzle-orm";

export const getUserByEmailId = async (email) => {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      name: usersTable.firstname,
      password: usersTable.password,
      salt: usersTable.salt,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
};

export const createUser = async (
  firstname,
  lastname,
  email,
  salt,
  hashedPassword,
) => {
  const [createdUser] = await db
    .insert(usersTable)
    .values({
      firstname,
      lastname,
      email,
      salt,
      password: hashedPassword,
    })
    .returning({
      id: usersTable.id,
      first_name: usersTable.firstname,
      last_name: usersTable.lastname,
      email: usersTable.email,
    });

  return createdUser;
};
