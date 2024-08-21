import * as React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { Navbar, Sidebar } from "@/components/Navigation"
import GameBanner from "@/components/FeaturedGames/GameBanner"

export default async function HomePage() {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-up")
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <GameBanner />
          <div>
            Game Selection
          </div>
        </main>
      </div>
    </div>
  )
}


