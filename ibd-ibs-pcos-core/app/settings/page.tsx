 'use client';
import { useState, useEffect } from 'react';
import { getDeviceSettings, setDeviceSettings } from '@/lib/device-settings';
import { requestPushSubscription } from '@/lib/pushClient';
import { enqueueRequest, registerSync } from '@/lib/offlineOutbox';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import SettingsRow from '../../ibd-ibs-pcos-core/components/settings/SettingsRow'
import Card from '../../ibd-ibs-pcos-core/components/ui/Card'

export default function SettingsPage() {
  const [settings, setSettings] = useState(getDeviceSettings());
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => (typeof Notification !== 'undefined' ? Notification.permission : 'default'));
  const [reminderTime, setReminderTime] = useState('09:00');

  useEffect(() => {
    setSettings(getDeviceSettings());
  }, []);

  function toggleImgAuto() {
    const s = setDeviceSettings({ imgAuto: !settings.imgAuto });
    setSettings(s);
  }

  async function requestPermission() {
    if (typeof Notification === 'undefined' || !('serviceWorker' in navigator)) {
      alert('Varsler støttes ikke i denne nettleseren.');
      return;
    }
    const p = await Notification.requestPermission();
    setNotifPermission(p);
    if (p === 'granted') {
      // register a simple service worker for showing notifications if not registered
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered', reg);
        // if VAPID public key is set, offer to subscribe via Push
        // (vapid public key should be exposed from env in a safe way)
      } catch (e) {
        console.warn('SW register failed', e);
      }
    }
  }

  async function scheduleReminder() {
    try {
      // Persist reminder for the logged-in user (server will use session)
      const payload = { time: reminderTime };
      if (navigator.onLine) {
        const res = await fetch('/api/reminders/create', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) { alert('Kunne ikke planlegge påminnelse.'); return; }
      } else {
        await enqueueRequest({ url: '/api/reminders/create', method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
        await registerSync().catch(()=>{});
      }
      alert('Påminnelse lagret. Tester varsel nå...');
      // trigger a test notification via service worker
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.active) {
          reg.active.postMessage({ type: 'SHOW_NOTIFICATION', payload: { title: 'Testpåminnelse', body: `Dette er en test for ${reminderTime}` } });
        }
      }
    } catch (e) {
      console.error(e);
      alert('Feil ved planlegging');
    }
  }

  async function handleSubscribe() {
    try {
      await requestPushSubscription();
      alert('Push subscription registrert');
    } catch (e) {
      console.error(e);
      alert('Kunne ikke registrere push-subscription');
    }
  }

  async function handleUnsubscribe() {
    try {
      if (!('serviceWorker' in navigator)) {
        alert('Ingen service worker');
        return;
      }
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) { alert('Ingen SW-registrering'); return; }
      const sub = await reg.pushManager.getSubscription();
      if (!sub) { alert('Ingen aktiv subscription'); return; }
      const ok = await sub.unsubscribe();
      if (ok) alert('Push subscription fjernet'); else alert('Kunne ikke avregistrere');
    } catch (e) {
      console.error(e);
      alert('Kunne ikke avregistrere');
    }
  }

  return (
    <div className="p-4 space-y-4">
      <ServiceWorkerRegister />
      <h1 className="text-2xl font-bold">Innstillinger</h1>

      <Card>
        <div className="p-3">
          <h2 className="font-semibold">Lokal bilde-AI</h2>
          <div className="mt-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settings.imgAuto} onChange={toggleImgAuto} />
              <span>Generer bilder automatisk (lokal)</span>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-3">
          <h2 className="font-semibold">Data</h2>
          <p className="text-sm text-[var(--muted)]">Eksporter eller slett dataene dine.</p>
          <div className="mt-3">
            <button className="px-3 py-2 bg-[var(--accent)] text-white rounded-md">Eksporter data</button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-3">
          <h2 className="font-semibold">Varsler & Påminnelser</h2>
          <p className="text-sm text-[var(--muted)]">Slå på nettleservarsler og planlegg daglige påminnelser.</p>
          <div className="mt-3 space-y-3">
            <div>
              <button className="px-3 py-2 bg-[var(--accent)] text-white rounded-md mr-2" onClick={requestPermission}>Be om varseltillatelse</button>
              <span className="ml-2 text-sm text-[var(--muted)]">Status: {notifPermission}</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="input" />
              <button className="px-3 py-2 bg-[var(--accent)] text-white rounded-md" onClick={scheduleReminder}>Planlegg daglig</button>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 bg-[var(--accent)] text-white rounded-md" onClick={handleSubscribe}>Abonner på push</button>
              <button className="px-3 py-2 bg-[var(--bad)] text-white rounded-md" onClick={handleUnsubscribe}>Avslutt push</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
