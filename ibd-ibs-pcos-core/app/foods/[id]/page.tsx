import { foods } from "@/data/foods";

export default function FoodDetail({ params }: { params: { id: string } }) {
  const f = foods.find(x => x.id === params.id);
  if (!f) return <div>Fant ikke matvaren.</div>;
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">{f.name}</h1>
      <p className="text-slate-600">{f.group}</p>
      <p className="font-medium">FODMAP: {f.fodmap}</p>
    </div>
  );
}
