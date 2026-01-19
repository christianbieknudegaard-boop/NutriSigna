import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';
import { addRecipeToPlanServer } from '@/lib/plan';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  const { recipeId, day } = await req.json();
  // load recipe from data
  const recipes = (await import('@/data/recipes.generated')).recipes;
  const recipe = recipes.find((r:any)=>r.id===recipeId);
  if (!recipe) return NextResponse.json({ ok:false, error:'not_found' }, { status:404 });
  const result = await addRecipeToPlanServer(userId, recipe, day || 'Mon', 1);
  return NextResponse.json({ ok: true, warnings: result.warnings });
}
