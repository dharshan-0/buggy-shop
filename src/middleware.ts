export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - login, register
     */
    // '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|sitemap.xml|robots.txt).*)',
  ],
}