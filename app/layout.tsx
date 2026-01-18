import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "IBD · IBS · PCOS – Mat",
  description: "CORE v2 (Vercel-safe) – patches kommer etterpå."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <header className="sticky top-0 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-bold text-slate-800">IBD · IBS · PCOS – Mat</h1>
            <nav className="flex gap-4">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition">
                Hjem
              </Link>
              <Link href="/recipes" className="text-slate-600 hover:text-slate-900 transition">
                Oppskrifter
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-6">
          {children}
        </main>
        <footer className="mt-12 py-6 border-t border-slate-200 text-center text-sm text-slate-500">
          CORE v2 (Vercel-safe) – patches kommer etterpå.
        </footer>
      </body>
    </html>
  );
}
