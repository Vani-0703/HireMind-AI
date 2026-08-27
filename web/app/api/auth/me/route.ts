import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('hiremind_session')?.value;
  if (session !== 'authenticated') {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    email: request.cookies.get('hiremind_email')?.value ?? null,
    role: request.cookies.get('hiremind_role')?.value ?? 'CANDIDATE',
  });
}
