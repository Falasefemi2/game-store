import * as React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Navbar, Sidebar } from "@/components/Navigation"
import GameBanner from "@/components/FeaturedGames/GameBanner"
import { Suspense } from 'react'
import { getSevenGameThumbnails } from "../action/get-game-banner";
import GameSkeleton from "@/components/FeaturedGames/GameSkeleton";
import TopFreeGame from "@/components/FeaturedGames/TopFreeGame";
import { Skeleton } from "@/components/ui/skeleton";

interface PageProps {
  searchParams: { page?: string };
}

export default async function HomePage({ searchParams }: PageProps) {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-up")
  }

  const gamesbanner = await getSevenGameThumbnails()


  return (
    <>
      <main className="flex flex-1 flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <GameBanner gamesbanner={gamesbanner} />
        <TopFreeGame searchParams={searchParams} />
      </main>

    </>

  )
}



function TopgameLoading() {
  return (
    <div>
      <h1 className="font-medium text-2xl my-6 mt-16">TOP FREE GAMES</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} className="relative border rounded-lg overflow-hidden shadow-lg group">
            <Skeleton className="w-full h-64 bg-gray-300 animate-pulse"></Skeleton>
            <Skeleton className="absolute inset-0 bg-black opacity-0"></Skeleton>
            <Skeleton className="p-4">
              <Skeleton className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></Skeleton>
            </Skeleton>
          </Skeleton>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center space-x-4">
        <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
}


