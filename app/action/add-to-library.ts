/** @format */

"use server";

import { auth } from "@clerk/nextjs/server";
import { gameLibrary, users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";

export async function addGameToLibrary(gameId: number) {
  const { userId: authId } = auth();

  if (!authId) {
    throw new Error("User not authenticated");
  }

  try {
    // Find the user's internal ID
    const user = await db
      .select()
      .from(users)
      .where(eq(users.authId, authId))
      .execute()
      .then((rows: any[]) => rows[0]);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the game is already in the user's library
    const existingEntry = await db
      .select()
      .from(gameLibrary)
      .where(
        and(eq(gameLibrary.userId, user.id), eq(gameLibrary.gameId, gameId))
      )
      .execute()
      .then((rows: any[]) => rows[0]);

    if (existingEntry) {
      throw new Error("Game already in library");
    }

    // Add the game to the user's library
    await db
      .insert(gameLibrary)
      .values({
        userId: user.id,
        gameId,
        status: "added",
      })
      .execute();

    // Revalidate the page to reflect the changes
    revalidatePath("/library");

    return { success: true, message: "Game added to library" };
  } catch (error) {
    console.error("Failed to add game to library:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add game to library",
    };
  }
}
