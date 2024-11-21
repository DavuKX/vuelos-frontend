import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {getCookie} from "@/lib/cookieUtils";

export function middleware(request: NextRequest) {
    if (!getCookie('authToken')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: '/((?!auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}