/* eslint-disable @next/next/no-img-element */




import Link from 'next/link';
import { searchGames } from '@/app/action/search-game';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string, page?: string } }) {
    const query = searchParams.q || '';
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = 12; // Make sure this matches the pageSize in your server action

    const searchResults = await searchGames(query, currentPage, pageSize);



    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for {`${query}`}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.results.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id} className="border p-4 rounded-lg cursor-pointer">
                        <div className="relative">

                            <img src={game.thumbnail} alt={game.title} className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-xl" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </div>

                        <h2 className="text-xl font-semibold">{game.title}</h2>
                        <p className="text-sm text-gray-600">{game.genre}</p>
                        <p className="mt-2 line-clamp-1">{game.shortDescription}</p>
                    </Link>
                ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
                {searchResults.metadata.hasPreviousPage && (
                    <Button asChild>
                        <Link href={`/search?q=${query}&page=${currentPage - 1}`} className="btn btn-primary">
                            Previous Page
                        </Link>
                    </Button>
                )}
                <span>
                    Page {currentPage} of {searchResults.metadata.totalPages}
                </span>
                {searchResults.metadata.hasNextPage && (
                    <Button asChild>
                        <Link href={`/search?q=${query}&page=${currentPage + 1}`} className="btn btn-primary">
                            Next Page
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}


