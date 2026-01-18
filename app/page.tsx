import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white/70 backdrop-blur border border-slate-200 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">CORE v2</h1>
        <p className="text-slate-700 mb-4">
          Dette er den stabile basen for Vercel deployment. Prosjektet er bygget med:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-6">
          <li>Next.js 14.2.35 (App Router)</li>
          <li>React 18.3.1</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
        </ul>
        <p className="text-slate-600 mb-6">
          Ingen ekstra features (CSV, auto-tags, FODMAP-heuristikk, ukeplan, lokal AI). 
          Dette er kun kjernen som er klar for utvidelser senere.
        </p>
        <Link 
          href="/recipes" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
        >
          Se oppskrifter →
        </Link>
      </div>
    </div>
  );
}
