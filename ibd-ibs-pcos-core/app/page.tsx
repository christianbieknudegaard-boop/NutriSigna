import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">CORE</h1>
      <p className="text-slate-700">Stabil base: Oppskrifter + Matvarer.</p>
      <div className="flex gap-3">
        <Link className="underline" href="/recipes">Oppskrifter</Link>
        <Link className="underline" href="/foods">Matvarer</Link>
      </div>
    </div>
  );
}
