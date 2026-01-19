import "./globals.css";
import NavBar from "@/components/NavBar";
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import OfflineBanner from '@/components/OfflineBanner';
import ServiceWorkerUpdatePrompt from '@/components/ServiceWorkerUpdatePrompt';

export const metadata = {
  title: "NutriSignal - Mage-vennlig kosthold",
  description: "Din personlige guide til FODMAP-klassifiserte oppskrifter for IBD, IBS og PCOS"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0ea5a4" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
      </head>
      <body>
        <NavBar />
        <main className="container-main">{children}</main>
        <ServiceWorkerRegister />
        <ServiceWorkerUpdatePrompt />
        <OfflineBanner />
      </body>
    </html>
  );
}
