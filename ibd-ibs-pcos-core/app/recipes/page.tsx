import Link from "next/link";
import { recipes } from "@/data/recipes";

export default function RecipesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Oppskrifter</h1>
      <ul className="space-y-2">
        {recipes.map(r => (
          <li key={r.id} className="rounded border bg-white p-3">
            <Link href={`/recipes/${r.id}`} className="font-medium">{r.title}</Link>
            <p className="text-sm text-slate-600">{r.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
