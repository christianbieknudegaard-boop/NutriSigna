import Link from "next/link";
import { recipes } from "@/data/recipes.generated";
import { foods } from "@/data/foods.generated";
import { getRecipeAutoTags } from "@/lib/auto-tags";
import { computeAutoFodmapForRecipe } from "@/lib/auto-fodmap";
import { findFoodByIngredientName } from "@/lib/food-lookup";
import { emptyNutrients, addNutrients, scalePer100g, topMissing } from "@/lib/nutrition";
import { parseAmount, toGramsApprox } from "@/lib/units";
import { rdiPct, NUTRIENT_LABELS, NUTRIENT_UNITS, type NutrientKey } from "@/lib/rdi";
import RecipeActions from "@/components/RecipeActions";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { RecipeImageAuto } from "@/components/RecipeImageAuto";
import TagChips from "@/components/TagChips";
import SafetyToggle from '@/components/SafetyToggle'
import Card, { CardContent } from '../../../ibd-ibs-pcos-core/components/ui/Card'
import StickyCTA from '../../../ibd-ibs-pcos-core/components/ui/StickyCTA'
import dynamic from 'next/dynamic'

const WarningsModal = dynamic(() => import('@/components/WarningsModal'))

export default async function RecipeDetail({ params }: { params: { id: string } }) {
  const { id } = await params as { id: string };
  const r = recipes.find(x => x.id === id);
  if (!r) return <div>Fant ikke oppskriften.</div>;

  // Fetch deterministic recipe trigger score from our server API (server-side)
  let score = 0;
  let support = 0;
  try {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const res = await fetch(`${base}/api/insights/recipe-score?recipeId=${id}`, { cache: 'no-store' });
    const jd = await res.json();
    score = Math.round(jd?.score ?? 0);
    support = jd?.support ?? 0;
  } catch (e) {
    // ignore and keep defaults
  }

  const tags = getRecipeAutoTags(r);
  const autoFodmap = computeAutoFodmapForRecipe(r);

  // Calculate total nutrition
  let totalNutrition = emptyNutrients();
  for (const ingredient of r.ingredients) {
    const food = findFoodByIngredientName(foods, ingredient.name);
    if (food && food.nutritionPer100g) {
      const parsed = parseAmount(ingredient.amount);
      const grams = toGramsApprox(parsed);
      const scaled = scalePer100g(food.nutritionPer100g, grams);
      totalNutrition = addNutrients(totalNutrition, scaled);
    }
  }

  // Per serving
  const servings = Math.max(1, r.servings || 1);
  const perServing = {
    kcal: totalNutrition.kcal / servings,
    protein_g: totalNutrition.protein_g / servings,
    carbs_g: totalNutrition.carbs_g / servings,
    fat_g: totalNutrition.fat_g / servings,
    fiber_g: totalNutrition.fiber_g / servings,
    vitamin_c_mg: totalNutrition.vitamin_c_mg / servings,
    vitamin_d_ug: totalNutrition.vitamin_d_ug / servings,
    vitamin_b12_ug: totalNutrition.vitamin_b12_ug / servings,
    folate_ug: totalNutrition.folate_ug / servings,
    iron_mg: totalNutrition.iron_mg / servings,
    calcium_mg: totalNutrition.calcium_mg / servings,
    magnesium_mg: totalNutrition.magnesium_mg / servings,
    zinc_mg: totalNutrition.zinc_mg / servings
  };

  const missing = topMissing(perServing);

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
    <div className="space-y-6 p-4">
      {/* Trigger score */}
      <Section>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-slate-600">Trigger score:</span>
          <Badge variant={score > 50 ? 'red' : score > 20 ? 'yellow' : 'green'}>{score}%</Badge>
          <span className="text-xs text-slate-500">(support: {support})</span>
          <a className="text-sm text-blue-600 hover:underline" href="/insights/triggers">Se detaljer</a>
        </div>
      </Section>
      <Link href="/recipes" className="text-sm text-blue-600 hover:underline inline-block">
        ← Tilbake til oppskrifter
      </Link>
      
      {/* Recipe Image */}
      <Card>
        <RecipeImageAuto 
          recipeId={r.id}
          title={r.title}
          description={r.description}
          ingredients={r.ingredients.map(i => i.name)}
        />
      </Card>
      {/* Header / Hero */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{r.title}</h1>
        <p className="text-sm text-[var(--muted)]">{r.description}</p>
        <div className="flex items-center gap-3">
          <RecipeActions recipeId={r.id} defaultServings={r.servings ?? 4} />
          <SafetyToggle kind="recipe" refId={r.id} initial={undefined} />
        </div>
      </div>

      {/* FODMAP Analysis */}
      <Section title="FODMAP-analyse">
        <div className="space-y-3">
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Auto:</span>
              <Badge variant={autoFodmap.overall === 'green' ? 'green' : autoFodmap.overall === 'yellow' ? 'yellow' : 'red'}>
                {autoFodmap.overall.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">CSV:</span>
              <Badge variant={r.fodmap === 'green' ? 'green' : r.fodmap === 'yellow' ? 'yellow' : 'red'}>
                {r.fodmap.toUpperCase()}
              </Badge>
            </div>
          </div>

          {autoFodmap.reasons.length > 0 ? (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Hvorfor denne vurderingen:</h4>
              <ul className="space-y-1.5">
                {autoFodmap.reasons.map((reason, idx) => (
                  <li key={idx} className="text-sm">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      reason.traffic === "red" ? "bg-red-500" : "bg-yellow-500"
                    }`}></span>
                    <span className="font-medium">{reason.ingredient}:</span>{" "}
                    <span className="text-slate-600">{reason.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              ✓ Ingen kjente FODMAP-triggere funnet i regelsettet.
            </p>
          )}

          <p className="text-xs text-slate-500 italic">
            ⚠️ Auto-FODMAP er en start-heuristikk og kan avvike fra Monash University database.
          </p>
        </div>
      </Section>

      {/* Tags */}
      {tags.length > 0 && (
        <Section title="Auto-genererte tags">
          <TagChips tags={tags} />
        </Section>
      )}

      {/* Nutrition */}
      <Section title="Næring per porsjon">
        <div className="space-y-4">
          {/* Macros */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Energi</div>
              <div className="text-lg font-bold text-slate-800">{Math.round(perServing.kcal)} kcal</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Protein</div>
              <div className="text-lg font-bold text-slate-800">{perServing.protein_g.toFixed(1)} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Karbohydrater</div>
              <div className="text-lg font-bold text-slate-800">{perServing.carbs_g.toFixed(1)} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Fett</div>
              <div className="text-lg font-bold text-slate-800">{perServing.fat_g.toFixed(1)} g</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-xs text-slate-600 mb-1">Fiber</div>
              <div className="text-lg font-bold text-slate-800">{perServing.fiber_g.toFixed(1)} g</div>
            </div>
          </div>

          {/* Micronutrients */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Vitaminer & Mineraler</h4>
            <div className="space-y-2">
              {micronutrients.map(key => {
                const value = perServing[key];
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
          </div>

          {/* Missing nutrients */}
          {missing.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Mangler mest:</h4>
              <div className="flex flex-wrap gap-2">
                {missing.map(item => (
                  <Badge key={item.key} variant="default">
                    {item.label}: {item.pct}% RDI
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-slate-500 italic">
            ⚠️ Næringsverdier er estimater basert på ingrediens-matching og kan avvike fra faktiske verdier.
          </p>
        </div>
      </Section>

      {/* Ingredients */}
      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Ingredienser</h3>
          <ul className="space-y-2">
            {r.ingredients.map((i, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>{i.name} {i.amount ?? ""}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardContent>
          <h3 className="font-semibold mb-2">Fremgangsmåte</h3>
          <ol className="space-y-3">
            {r.steps.map((s, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium">{idx + 1}</span>
                <span className="flex-1 pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <StickyCTA>
        <button className="w-full bg-[var(--accent)] text-white px-4 py-3 rounded-lg">Legg til i ukeplan</button>
      </StickyCTA>
    </div>
  );
}
