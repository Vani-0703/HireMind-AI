import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/login?logged_out=1', request.url), 303);
  response.cookies.delete('hiremind_session');
  response.cookies.delete('hiremind_email');
  response.cookies.delete('hiremind_role');
  return response;
}
