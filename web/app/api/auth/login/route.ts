import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim();
  const password = String(form.get('password') ?? '');

  if (!email || !password) {
    return NextResponse.redirect(new URL('/login?error=missing', request.url), 303);
  }

  // Authentication endpoint is intentionally provider-neutral. Replace the
  // credential check with your database/auth provider when connected.
  const response = NextResponse.redirect(new URL('/dashboard', request.url), 303);
  response.cookies.set('hiremind_session', 'authenticated', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.set('hiremind_email', email, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
