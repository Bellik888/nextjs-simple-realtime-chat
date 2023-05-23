import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const redirectUrl = `/login?redirect=${request.nextUrl.pathname}`;

  if (!token) return NextResponse.redirect(new URL(redirectUrl, request.url));

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ['/blog/:path*', '/room/:path*', '/chat/:path*', '/'],
};
