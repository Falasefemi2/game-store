"use client";

import React, { useState } from 'react';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { deletegameLibrary } from '@/app/action/delete-game-library';
import { addGameToLibrary } from '@/app/action/add-to-library';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';




interface ToggleLibraryButtonProps {
    gameId: number;
    initialIsInLibrary: boolean;
}

// export default function ToggleLibraryButton({ gameId, initialIsInLibrary }: ToggleLibraryButtonProps) {
//     const [isInLibrary, setIsInLibrary] = useState(initialIsInLibrary);
//     const [isPending, startTransition] = useTransition();
//     const router = useRouter()

//     const handleToggleLibrary = () => {
//         startTransition(async () => {
//             try {
//                 if (isInLibrary) {
//                     await deletegameLibrary(gameId);
//                     toast.success("Game removed from library!");
//                     setIsInLibrary(false); // Update state
//                     router.push("/library")
//                 } else {
//                     await addGameToLibrary(gameId);
//                     toast.success("Game added to library!");
//                     setIsInLibrary(true); // Update state
//                 }
//             } catch (error) {
//                 toast.error(`Failed to ${isInLibrary ? 'remove' : 'add'} game ${isInLibrary ? 'from' : 'to'} library. Please try again.`);
//             }
//         });
//     };

//     return (
//         <Button
//             onClick={handleToggleLibrary}
//             disabled={isPending}
//             className={`absolute top-2 right-2 rounded-full p-2 transition duration-300 ease-in-out
//                 ${isInLibrary
//                     ? 'bg-red-500 text-white hover:bg-red-600'
//                     : 'bg-white text-red-500 hover:bg-red-500 hover:text-white'}`}
//             aria-label={isInLibrary ? "Remove from library" : "Add to library"}
//         >
//             {isPending ? (
//                 <span className="animate-spin">⏳</span>
//             ) : (
//                 <Heart size={24} fill={isInLibrary ? 'white' : 'none'} />
//             )}
//         </Button>
//     );
// }

export default function ToggleLibraryButton({ gameId, initialIsInLibrary }: ToggleLibraryButtonProps) {
    const [isInLibrary, setIsInLibrary] = useState(initialIsInLibrary);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleToggleLibrary = () => {
        startTransition(async () => {
            try {
                if (isInLibrary) {
                    // Remove from library
                    await deletegameLibrary(gameId);
                    toast.success("Game removed from library!");
                    setIsInLibrary(false); // Update state
                    router.push("/library");
                } else {
                    // Add to library
                    await addGameToLibrary(gameId);
                    toast.success("Game added to library!");
                    setIsInLibrary(true); // Update state
                    // Uncomment if you need to refresh the page after adding
                    // router.push("/library");
                }
            } catch (error) {
                console.error("Error toggling game in library:", error); // Debugging line
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
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-red-500 hover:bg-red-500 hover:text-white'}`}
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