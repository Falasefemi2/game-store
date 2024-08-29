'use client'

import { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { fetchGamesByPlatform } from '@/app/action/platformgame'


type Platform = {
    id: number
    name: string
}

type Game = {
    id: number
    title: string
    // Add other game properties as needed
}

export function PlatformToggle({ platform }: { platform: Platform }) {
    const [games, setGames] = useState<Game[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleToggle = async (pressed: boolean) => {
        if (pressed) {
            setIsLoading(true)
            const result = await fetchGamesByPlatform(platform.id)
            setIsLoading(false)

            if (result.success) {
                setGames(result.data ?? [])
            } else {
                console.error(result.error)
                // Handle error (e.g., show an error message to the user)
            }
        } else {
            setGames([])
        }
    }

    return (
        <div>
            <Toggle onPressedChange={handleToggle}>
                {platform.name}
            </Toggle>
            {isLoading && <p>Loading games...</p>}
            {games.length > 0 && (
                <ul>
                    {games.map(game => (
                        <li key={game.id}>{game.title}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}