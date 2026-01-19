import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';
import { exportClinicalCSV } from '@/lib/clinical-csv';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const sub = await prisma.subscription.findUnique({ where: { userId } });
  if (!sub || sub.plan !== 'family') return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  // gather rows merged from various tables (simplified)
  const symptoms = await prisma.symptomEntry.findMany({ where: { userId } });
  const weight = await prisma.weightEntry.findMany({ where: { userId } });
  const cycle = await (prisma as any).cycleEntry.findMany({ where: { userId } });
  const meds = await (prisma as any).medicationEntry.findMany({ where: { userId } });
  const supps = await (prisma as any).supplementEntry.findMany({ where: { userId } });
  const lifestyle = await (prisma as any).lifestyleEntry.findMany({ where: { userId } });
  const snacks = await (prisma as any).snackDrinkEntry.findMany({ where: { userId } });

  // merge by date (simplified)
  const dates = Array.from(new Set([...symptoms.map((s:any)=>s.date), ...weight.map((w:any)=>w.date)]));
  const rows = dates.map((d:any) => {
    const s = symptoms.find((x:any)=>x.date===d);
    const w = weight.find((x:any)=>x.date===d);
    const l = lifestyle.find((x:any)=>x.date===d);
    const c = cycle.find((x:any)=>x.date===d);
    const m = meds.filter((x:any)=>x.date===d).map((x:any)=>x.name).join(',');
    const sp = supps.filter((x:any)=>x.date===d).map((x:any)=>x.name).join(',');
    const sn = snacks.filter((x:any)=>x.date===d).map((x:any)=>x.kind).join(',');
    return { date: d, overall: s?.overall, pain: s?.pain, bloating: s?.bloating, stool: s?.stool, energy: s?.energy, mood: s?.mood, weightKg: w?.weightKg, sleepQuality: l?.sleepQuality, sleepHours: l?.sleepHours, activityMin: l?.activityMin, cyclePhase: c?.phase, flow: c?.flow, cramps: c?.cramps, meds: m, supps: sp, snacks: sn, notes: s?.notes };
  });

  const csv = exportClinicalCSV({ rows });
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv' } });
}
