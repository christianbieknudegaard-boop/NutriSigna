import Link from "next/link";
import { notFound } from "next/navigation";
import { foods } from "@/data/foods.generated";
import { getFoodAutoTags } from "@/lib/auto-tags";
import { rdiPct, NUTRIENT_LABELS, NUTRIENT_UNITS, type NutrientKey } from "@/lib/rdi";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import TagChips from "@/components/TagChips";
import SafetyToggle from '@/components/SafetyToggle'

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FoodDetailPage({ params }: Props) {
  const { id } = await params;
  const food = foods.find(f => f.id === id);

  if (!food) {
    notFound();
  }

  const tags = getFoodAutoTags(food.name);
  const n = food.nutritionPer100g;

  const micronutrients: NutrientKey[] = [
    "vitamin_c_mg",
    "vitamin_d_ug",
    "vitamin_b12_ug",
    "folate_ug",
    "iron_mg",
    "calcium_mg",
    "magnesium_mg",
    "zinc_mg"
  ];

  return (
    <div className="space-y-6">
      <Link href="/foods" className="text-sm text-blue-600 hover:underline inline-block">
        ← Tilbake til matvarer
      </Link>

      <Section>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{food.name}</h1>
            <p className="text-slate-600 mt-2">{food.group}</p>
          </div>

          <Badge variant={food.fodmap === 'green' ? 'green' : food.fodmap === 'yellow' ? 'yellow' : 'red'}>
            FODMAP: {food.fodmap.toUpperCase()}
          </Badge>

          {food.notes && (
            <p className="text-sm text-slate-600 italic">{food.notes}</p>
          )}
          <div className="mt-2"><SafetyToggle kind="food" refId={food.id} initial={undefined} /></div>
          {tags.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-slate-500 mb-2">Auto-genererte tags:</p>
              <TagChips tags={tags} />
            </div>
          )}
        </div>
      </Section>

      <Section title="Næring per 100g">
        <div className="space-y-4">
          {/* Macros */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Energi</div>
              <div className="text-lg font-bold text-slate-800">{n.kcal || 0} kcal</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Protein</div>
              <div className="text-lg font-bold text-slate-800">{n.protein_g?.toFixed(1) || 0} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Karbohydrater</div>
              <div className="text-lg font-bold text-slate-800">{n.carbs_g?.toFixed(1) || 0} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Fett</div>
              <div className="text-lg font-bold text-slate-800">{n.fat_g?.toFixed(1) || 0} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Fiber</div>
              <div className="text-lg font-bold text-slate-800">{n.fiber_g?.toFixed(1) || 0} g</div>
            </div>
          </div>

          {/* Micronutrients */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Vitaminer & Mineraler</h4>
            <div className="space-y-2">
              {micronutrients.map(key => {
                const value = n[key] || 0;
                const pct = rdiPct(key, value);
                const label = NUTRIENT_LABELS[key];
                const unit = NUTRIENT_UNITS[key];
                
                return (
                  <div key={key} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {value > 0 ? `${value.toFixed(1)} ${unit}` : "—"}
                      </span>
                      {pct !== null && pct > 0 && (
                        <Badge variant="blue">{pct}% RDI</Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 italic mt-3">
              RDI = Anbefalt daglig inntak (ca. verdier for voksne)
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

