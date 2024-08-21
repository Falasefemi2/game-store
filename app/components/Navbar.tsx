import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Home,
    LayoutGrid,
    Package2,
    PanelLeft,
    Search,
} from "lucide-react"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { SignedIn, UserButton } from "@clerk/nextjs"

export default function Navbar() {
    return (
        <>
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                <span className="sr-only">Game Store</span>
                            </Link>
                            <Link
                                href="/"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <Home className="h-5 w-5" />
                                Home
                            </Link>
                            <Link
                                href="/search"
                                className="flex items-center gap-4 px-2.5 text-foreground"
                            >
                                <Search className="h-5 w-5" />
                                Search
                            </Link>
                            <Link
                                href="/library"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                <LayoutGrid className="h-5 w-5" />
                                Library
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/search">Search</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/library">Library</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-1 justify-center">
                    <div className="relative flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                </div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
        </>
    )
}