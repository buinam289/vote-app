import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get('authjs.session-token');

  if (!token) {
    const url = new URL('/auth/signin', request.url);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", "/profile"
  ]
};