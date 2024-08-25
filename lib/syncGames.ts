/** @format */

const { db } = require("@/app/db");
const { games, platforms } = require("@/app/db/schema");
const axios = require("axios");

interface APIGame {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

async function syncGames() {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    const apiGames = response.data as APIGame[];

    for (const game of apiGames) {
      // Insert or update platform
      const [platform] = await db
        .insert(platforms)
        .values({ name: game.platform })
        .onConflictDoUpdate({
          target: platforms.name,
          set: { updatedAt: new Date() },
        })
        .returning();

      // Insert or update game
      await db
        .insert(games)
        .values({
          id: game.id,
          title: game.title,
          thumbnail: game.thumbnail,
          shortDescription: game.short_description,
          gameUrl: game.game_url,
          genre: game.genre,
          platformId: platform.id,
          publisher: game.publisher,
          developer: game.developer,
          releaseDate: game.release_date,
          freetogameProfileUrl: game.freetogame_profile_url,
          lastSyncedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: games.id,
          set: {
            title: game.title,
            thumbnail: game.thumbnail,
            shortDescription: game.short_description,
            gameUrl: game.game_url,
            genre: game.genre,
            platformId: platform.id,
            publisher: game.publisher,
            developer: game.developer,
            releaseDate: game.release_date,
            freetogameProfileUrl: game.freetogame_profile_url,
            lastSyncedAt: new Date(),
            updatedAt: new Date(),
          },
        });

      console.log(`Synced game: ${game.title}`);
    }

    console.log("All games synced successfully!");
  } catch (error) {
    console.error("Error syncing games:", error);
  }
}

syncGames();
