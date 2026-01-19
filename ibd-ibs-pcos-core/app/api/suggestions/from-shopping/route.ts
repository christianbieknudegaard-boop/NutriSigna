import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';
import { suggestFromShoppingList } from '@/lib/suggestions';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  // try DB-backed shopping list (planDoc) then fallback
  const pd = await (prisma as any).planDoc.findUnique({ where: { userId } });
  let shopping: string[] = [];
  if (pd && pd.shoppingJson) {
    try { shopping = JSON.parse(pd.shoppingJson || '[]'); } catch(e) { shopping = []; }
  }
  // if empty, try to read lightweight shopping table (if present)
  if (!shopping || shopping.length === 0) {
    try {
      const items = await (prisma as any).shoppingItem.findMany({ where: { userId } });
      shopping = items.map((i:any)=>i.name || '').filter(Boolean);
    } catch (e) {
      // ignore
    }
  }
  // load candidate recipes
  let recipes: any[] = [];
  try { recipes = await (prisma as any).recipe.findMany({ where: {}, take: 500 }); } catch(e) { recipes = []; }

  const suggestions = await suggestFromShoppingList(shopping, recipes);
  return NextResponse.json({ ok: true, suggestions });
}
