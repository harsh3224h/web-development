import { uuid, text, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),

  firstname: varchar("first_name", { length: 55 }).notNull(),
  lastname: varchar("last_name", { length: 55 }),

  email: varchar({ length: 255 }),

  salt: text().notNull(),
  password: text().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const urlsTable = pgTable("urls", {
  id: uuid().defaultRandom().primaryKey(),
  shortenCode: varchar({ length: 25 }).notNull().unique(),
  targetURL: varchar({ length: 50 }).notNull(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
