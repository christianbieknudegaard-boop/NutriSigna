"use client";
import { useState, useRef } from 'react';
import { generateHealthReportPDF } from '@/lib/pdf';
import { drawLineChartToCanvas } from '@/lib/pdf/chartCanvas';

export default function ReportsPage() {
  const [period, setPeriod] = useState('30');
  const [status, setStatus] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  async function makeReport() {
    setStatus('Genererer...');
    // Example: generate a small sample chart from dummy data (replace with real API data)
    const labels = Array.from({ length: Number(period) }, (_, i) => `${i+1}`);
    const values = labels.map(() => Math.round(Math.random()*10));

    const canvas = canvasRef.current!;
    const imageDataUrl = drawLineChartToCanvas(canvas, labels, values, { width: 600, height: 180 });

    const doc = await generateHealthReportPDF({ title: 'Helserapport', sections: [
      { title: 'Symptom trend', html: 'Graf over symptomtrender', imageDataUrl },
      { title: 'Oppsummering', html: 'Oppsummering av data...' }
    ] });
    doc.save('helserapport.pdf');
    setStatus('Ferdig — nedlasting startet');
  }

  async function exportClinical() {
    const res = await fetch('/api/reports/clinical-csv');
    if (!res.ok) { alert('Kun tilgjengelig for Family-plan'); return; }
    const csv = await res.text();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'clinical.csv'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Rapporter</h1>
      <div className="mt-4 card">
        <label>Periode (dager)</label>
        <select value={period} onChange={(e)=>setPeriod(e.target.value)} className="input mt-2">
          <option value="7">7</option>
          <option value="14">14</option>
          <option value="30">30</option>
        </select>
        <div className="mt-3">
          <button className="btn" onClick={makeReport}>Lag helserapport (PDF)</button>
          <button className="btn btn-ghost ml-2" onClick={exportClinical}>Clinical CSV (Family)</button>
        </div>
        <div className="mt-3 text-sm text-slate-600">{status}</div>
      </div>

      {/* Hidden canvas used to render charts before embedding in PDF */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
