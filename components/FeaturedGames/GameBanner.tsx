/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

import { getSevenGameThumbnails } from "@/app/action/get-game-banner";

type Game = {
    id: number;
    title: string;
    thumbnail: string;
};



function GameBanner() {
    const [games, setGames] = useState<Game[]>([]); // Explicitly define the type
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // Define error type


    useEffect(() => {
        async function fetchThumbnails() {
            try {
                const gameThumbnails = await getSevenGameThumbnails();
                setGames(gameThumbnails);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchThumbnails();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    return (
        <>
            <div className="game-thumbnails">
                {games.map((game) => (
                    <div key={game.id} className="game">
                        <img src={game.thumbnail} alt={game.title} />
                        <h3>{game.title}</h3>
                    </div>
                ))}
            </div>

        </>
    )
}

export default GameBanner