import {
    Home,
    LayoutGrid,
    Package2,
    Search,
} from "lucide-react"
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export function Sidebar() {
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Game Store</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/search"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Search className="h-5 w-5" />
                                    <span className="sr-only">Search</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Search</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/library"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <LayoutGrid className="h-5 w-5" />
                                    <span className="sr-only">Library</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Library</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>
        </>
    )
}