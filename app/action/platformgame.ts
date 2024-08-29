/** @format */

"use server";

import { db } from "@/app/db";
import { games } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function fetchGamesByPlatform(platformId: number) {
  try {
    const gamesForPlatform = await db
      .select()
      .from(games)
      .where(eq(games.platformId, platformId));

    return { success: true, data: gamesForPlatform };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { success: false, error: "Failed to fetch games" };
  }
}
