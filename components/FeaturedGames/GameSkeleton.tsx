import React from 'react'
import { Skeleton } from '../ui/skeleton'

function GameSkeleton() {
    return (
        <div className="w-full h-60 md:h-80 lg:h-96 relative rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full" />
            <div className="absolute bottom-4 left-4 space-y-2">
                <Skeleton className="h-8 w-48" />
            </div>
        </div>
    )
}

export default GameSkeleton