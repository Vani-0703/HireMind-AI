const paths: Array<{ title: string; match: number; skills: string[] }> = [
  { title: 'AI Engineer', match: 78, skills: ['Python', 'LLM applications', 'FastAPI', 'Docker'] },
  { title: 'ML Engineer', match: 72, skills: ['Python', 'ML systems', 'Cloud', 'MLOps'] },
  { title: 'Data Scientist', match: 84, skills: ['SQL', 'Statistics', 'Experimentation', 'Python'] },
];

export default function Career() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-black">Career Intelligence</h1>
      <p className="mt-2 text-gray-500">Turn your current profile into an actionable skill roadmap.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {paths.map(({ title, match, skills }) => (
          <article key={title} className="rounded-2xl border bg-white p-6">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-5 text-4xl font-black text-indigo-600">{match}%</p>
            <p className="text-sm text-gray-500">current match</p>
            <div className="mt-6 space-y-2">
              {skills.map((skill) => (
                <div key={skill} className="rounded-lg bg-gray-50 px-3 py-2 text-sm">{skill}</div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
