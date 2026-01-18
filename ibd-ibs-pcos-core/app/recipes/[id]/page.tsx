import { recipes } from "@/data/recipes";

export default function RecipeDetail({ params }: { params: { id: string } }) {
  const r = recipes.find(x => x.id === params.id);
  if (!r) return <div>Fant ikke oppskriften.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{r.title}</h1>
      <p>{r.description}</p>
      <h2 className="font-semibold">Ingredienser</h2>
      <ul className="list-disc pl-5">
        {r.ingredients.map((i, idx) => (
          <li key={idx}>{i.name} {i.amount ?? ""}</li>
        ))}
      </ul>
      <h2 className="font-semibold">Fremgangsmåte</h2>
      <ol className="list-decimal pl-5">
        {r.steps.map((s, idx) => <li key={idx}>{s}</li>)}
      </ol>
    </div>
  );
}
