/** @format */

"use server";

import { db } from "../db";
import { games } from "../db/schema";
import { sql, like } from "drizzle-orm";

interface SearchResult {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  genre: string;
}

interface PaginatedSearchResults {
  results: SearchResult[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function searchGames(
  query: string,
  page: number = 1,
  pageSize: number = 12
): Promise<PaginatedSearchResults> {
  try {
    const offset = (page - 1) * pageSize;

    const searchResults = await db
      .select({
        id: games.id,
        title: games.title,
        thumbnail: games.thumbnail,
        shortDescription: games.shortDescription,
        genre: games.genre,
      })
      .from(games)
      .where(like(games.title, `%${query}%`))
      .limit(pageSize)
      .offset(offset);

    const [{ count }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(games)
      .where(like(games.title, `%${query}%`));

    const totalPages = Math.ceil(count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      results: searchResults,
      metadata: {
        currentPage: page,
        totalPages,
        totalResults: count,
        hasNextPage,
        hasPreviousPage,
      },
    };
  } catch (error) {
    console.error("Error searching games:", error);
    throw new Error("Failed to search games");
  }
}
