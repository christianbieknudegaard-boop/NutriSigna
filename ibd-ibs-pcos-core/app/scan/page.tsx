"use client";
import { useEffect, useRef, useState } from "react";
import loadQuagga from '@/lib/loadQuagga';

export default function ScanPage() {
  const [barcode, setBarcode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  async function handleSearch(q = barcode) {
    const res = await fetch("/api/foods/custom/search?q=" + encodeURIComponent(q));
    const json = await res.json();
    setResult(json);
  }

  // Barcode scanning using BarcodeDetector when available
  useEffect(() => {
    let detector: any = null;
    let rafId: number | null = null;
    let quagga: any = null;

    async function startCamera() {
      if (!videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        if ("BarcodeDetector" in window) {
          // @ts-ignore
          detector = new (window as any).BarcodeDetector({ formats: ["ean_13", "ean_8", "qr_code", "code_128"] });
          const scan = async () => {
            if (!videoRef.current) return;
            try {
              const bitmap = await createImageBitmap(videoRef.current as any);
              const detections = await detector.detect(bitmap);
              if (detections && detections.length) {
                const code = detections[0].rawValue;
                setBarcode(code);
                handleSearch(code);
                stopCamera();
                return;
              }
            } catch (e) {
              // ignore
            }
            rafId = requestAnimationFrame(scan);
          };
          rafId = requestAnimationFrame(scan);
        }
        else {
          // Fallback to Quagga for broader support
          try {
            quagga = await loadQuagga();
            quagga.init({
              inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: videoRef.current,
                constraints: { facingMode: 'environment' }
              },
              decoder: { readers: ['ean_reader', 'ean_8_reader', 'code_128_reader'] }
            }, (err: any) => {
              if (err) {
                console.error('Quagga init error', err);
                return;
              }
              quagga.start();
              quagga.onDetected((d: any) => {
                if (d && d.codeResult && d.codeResult.code) {
                  setBarcode(d.codeResult.code);
                  handleSearch(d.codeResult.code);
                  stopCamera();
                }
              });
            });
          } catch (e) {
            console.warn('Quagga fallback failed', e);
          }
        }
      } catch (err) {
        console.error("camera start failed", err);
      }
    }

    function stopCamera() {
      setScanning(false);
      if (rafId) cancelAnimationFrame(rafId);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      try {
        const Q = (window as any).Quagga;
        if (Q && Q.stop) Q.stop();
      } catch (e) {
        // ignore
      }
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        } catch (e) {
          // ignore
        }
      }
    }

    if (scanning) startCamera();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, [scanning]);

  return (
    <div className="p-6 container-main">
      <h1 className="text-2xl font-bold">Skann / Søk strekkode</h1>
      <div className="mt-4">
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="Strekkode eller navn" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          <button onClick={() => handleSearch()} className="btn">Søk</button>
        </div>

        <div className="mt-3">
          {!scanning ? (
            <button onClick={() => setScanning(true)} className="btn">Start kamera/skann</button>
          ) : (
            <button onClick={() => setScanning(false)} className="btn">Stopp skann</button>
          )}
        </div>

        {scanning && (
          <div className="mt-3">
            <video ref={videoRef} className="w-full h-auto rounded camera-preview" playsInline muted />
            <p className="text-sm text-slate-500 mt-2">Pek kamera mot strekkoden. Tillat kamera hvis bedt om det.</p>
          </div>
        )}

        {result && <pre className="mt-3 bg-slate-50 p-3 rounded">{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
}
