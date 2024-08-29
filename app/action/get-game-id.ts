/** @format */

"use server";

import { db } from "../db";
import { games } from "../db/schema";
import { eq } from "drizzle-orm";

interface Game {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  gameUrl: string;
  genre: string;
  platformId: number;
  publisher: string;
  developer: string;
  releaseDate: string;
  freetogameProfileUrl: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastSyncedAt: Date | null;
}

export async function getGameById(id: number): Promise<Game | null> {
  try {
    const result = await db
      .select()
      .from(games)
      .where(eq(games.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const game = result[0];

    return {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      shortDescription: game.shortDescription,
      gameUrl: game.gameUrl,
      genre: game.genre,
      platformId: game.platformId,
      publisher: game.publisher,
      developer: game.developer,
      releaseDate: game.releaseDate,
      freetogameProfileUrl: game.freetogameProfileUrl,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      lastSyncedAt: game.lastSyncedAt,
    };
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    throw new Error("Failed to fetch game");
  }
}
