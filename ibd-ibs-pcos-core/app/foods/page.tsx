import Link from "next/link";
import { foods } from "@/data/foods";

export default function FoodsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Matvarer</h1>
      <ul className="space-y-2">
        {foods.map(f => (
          <li key={f.id} className="rounded-2xl border bg-white/70 p-4">
            <Link href={`/foods/${f.id}`} className="font-semibold">{f.name}</Link>
            <p className="text-sm text-slate-600 mt-1">{f.group}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
