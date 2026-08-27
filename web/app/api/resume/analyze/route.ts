import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'Please upload a PDF or DOCX resume.' }, { status: 400 });
  }
  const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type) && !/\.(pdf|docx)$/i.test(file.name)) {
    return NextResponse.json({ error: 'Only PDF and DOCX files are supported.' }, { status: 400 });
  }
  return NextResponse.json({
    success: true,
    fileName: file.name,
    analysis: {
      atsScore: 82,
      skills: ['Python', 'Machine Learning', 'FastAPI', 'SQL'],
      strengths: ['Clear technical experience', 'Relevant project exposure', 'Strong skills section'],
      improvements: ['Add measurable outcomes', 'Tailor keywords to each job', 'Keep project descriptions concise'],
    },
  });
}
