/** @format */

"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { games, platforms } from "../db/schema";

export async function getGamePlatform(platformId: number) {
  try {
    const selectedGames = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
        shortDescription: games.shortDescription,
        gameUrl: games.gameUrl,
        genre: games.genre,
        publisher: games.publisher,
        developer: games.developer,
        releaseDate: games.releaseDate,
        platform: platforms.name,
      })
      .from(games)
      .innerJoin(platforms, eq(games.platformId, platforms.id))
      .where(eq(games.platformId, platformId));

    return { success: true, data: selectedGames };
  } catch (error) {
    console.error("Error selecting games by platform:", error);
    return { success: false, error: "Failed to select games by platform" };
  }
}
