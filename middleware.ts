// middleware.ts (or middleware.js)
import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

// Define a function to check if a user is authenticated
const isAuthenticated = (req: NextRequest) => {
  // Parse cookies from the request
  const cookies = cookie.parse(req.headers.get('cookie') || '');

  // Check for the presence of an authentication token
  return Boolean(cookies.token);
};

export function middleware(req: NextRequest) {
  // Define the paths you want to protect
  const protectedPaths = ['/dashboard']; // Update with your protected paths
  console.log('isAuthenticated:', isAuthenticated(req));
  // Check if the request URL is one of the protected paths
  if (protectedPaths.includes(req.nextUrl.pathname) && !isAuthenticated(req)) {
    // Redirect to the login page if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed if authenticated
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/((?!api|static|public|favicon.ico).*)'],
};
