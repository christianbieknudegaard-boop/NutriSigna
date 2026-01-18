import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "IBD • IBS • PCOS Mat (CORE)",
  description: "Core-app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <NavBar />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
