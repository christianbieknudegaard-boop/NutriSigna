import Link from "next/link";
import { recipes } from "@/data/recipes.generated";
import SearchBar from '../../ibd-ibs-pcos-core/components/ui/SearchBar'
import RecipeRow from '../../ibd-ibs-pcos-core/components/recipes/RecipeRow'
import RecipeCard from '@/components/RecipeCard'
import { useState } from 'react'

export default function RecipesPage() {
  const [q, setQ] = useState('')
  const list = recipes.filter(r=> r.title.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Oppskrifter</h1>
        <p className="text-sm text-[var(--muted)]">FODMAP-klassifiserte oppskrifter</p>
      </div>
      <SearchBar value={q} onChange={setQ} />

      {/* mobile list */}
      <div className="md:hidden space-y-2">
        {list.map(r=> <RecipeRow key={r.id} recipe={r} />)}
      </div>

      {/* desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {list.map(r=> <RecipeCard key={r.id} recipe={r} />)}
      </div>
    </div>
  )
}

