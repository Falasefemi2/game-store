import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { getGameById } from '@/app/action/get-game-id';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default async function GameDesc({ gameId }: { gameId: number }) {
    const game = await getGameById(gameId);

    if (!game) {
        return <div>No game found</div>;
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8 text-center">{game.title}</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="md:col-span-2">
                    <CardContent className="p-0">
                        <Image
                            src={game.thumbnail}
                            alt={game.title}
                            width={800}
                            height={600}
                            layout="responsive"
                            className="rounded-t-lg"
                        />
                    </CardContent>
                    <CardContent className="p-6">
                        <CardDescription>{game.shortDescription}</CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Game Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl className="grid grid-cols-2 gap-4">
                            <dt className="font-semibold">Release Date:</dt>
                            <dd>{game.releaseDate}</dd>
                            <dt className="font-semibold">Genre:</dt>
                            <dd>{game.genre}</dd>
                            <dt className="font-semibold">Publisher:</dt>
                            <dd>{game.publisher}</dd>
                            <dt className="font-semibold">Developer:</dt>
                            <dd>{game.developer}</dd>
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-0">
                        <Image
                            src={game.thumbnail}
                            alt={`${game.title} thumbnail`}
                            width={400}
                            height={300}
                            layout="responsive"
                            className="rounded-t-lg"
                        />
                    </CardContent>
                    <CardContent className="p-4">
                        <Button asChild>
                            <Link
                                href={game.gameUrl}
                            >
                                Play Game
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}