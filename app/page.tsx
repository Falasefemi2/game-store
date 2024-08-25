import * as React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Navbar, Sidebar } from "@/components/Navigation"
import GameBanner from "@/components/FeaturedGames/GameBanner"
import { Suspense } from 'react'
import { getSevenGameThumbnails } from "./action/get-game-banner";


export default async function HomePage() {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-up")
  }

  const gamesbanner = await getSevenGameThumbnails()
  return (
    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    //   <Sidebar />
    //   <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    //     <Navbar />
    //     <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
    //       <GameBanner gamesbanner={gamesbanner} />
    //     </main>
    //   </div>
    // </div>
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="flex flex-1 flex-col items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <GameBanner gamesbanner={gamesbanner} />
        </main>
      </div>
    </div>

  )
}


