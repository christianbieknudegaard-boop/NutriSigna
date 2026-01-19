import Link from "next/link";
import { foods } from "@/data/foods.generated";
import SearchBar from '../../ibd-ibs-pcos-core/components/ui/SearchBar'
import { useState } from 'react'
import TagChips from "@/components/TagChips";

export default function FoodsPage() {
  const [q, setQ] = useState('')
  const list = foods.filter(f => f.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="p-4">
      <div className="mb-2">
        <h1 className="text-2xl font-semibold">Matvarer</h1>
        <p className="text-sm text-[var(--muted)]">FODMAP-klassifisert oversikt</p>
      </div>
      <SearchBar value={q} onChange={setQ} />

      <div className="space-y-2">
        {list.map(f=> (
          <Link key={f.id} href={`/foods/${f.id}`} className="block p-3 rounded-lg hover:bg-[var(--card)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{f.name}</div>
                <div className="text-sm text-[var(--muted)]">{f.group}</div>
              </div>
              <div className="text-sm text-[var(--muted)]">{f.fodmap}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

