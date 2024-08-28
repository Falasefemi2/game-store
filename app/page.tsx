import * as React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Navbar, Sidebar } from "@/components/Navigation"
import GameBanner from "@/components/FeaturedGames/GameBanner"
import { Suspense } from 'react'
import { getSevenGameThumbnails } from "./action/get-game-banner";
import GameSkeleton from "@/components/FeaturedGames/GameSkeleton";
import TopFreeGame from "@/components/FeaturedGames/TopFreeGame";

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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="flex flex-1 flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Suspense fallback={<GameSkeleton />}>
            <GameBanner gamesbanner={gamesbanner} />
          </Suspense>
          <Suspense fallback={<TopgameLoading />}>
            <TopFreeGame searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>

  )
}


function TopgameLoading() {
  return (
    <div>
      <h1 className="font-medium text-2xl my-6 mt-16">TOP FREE GAMES</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="relative border rounded-lg overflow-hidden shadow-lg group">
            <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div className="absolute inset-0 bg-black opacity-0"></div>
            <div className="p-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
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


