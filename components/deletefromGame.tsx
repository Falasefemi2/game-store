"use client";

import { deletegameLibrary } from "@/app/action/delete-game-library";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

export default function DeleteFromLibrary({ gameId }: { gameId: number }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const handleAddToLibrary = () => {
        startTransition(async () => {
            try {
                await deletegameLibrary(gameId);
                toast.success("Game added to library!");
                router.push('/library');
            } catch (error) {
                toast.error("Failed to add game to library. Please try again.");
            }
        });
    };

    return (
        <Button
            onClick={handleAddToLibrary}
            disabled={isPending}
            className="absolute top-2 right-2 bg-epic-500 text-red-500 rounded-full p-2 hover:bg-epic-500 transition duration-300 ease-in-out"
            aria-label="Add to library"
        >
            {isPending ? (
                <span className="animate-spin">⏳</span>
            ) : (
                <Heart size={24} />
            )}
        </Button>
    );
}