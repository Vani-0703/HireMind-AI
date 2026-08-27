import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { question?: string; answer?: string } | null;
  const answer = body?.answer?.trim() ?? '';
  if (answer.length < 20) {
    return NextResponse.json({ error: 'Please provide a more detailed answer (at least 20 characters).' }, { status: 400 });
  }
  const words = answer.split(/\s+/).filter(Boolean).length;
  const score = Math.min(95, Math.max(55, 55 + Math.round(Math.min(words, 80) / 4)));
  return NextResponse.json({
    success: true,
    score,
    feedback: score >= 80 ? 'Strong answer. Add one concrete metric or outcome to make it even stronger.' : 'Good starting point. Use a clear Situation → Action → Result structure and include a specific example.',
    suggestions: ['State the context briefly', 'Explain what you personally did', 'Finish with a measurable result'],
  });
}
