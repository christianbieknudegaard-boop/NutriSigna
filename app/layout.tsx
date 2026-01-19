import "./globals.css";
import AppShell from "../ibd-ibs-pcos-core/components/ui/AppShell";
import '../ibd-ibs-pcos-core/components/ui/Header'

export const metadata = {
  title: "IBD · IBS · PCOS – Mat",
  description: "CORE v2 (Vercel-safe) – patches kommer etterpå."
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <AppShell pathname={typeof window !== 'undefined' ? window.location.pathname : '/'}>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
