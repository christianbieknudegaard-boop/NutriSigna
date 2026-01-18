import "./globals.css";

export const metadata = {
  title: "IBD · IBS · PCOS – Mat",
  description: "Core app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <header className="border-b bg-white px-6 py-4 font-semibold">
          IBD · IBS · PCOS – Mat
        </header>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}
