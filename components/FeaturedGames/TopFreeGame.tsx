"use client";

import { getPaginatedGames } from "@/app/action/get-top-game";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// export default async function TopFreeGame() {
//     const { games, metadata } = await getPaginatedGames(1); // Fetch the first page
//     console.log(games);
//     console.log(metadata);



//     return (
//         <div>
//             <h1 className=" font-medium text-2xl my-6 mt-16">TOP FREE GAMES</h1>
//             <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                 {games.map((game) => (
//                     <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg">
//                         <Image src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" width={200} height={200} />
//                         <div className="p-4">
//                             <h2 className="font-bold text-xl mb-2">{game.title}</h2>
//                             <Link href={`/game/${game.id}`} className="text-blue-500 hover:underline">
//                                 View Details
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-8 flex justify-center items-center space-x-4">
//                 {metadata.hasPreviousPage && (
//                     <Link href={`/top-free-games?page=${metadata.currentPage - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
//                         Previous
//                     </Link>
//                 )}
//                 <span>
//                     Page {metadata.currentPage} of {metadata.totalPages}
//                 </span>
//                 {metadata.hasNextPage && (
//                     <Link href={`/top-free-games?page=${metadata.currentPage + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
//                         Next
//                     </Link>
//                 )}
//             </div>
//         </div>
//     )
// }

interface Game {
    id: number;
    title: string;
    thumbnail: string;
}

interface Metadata {
    currentPage: number;
    totalPages: number;
    totalGames: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export default function TopFreeGame() {
    const [games, setGames] = useState<Game[]>([]);
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = parseInt(searchParams.get("page") ?? "1");


    useEffect(() => {
        const fetchGames = async () => {
            const { games, metadata } = await getPaginatedGames(currentPage);
            setGames(games);
            setMetadata(metadata);
        };
        fetchGames();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        router.push(`/?page=${page}`);
    };
    return (
        <div>
            <h1 className="font-medium text-2xl my-6 mt-16">TOP FREE GAMES</h1>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {games.map((game) => (
                    <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg">
                        <Image src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover" width={200} height={200} />
                        <div className="p-4">
                            <h2 className="font-bold text-xl mb-2">{game.title}</h2>
                            <Link href={`/game/${game.id}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center items-center space-x-4">
                {metadata?.hasPreviousPage && (
                    <button onClick={() => handlePageChange(metadata.currentPage - 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Previous
                    </button>
                )}
                <span>
                    Page {metadata?.currentPage} of {metadata?.totalPages}
                </span>
                {metadata?.hasNextPage && (
                    <button onClick={() => handlePageChange(metadata.currentPage + 1)} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
}