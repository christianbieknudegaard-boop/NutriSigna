"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enqueueRequest, registerSync } from '@/lib/offlineOutbox';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

const CONDITIONS = [
  { id: 'IBS', label: 'IBS (Irritabel tarm-syndrom)' },
  { id: 'IBD', label: 'IBD (Inflammatorisk tarmsykdom)' },
  { id: 'PCOS', label: 'PCOS' },
  { id: 'GERD', label: 'GERD/Refluks' },
  { id: 'Cøliaki', label: 'Cøliaki' },
  { id: 'Endometriose', label: 'Endometriose' },
  { id: 'Annet', label: 'Annet' },
];

const GOALS = [
  { id: 'mindre_smerte', label: 'Mindre smerte' },
  { id: 'mindre_oppblåsthet', label: 'Mindre oppblåsthet' },
  { id: 'energi', label: 'Bedre energi' },
  { id: 'vektbalanse', label: 'Vektbalanse' },
  { id: 'søvn', label: 'Bedre søvn' },
];

const PREFERENCES = [
  { id: 'glutenfri', label: 'Glutenfri' },
  { id: 'laktosefri', label: 'Laktosefri' },
  { id: 'vegetar', label: 'Vegetar' },
  { id: 'lavFODMAP', label: 'Lav FODMAP-fokus' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [conditions, setConditions] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<string[]>([]);

  const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = { conditions, goals, preferences, onboardingDone: true };
    try {
      if (navigator.onLine) {
        const res = await fetch('/api/profile/update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (res.ok) { router.push('/dashboard'); return; }
      }

      await enqueueRequest({ url: '/api/profile/update', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      await registerSync().catch(()=>{});
      router.push('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('En feil oppstod');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Velkommen til NutriSigna! 👋</h1>
          <p className="text-slate-600 mb-8">La oss tilpasse opplevelsen til dine behov.</p>

          {/* Conditions */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Hvilke tilstander har du? (valgfritt)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONDITIONS.map((c) => (
                <label key={c.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                  <input type="checkbox" checked={conditions.includes(c.id)} onChange={() => toggleItem(c.id, conditions, setConditions)} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-slate-700">{c.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Goals */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Hva er dine mål?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GOALS.map((g) => (
                <label key={g.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                  <input type="checkbox" checked={goals.includes(g.id)} onChange={() => toggleItem(g.id, goals, setGoals)} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-slate-700">{g.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Preferences */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Dine kostpreferanser</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PREFERENCES.map((p) => (
                <label key={p.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-blue-50 cursor-pointer transition">
                  <input type="checkbox" checked={preferences.includes(p.id)} onChange={() => toggleItem(p.id, preferences, setPreferences)} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-slate-700">{p.label}</span>
                </label>
              ))}
            </div>
          </section>

          <ServiceWorkerRegister />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Lagrer...' : 'Fullfør oppsett'}
          </button>
        </div>
      </div>
    </div>
  );
}
