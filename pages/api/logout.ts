import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out' });
  response.cookies.set('token', '', { maxAge: -1 });
  response.cookies.set('refreshToken', '', { maxAge: -1 });
  return response;
}
