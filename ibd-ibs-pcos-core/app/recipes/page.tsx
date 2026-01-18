import Link from "next/link";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Oppskrifter</h1>
      <ul className="space-y-2">
        {recipes.map(r => (
          <li key={r.id} className="rounded-2xl border bg-white/70 p-4">
            <Link href={`/recipes/${r.id}`} className="font-semibold">{r.title}</Link>
            <p className="text-sm text-slate-600 mt-1">{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
