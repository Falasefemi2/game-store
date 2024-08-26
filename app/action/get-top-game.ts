/** @format */

"use server";

import { sql } from "drizzle-orm";
import { db } from "../db";
import { games } from "../db/schema";

interface PaginatedGames {
  games: {
    id: number;
    title: string;
    thumbnail: string;
  }[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalGames: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// export async function getTopGames() {
//   try {
//     const allGames = await db
//       .select({
//         id: games.id,
//         title: games.title,
//         thumbnail: games.thumbnail,
//       })
//       .from(games);

//     return allGames;
//   } catch (error) {
//     console.error("Error fetching all games:", error);
//     throw new Error("Failed to fetch all games");
//   }
// }

export async function getPaginatedGames(
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedGames> {
  try {
    // Calculate the offset
    const offset = (page - 1) * pageSize;

    // Fetch the games for the current page
    const paginatedGames = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
      })
      .from(games)
      .limit(pageSize)
      .offset(offset);

    // Count total number of games
    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(games);

    // Calculate pagination metadata
    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      games: paginatedGames,
      metadata: {
        currentPage: page,
        totalPages,
        totalGames: count,
        hasNextPage,
        hasPreviousPage,
      },
    };
  } catch (error) {
    console.error("Error fetching paginated games:", error);
    throw new Error("Failed to fetch paginated games");
  }
}
