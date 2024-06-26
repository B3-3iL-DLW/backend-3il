import {NextRequest, NextResponse} from 'next/server'
import {decrypt} from '@/app/lib/session'
import {cookies} from 'next/headers'


const protectedRoutes = ['/timetable', '/users', '/']
const publicRoutes = ['/login', '/register']

export default async function middleware(req: NextRequest) {

    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)


    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)


    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }


    if (isPublicRoute && session?.userId) {
        if (req.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/users', req.nextUrl))
        } else if (!req.nextUrl.pathname.startsWith('/timetable')) {
            return NextResponse.redirect(new URL('/timetable', req.nextUrl))
        }
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}