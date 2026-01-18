import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-tight">IBD • IBS • PCOS Mat</Link>
        <nav className="flex gap-3 text-sm">
          <Link className="hover:underline" href="/recipes">Oppskrifter</Link>
          <Link className="hover:underline" href="/foods">Matvarer</Link>
        </nav>
      </div>
    </header>
  );
}
