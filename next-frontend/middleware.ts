import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    const protectedPaths = ['/home', '/dashboard', '/costs', '/profile', '/settings'];

    // Paths that are only for public (unauthenticated) users
    const authPaths = ['/login', '/register'];

    // Check if the current path is protected
    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

    // Check if the current path is an auth path
    const isAuthPath = authPaths.some(path => pathname.startsWith(path));

    // Case 1: Trying to access protected route without token -> Redirect to Login
    if (isProtectedPath && !token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Case 2: Trying to access auth pages (login/register) WITH token -> Redirect to Home
    if (isAuthPath && token) {
        const homeUrl = new URL('/home', request.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

