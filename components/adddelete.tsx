"use client";

import React from 'react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { deletegameLibrary } from '@/app/action/delete-game-library';
import { addGameToLibrary } from '@/app/action/add-to-library';
import { toast } from 'sonner';


interface ToggleLibraryButtonProps {
    gameId: number;
    isInLibrary: boolean;
}

export default function ToggleLibraryButton({ gameId, isInLibrary }: ToggleLibraryButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggleLibrary = () => {
        startTransition(async () => {
            try {
                if (isInLibrary) {
                    await deletegameLibrary(gameId);
                    toast.success("Game removed from library!");
                } else {
                    await addGameToLibrary(gameId);
                    toast.success("Game added to library!");
                }
            } catch (error) {
                toast.error(`Failed to ${isInLibrary ? 'remove' : 'add'} game ${isInLibrary ? 'from' : 'to'} library. Please try again.`);
            }
        });
    };

    return (
        <Button
            onClick={handleToggleLibrary}
            disabled={isPending}
            className={`absolute top-2 right-2 rounded-full p-2 transition duration-300 ease-in-out
        ${isInLibrary
                    ? 'bg-epic-500 text-white hover:bg-red-600'
                    : 'bg-white text-red-500 hover:bg-epic-500 hover:text-white'}`}
            aria-label={isInLibrary ? "Remove from library" : "Add to library"}
        >
            {isPending ? (
                <span className="animate-spin">⏳</span>
            ) : (
                <Heart size={24} fill={isInLibrary ? 'white' : 'none'} />
            )}
        </Button>
    );
}