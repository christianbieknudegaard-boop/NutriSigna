'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { recipes } from '@/data/recipes.generated';
import { 
  getPlan, 
  removeFromPlan, 
  updateServings, 
  clearPlan, 
  generateShoppingFromPlan,
  setShopping as saveShoppingToStorage,
  getShopping,
  type PlanDay, 
  type PlanItem,
  type ShoppingItem 
} from '@/lib/plan';
import { subscribeStorage } from '@/lib/storage';
import { getRecipeImage } from '@/lib/recipe-image-store';
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { ShoppingList } from '@/components/ShoppingList';

export default function PlanPage() {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [keepManualItems, setKeepManualItems] = useState(true);
  const [showRegenerateHint, setShowRegenerateHint] = useState(false);

  useEffect(() => {
    // Load initial data
    setPlan(getPlan());
    setShopping(getShopping());

    // Subscribe to plan changes
    const unsubscribePlan = subscribeStorage<PlanItem[]>('plan-v1', (newPlan) => {
      setPlan(newPlan);
      setShowRegenerateHint(true);
    });

    // Subscribe to shopping changes
    const unsubscribeShopping = subscribeStorage<ShoppingItem[]>('shopping-v1', (newShopping) => {
      setShopping(newShopping);
    });

    return () => {
      unsubscribePlan();
      unsubscribeShopping();
    };
  }, []);

  const handleRemove = (id: string) => {
    removeFromPlan(id);
  };

  const handleUpdateServings = (id: string, delta: number) => {
    const item = plan.find(p => p.id === id);
    if (item) {
      updateServings(id, item.servings + delta);
    }
  };

  const handleGenerateShopping = () => {
    const newShopping = generateShoppingFromPlan({
      plan,
      recipes,
      keepManualItems
    });
    saveShoppingToStorage(newShopping);
    setShopping(newShopping);
    setShowRegenerateHint(false);
  };

  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleSuggest = async () => {
    setLoadingSuggestions(true);
    try {
      const res = await fetch('/api/suggestions/from-shopping');
      const jd = await res.json();
      if (jd?.ok) setSuggestions(jd.suggestions || []);
    } catch (e) {
      console.error('suggest error', e);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleClearPlan = () => {
    if (confirm('Tøm hele ukeplanen?')) {
      clearPlan();
      setShowRegenerateHint(false);
    }
  };

  const days: PlanDay[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayNames: Record<PlanDay, string> = {
    Mon: 'Mandag',
    Tue: 'Tirsdag',
    Wed: 'Onsdag',
    Thu: 'Torsdag',
    Fri: 'Fredag',
    Sat: 'Lørdag',
    Sun: 'Søndag'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Ukeplan</h1>
          <p className="text-slate-600 mt-2">Planlegg måltider for uken og generer handleliste</p>
        </div>
        <div className="flex gap-2">
          <Link href="/recipes">
            <Button variant="outline">+ Legg til oppskrift</Button>
          </Link>
          {plan.length > 0 && (
            <Button variant="ghost" onClick={handleClearPlan}>
              🗑️ Tøm plan
            </Button>
          )}
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {days.map(day => {
          const dayItems = plan.filter(item => item.day === day);
          
          return (
            <Section key={day} className="min-h-[200px]">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">{dayNames[day]}</h2>
              
              {dayItems.length === 0 ? (
                <p className="text-sm text-slate-500 italic">Ingen måltider planlagt</p>
              ) : (
                <div className="space-y-3">
                  {dayItems.map(item => {
                    const recipe = recipes.find(r => r.id === item.recipeId);
                    if (!recipe) return null;

                    const image = getRecipeImage(recipe.id);

                    return (
                      <div key={item.id} className="p-3 bg-slate-50 rounded-xl space-y-2">
                        {/* Recipe Image */}
                        {image && (
                          <div className="h-24 rounded-lg overflow-hidden">
                            <img src={image} alt={recipe.title} className="w-full h-full object-cover" />
                          </div>
                        )}

                        {/* Recipe Info */}
                        <Link href={`/recipes/${recipe.id}`} className="font-medium text-slate-800 hover:text-blue-600 block">
                          {recipe.title}
                        </Link>

                        {/* Servings Control */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateServings(item.id, -1)}
                              disabled={item.servings <= 1}
                              className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 disabled:opacity-50 flex items-center justify-center text-sm font-bold"
                            >
                              −
                            </button>
                            <span className="text-sm font-medium">{item.servings} porsjoner</span>
                            <button
                              onClick={() => handleUpdateServings(item.id, 1)}
                              className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Fjern
                          </button>
                        </div>

                        {/* FODMAP Badge */}
                        {recipe.fodmap && (
                          <Badge variant={recipe.fodmap === 'green' ? 'green' : recipe.fodmap === 'yellow' ? 'yellow' : 'red'}>
                            {recipe.fodmap.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>
          );
        })}
      </div>

      {/* Shopping List */}
      {plan.length > 0 && (
        <div className="space-y-4">
          <Section>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-800">Handleliste</h2>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={keepManualItems}
                      onChange={(e) => setKeepManualItems(e.target.checked)}
                      className="rounded"
                    />
                    Behold manuelle varer
                  </label>
                  <Button variant="outline" onClick={handleGenerateShopping}>
                    🔄 Generer handleliste
                  </Button>
                  <Button variant="ghost" onClick={handleSuggest}>
                    {loadingSuggestions ? 'Forslår…' : 'Forslå oppskrifter'}
                  </Button>
                </div>
              </div>

              {showRegenerateHint && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                  💡 Ukeplanen er endret. Trykk "Generer handleliste" for å oppdatere mengder.
                </div>
              )}
            </div>
          </Section>

          <Section>
            <ShoppingList shopping={shopping} />
            {suggestions && (
              <div className="mt-4 p-4 bg-white/60 rounded-xl border border-slate-100">
                <h4 className="font-semibold mb-2">Forslag fra handlelisten</h4>
                {suggestions.length === 0 && <div className="text-sm text-slate-500">Ingen forslag funnet.</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {suggestions.map(id => {
                    const r = recipes.find(rr => rr.id === id);
                    if (!r) return null;
                    const img = getRecipeImage(r.id);
                    return (
                      <Link key={id} href={`/recipes/${id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        {img ? <img src={img} alt={r.title} className="w-16 h-12 object-cover rounded-md" /> : <div className="w-16 h-12 bg-slate-100 rounded-md" />}
                        <div>
                          <div className="text-sm font-medium text-slate-800">{r.title}</div>
                          <div className="text-xs text-slate-500">{(r as any).duration || '—'} • {(r as any).portions || '—'}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </Section>
        </div>
      )}

      {/* Empty State */}
      {plan.length === 0 && (
        <Section>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Ingen måltider planlagt ennå</h3>
            <p className="text-slate-600 mb-4">Gå til oppskrifter og legg til måltider i ukeplanen din</p>
            <Link href="/recipes">
              <Button>Utforsk oppskrifter</Button>
            </Link>
          </div>
        </Section>
      )}
    </div>
  );
}
