import { getPaginatedGames } from '@/app/action/get-top-game';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';;
import ToggleLibraryButton from '../adddelete';


interface PageProps {
    searchParams: { page?: string };
}

export default async function TopFreeGame({ searchParams }: PageProps) {
    const currentPage = parseInt(searchParams.page ?? "1");
    const { games, metadata } = await getPaginatedGames(currentPage);

    return (
        <div>
            <h1 className="font-medium text-2xl my-6 mt-16">TOP FREE GAMES</h1>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {games.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id}>
                        <div className="relative border rounded-lg overflow-hidden shadow-lg group">

                            <Image
                                src={game.thumbnail}
                                alt={game.title}
                                className="w-full h-64 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"

                                width={400}
                                height={300}
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-300 ease-in-out"></div>
                            <div className="p-4">
                                <h2 className="font-medium text-xl mb-2 line-clamp-1">{game.title}</h2>
                            </div>
                            <ToggleLibraryButton gameId={game.id} isInLibrary />
                        </div>
                    </Link>
                ))}
            </div>


            <div className="mt-8 flex justify-center items-center space-x-4">
                {metadata.hasPreviousPage && (
                    <Button asChild>
                        <Link href={`/?page=${metadata.currentPage - 1}`}>
                            Previous
                        </Link>
                    </Button>
                )}
                <span>
                    Page {metadata.currentPage} of {metadata.totalPages}
                </span>
                {metadata.hasNextPage && (
                    <Button asChild>
                        <Link href={`/?page=${metadata.currentPage + 1}`}>
                            Next
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}