import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // OAuth provider is not configured in this repository yet. Send the user
  // back to login instead of exposing a production 404 endpoint.
  return NextResponse.redirect(new URL('/login?error=google_not_configured', request.url), 303);
}
