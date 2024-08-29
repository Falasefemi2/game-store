/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { searchGames } from '@/app/action/search-game';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string, page?: string } }) {
    const query = searchParams.q || '';
    const currentPage = parseInt(searchParams.page || '1', 10);
    const pageSize = 12; // Make sure this matches the pageSize in your server action

    const searchResults = await searchGames(query, currentPage, pageSize);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.results.map((game) => (
                    <Link href={`/game/${game.id}`} key={game.id} className="border p-4 rounded-lg cursor-pointer">
                        <img src={game.thumbnail} alt={game.title} className="w-full h-48 object-cover mb-2" />
                        <h2 className="text-xl font-semibold">{game.title}</h2>
                        <p className="text-sm text-gray-600">{game.genre}</p>
                        <p className="mt-2">{game.shortDescription}</p>
                    </Link>
                ))}
            </div>
            <div className="mt-8 flex justify-between items-center">
                {searchResults.metadata.hasPreviousPage && (
                    <Link href={`/search?q=${query}&page=${currentPage - 1}`} className="btn btn-primary">
                        Previous Page
                    </Link>
                )}
                <span>
                    Page {currentPage} of {searchResults.metadata.totalPages}
                </span>
                {searchResults.metadata.hasNextPage && (
                    <Link href={`/search?q=${query}&page=${currentPage + 1}`} className="btn btn-primary">
                        Next Page
                    </Link>
                )}
            </div>
        </div>
    );
}