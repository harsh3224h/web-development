import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: varchar({ length: 255 }),
});

export const userSessions = pgTable("user_sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .unique()
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
