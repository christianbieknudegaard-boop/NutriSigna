import Link from "next/link";
import { foods } from "@/data/foods";

export default function FoodsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Matvarer</h1>
      <ul className="space-y-2">
        {foods.map(f => (
          <li key={f.id} className="rounded border bg-white p-3">
            <Link href={`/foods/${f.id}`} className="font-medium">{f.name}</Link>
            <p className="text-sm text-slate-600">{f.group}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
