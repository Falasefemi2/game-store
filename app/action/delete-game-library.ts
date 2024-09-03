/** @format */

"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db";
import { gameLibrary, users } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletegameLibrary(gameId: number) {
  const { userId: authId } = auth();

  if (!authId) {
    throw new Error("User not authenticated");
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.authId, authId))
    .execute()
    .then((rows) => rows[0]);

  if (!user) {
    throw new Error("User not found");
  }

  const [deleteData] = await db
    .delete(gameLibrary)
    .where(and(eq(gameLibrary.userId, user.id), eq(gameLibrary.gameId, gameId)))
    .returning();

  revalidatePath("/"); // Revalidate to reflect changes

  return deleteData;
}
