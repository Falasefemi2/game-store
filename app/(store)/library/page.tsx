/* eslint-disable @next/next/no-img-element */
import { db } from "@/app/db";
import { gameLibrary, games, users } from "@/app/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(authId: string) {
    unstable_noStore();

    const user = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.authId, authId))
        .execute()
        .then((rows) => rows[0]);

    if (!user) {
        throw new Error("User not found");
    }

    const data = await db
        .select({
            games: {
                id: games.id,
                title: games.title,
                releaseDate: games.releaseDate,
                thumbnail: games.thumbnail,
            },
        })
        .from(gameLibrary)
        .innerJoin(games, eq(gameLibrary.gameId, games.id))
        .where(eq(gameLibrary.userId, user.id))
        .groupBy(games.id);

    return data;
}



export default async function LibraryPage() {
    const user = auth()
    if (!user) return redirect("/")
    const data = await getData(user.userId as string)

    return (
        <div className="container mx-auto px-5 lg:px-10">
            <h1 className="text-3xl font-semibold tracking-tight mb-4">Your Library</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((game) => (
                    <Link href={`/game/${game.games.id}`} key={game.games.id} className="border p-4 rounded-lg cursor-pointer">
                        <div className="relative">
                            <img src={game.games.thumbnail} alt={game.games.title} className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl" />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50"></div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold tracking-tight">{game.games.title}</h3>
                                <p className="text-gray-500 text-sm">{game.games.releaseDate}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}