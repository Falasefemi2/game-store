/** @format */

import {
  serial,
  timestamp,
  pgTableCreator,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `gamestore_${name}`);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authId: varchar("auth_id", { length: 256 }),
  email: varchar("email", { length: 256 }),
  profilePictureUrl: varchar("profile_picture_url", { length: 256 }),
  username: varchar("username", { length: 256 }),
  firstName: varchar("first_name", { length: 256 }),
  LastName: varchar("last_name", { length: 256 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});
