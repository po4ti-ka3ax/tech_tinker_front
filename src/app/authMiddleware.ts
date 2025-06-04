import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isAuth = Boolean(request.cookies.get('access_token'));

    const protectedPaths = ['/profile','/admin'];
    const pathname = request.nextUrl.pathname;

    if(protectedPaths.includes(pathname) && !isAuth) {
        return NextResponse.redirect(new URL('/auth/signin',request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*','/profile/:path*']
}