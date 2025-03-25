import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes = [
    { path: "/", whenAuthenticated: "next" },
    { path: "/login", whenAuthenticated: "redirect" },
    { path: "/create-account", whenAuthenticated: "redirect" }
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login"
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/ice-creams"

export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname
    const accessToken = request.cookies.get("access_token")
    const publicRoute = publicRoutes.find(
        (route) => route.path === path
    )

    if (accessToken) {
        if (publicRoute?.whenAuthenticated === "redirect") {
            const url = request.nextUrl.clone()
            url.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE
            return NextResponse.redirect(url)
        }
        return NextResponse.next()
    }

    if (!publicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
