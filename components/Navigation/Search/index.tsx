"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'

type Props = {
    className?: string
    onSearchChange?: (key: string, value: string) => void
    defaultValue?: string
    basePath?: string
}

function SearchBar({ className, basePath, onSearchChange }: Props) {

    const router = useRouter()

    const [searchValue, setSearchValue] = useState<string | null>(null)
    const [query] = useDebounce(searchValue, 300)
    const pathName = usePathname()
    const q = useSearchParams()

    const currentPath = basePath ? basePath : pathName.split('/').pop()
    const defaultValue = q.get('q') || ''

    useEffect(() => {
        if (query) {
            router.push(`/${currentPath}?q=${searchValue}`)
        } else if (!query && searchValue === '') {
            router.push(`/${currentPath}`)
        }
    }, [query, router, currentPath, searchValue])

    const handleSearch = (value: string) => {
        onSearchChange ? onSearchChange('q', value) : setSearchValue(value)
    }
    return (
        <>
            <div className="flex flex-1 justify-center">
                <div className="relative flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        defaultValue={defaultValue}
                        onChange={(e) => {
                            handleSearch(e.target.value)
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default SearchBar