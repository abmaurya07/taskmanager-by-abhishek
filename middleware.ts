// middleware.ts (or middleware.js)
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';
import axios from 'axios';

// Define a function to check if a user is authenticated
const isAuthenticated = (req: NextRequest) => {
  const cookies = cookie.parse(req.headers.get('cookie') || '');
  return { token: Boolean(cookies.token), refreshToken: Boolean(cookies.refreshToken) };
};

export async function middleware(req: NextRequest) {
  const protectedPaths = ['/dashboard']; // Paths that require authentication
  const { token, refreshToken } = isAuthenticated(req);

  // If the request is for a protected path and no token is present
  if (protectedPaths.includes(req.nextUrl.pathname)) {
    if (!token) {
      if (refreshToken) {
        try {
          // Attempt to refresh the token
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh-token`, {}, { withCredentials: true });
          console.log('response.data:', response.data);
          
          // If token refresh is successful, redirect to the protected path
          if (response.data.username) {
            return NextResponse.redirect(new URL(`/dashboard?page=${response.data.username}`, req.url));
          } else {
            // If token refresh fails or response is invalid, redirect to login
            return NextResponse.redirect(new URL('/login', req.url));
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          return NextResponse.redirect(new URL('/login', req.url));
        }
      } else {
        // No token or refresh token, redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Apply middleware to all routes except API, static, public, and favicon.ico
export const config = {
  matcher: ['/((?!api|static|public|favicon.ico).*)'],
};
