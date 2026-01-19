import React from 'react'

export default function RecipeRow({recipe,onClick}:{recipe:any,onClick?:()=>void}){
  return (
    <div onClick={onClick} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--card)]">
      <div className="w-14 h-14 bg-gray-100 rounded-md" />
      <div className="flex-1">
        <div className="font-medium">{recipe.title}</div>
        <div className="text-sm text-[var(--muted)]">{recipe.timeMin} min • {recipe.servings} porsjoner</div>
      </div>
      <div className="text-sm text-[var(--muted)]">•</div>
    </div>
  )
}
