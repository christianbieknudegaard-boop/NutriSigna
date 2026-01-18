export default function RecipesPage() {
  // Demo array med én oppskrift for routing test
  const recipes = [
    {
      id: 1,
      name: "Grillet laks med grønnsaker",
      description: "En enkel og sunn oppskrift med omega-3 rik laks og ferske grønnsaker.",
      cookTime: "25 minutter"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Oppskrifter</h1>
      <p className="text-slate-600">
        Dette er en demo-side for å teste routing. Oppskrifter vil bli lagt til senere.
      </p>
      
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            className="rounded-lg bg-white/70 backdrop-blur border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {recipe.name}
            </h2>
            <p className="text-slate-600 mb-3">
              {recipe.description}
            </p>
            <div className="text-sm text-slate-500">
              ⏱️ {recipe.cookTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
