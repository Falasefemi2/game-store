/** @format */

import {
  serial,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
  index,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `gamestore_${name}`);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authId: varchar("auth_id", { length: 256 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  profilePictureUrl: varchar("profile_picture_url", { length: 256 }),
  username: varchar("username", { length: 256 }).unique(),
  firstName: varchar("first_name", { length: 256 }),
  lastName: varchar("last_name", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  gameLibrary: many(gameLibrary),
}));

export const games = pgTable(
  "games",
  {
    id: integer("id").primaryKey(),
    title: text("title").notNull(),
    thumbnail: text("thumbnail").notNull(),
    shortDescription: text("short_description").notNull(),
    gameUrl: text("game_url").notNull(),
    genre: text("genre").notNull(),
    platform: text("platform").notNull(),
    publisher: text("publisher").notNull(),
    developer: text("developer").notNull(),
    releaseDate: text("release_date").notNull(),
    freetogameProfileUrl: text("freetogame_profile_url").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    lastSyncedAt: timestamp("last_synced_at").defaultNow(),
  },
  (table) => ({
    titleIdx: uniqueIndex("title_idx").on(table.title),
    genreIdx: index("genre_idx").on(table.genre),
    platformIdx: index("platform_idx").on(table.platform),
  })
);

export const gamesRelations = relations(games, ({ many }) => ({
  gameLibrary: many(gameLibrary),
}));

export const gameLibrary = pgTable("game_library", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  gameId: integer("game_id")
    .notNull()
    .references(() => games.id),
  addedAt: timestamp("added_at").defaultNow(),
  status: varchar("status", { length: 20 }).default("added"), // e.g., 'added', 'playing', 'completed'
  notes: text("notes"),
});

export const gameLibraryRelations = relations(gameLibrary, ({ one }) => ({
  user: one(users, {
    fields: [gameLibrary.userId],
    references: [users.id],
  }),
  game: one(games, {
    fields: [gameLibrary.gameId],
    references: [games.id],
  }),
}));
