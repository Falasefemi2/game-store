/** @format */

"use server";

import { db } from "@/app/db";
import { games } from "@/app/db/schema";

export async function getSevenGameThumbnails() {
  try {
    const sevenGames = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
        description: games.shortDescription,
      })
      .from(games)
      .limit(7);

    return sevenGames;
  } catch (error) {
    console.error("Error fetching game thumbnails:", error);
    throw new Error("Failed to fetch game thumbnails");
  }
}
