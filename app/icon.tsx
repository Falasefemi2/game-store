import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = {
    width: 32,
    height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
    const iconPath = join(process.cwd(), 'public', 'epic-games-2.svg')
    const icon = readFileSync(iconPath)

    return new NextResponse(icon, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    })
}