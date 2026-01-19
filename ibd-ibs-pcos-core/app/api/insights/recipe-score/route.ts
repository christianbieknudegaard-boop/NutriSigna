import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { computeTriggerScores } from '@/lib/analytics/triggers';

// local fallback data for environments without a DATABASE_URL
import { recipes } from '@/data/recipes';
import { foods } from '@/data/foods';

function simpleScoreFromRecipe(recipe: any) {
  // deterministic pseudo-score based on ingredient count and known 'trigger' foods
  const triggerFoods = new Set(['onion', 'garlic', 'wheat', 'milk', 'eggs', 'peanut']);
  const ingredients = (recipe?.ingredients || []).map((i: any) => {
    if (typeof i === 'string') return i.toLowerCase();
    if (i && typeof i.name === 'string') return i.name.toLowerCase();
    return String(i).toLowerCase();
  });
  const matches = ingredients.filter((ing: string) => Array.from(triggerFoods).some(t => ing.includes(t)));
  const support = Math.min(10, matches.length);
  const score = Math.max(0, 100 - support * 10);
  return { score, support };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const recipeId = url.searchParams.get('recipeId');
  if (!recipeId) return NextResponse.json({ error: 'Missing recipeId' }, { status: 400 });

  try {
    // attempt a Prisma-backed computation if DB is configured
    const meals = await prisma.mealEntry.findMany({ where: { recipeId } });
    const dates = Array.from(new Set(meals.map((m: any) => m.date)));
    const prevDates = dates.map((d: string) => { const dd = new Date(d); dd.setDate(dd.getDate() - 1); return dd.toISOString().slice(0,10); });
    const allDates = Array.from(new Set([...dates, ...prevDates]));
    const symptoms = await prisma.symptomEntry.findMany({ where: { date: { in: allDates } } });
    const triggers = computeTriggerScores(meals, symptoms);
    const key = `recipe:${recipeId}`;
    const t = triggers.find((x: any) => x.key === key);
    return NextResponse.json({ ok: true, score: t ? t.score : 0, support: t ? t.support : 0 });
  } catch (err: any) {
    // likely missing DATABASE_URL in dev — fall back to deterministic local heuristic
    const r = recipes.find((x: any) => String(x.id) === String(recipeId));
    if (!r) return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    const s = simpleScoreFromRecipe(r);
    return NextResponse.json({ ok: true, score: s.score, support: s.support, fallback: true });
  }
}
