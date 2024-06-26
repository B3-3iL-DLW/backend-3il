import {NextRequest, NextResponse} from 'next/server'
import {middleware as authMiddleware} from '../utils/authMiddleware'

export function middleware(req: NextRequest): NextResponse {
    const response = authMiddleware(req)

    if (!req.cookies.get('jwt')) {
        return NextResponse.redirect('/login')
    }

    return response
}