'use client';

import { useState } from 'react';

export default function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!file) return setError('Choose a PDF or DOCX resume first.');
    setLoading(true); setError(''); setResult(null);
    const form = new FormData(); form.append('file', file);
    const response = await fetch('/api/resume/analyze', { method: 'POST', body: form });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) return setError(data.error ?? 'Analysis failed.');
    setResult(data.analysis);
  }

  return <main className="mx-auto max-w-5xl px-5 py-12">
    <h1 className="text-4xl font-black">Resume AI</h1><p className="mt-2 text-gray-500">Upload PDF/DOCX resumes for structured analysis.</p>
    <div className="mt-8 rounded-3xl border bg-white p-8">
      <label className="block text-sm font-bold">Resume file<input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => setFile(e.target.files?.[0] ?? null)} className="mt-3 block w-full rounded-xl border p-3"/></label>
      {file && <p className="mt-3 text-sm text-gray-500">Selected: {file.name}</p>}
      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <button onClick={analyze} disabled={loading} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white disabled:opacity-50">{loading ? 'Analyzing…' : 'Analyze resume'}</button>
    </div>
    {result && <section className="mt-6 rounded-3xl border bg-white p-8"><div className="flex items-end justify-between"><div><p className="text-sm text-gray-500">ATS readiness</p><p className="text-5xl font-black text-indigo-600">{result.atsScore}%</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">Analysis complete</span></div><h2 className="mt-8 text-xl font-bold">Detected skills</h2><div className="mt-3 flex flex-wrap gap-2">{result.skills.map((s:string)=><span key={s} className="rounded-lg bg-gray-100 px-3 py-2 text-sm">{s}</span>)}</div><div className="mt-8 grid gap-6 md:grid-cols-2"><div><h2 className="font-bold">Strengths</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">{result.strengths.map((s:string)=><li key={s}>{s}</li>)}</ul></div><div><h2 className="font-bold">Improvements</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">{result.improvements.map((s:string)=><li key={s}>{s}</li>)}</ul></div></div></section>}
  </main>;
}
