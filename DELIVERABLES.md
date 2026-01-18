# CORE v2 - DELIVERABLES

## FILSTRUKTUR (Complete File Tree)

```
/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
├── next.config.js
├── tsconfig.json
├── next-env.d.ts (auto-generated)
├── tailwind.config.js
├── postcss.config.js
└── app/
    ├── globals.css
    ├── layout.tsx
    ├── page.tsx
    └── recipes/
        └── page.tsx
```

## ALLE FILER MED INNHOLD

---

### FILE: package.json

```json
{
  "name": "nutrisigna-core",
  "private": true,
  "version": "2.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.35",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1"
  }
}
```

---

### FILE: next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

---

### FILE: tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "ibd-ibs-pcos-core"
  ]
}
```

---

### FILE: tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

### FILE: postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### FILE: .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# old project structure (not part of CORE v2)
ibd-ibs-pcos-core/
```

---

### FILE: app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background: linear-gradient(to bottom, #f0f9ff, #e0f2fe);
  min-height: 100vh;
}
```

---

### FILE: app/layout.tsx

```typescript
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
```

---

### FILE: app/page.tsx

```typescript
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white/70 backdrop-blur border border-slate-200 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">CORE v2</h1>
        <p className="text-slate-700 mb-4">
          Dette er den stabile basen for Vercel deployment. Prosjektet er bygget med:
        </p>
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-6">
          <li>Next.js 14.2.35 (App Router)</li>
          <li>React 18.3.1</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
        </ul>
        <p className="text-slate-600 mb-6">
          Ingen ekstra features (CSV, auto-tags, FODMAP-heuristikk, ukeplan, lokal AI). 
          Dette er kun kjernen som er klar for utvidelser senere.
        </p>
        <Link 
          href="/recipes" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition shadow-sm"
        >
          Se oppskrifter →
        </Link>
      </div>
    </div>
  );
}
```

---

### FILE: app/recipes/page.tsx

```typescript
export default function RecipesPage() {
  // Demo array med én oppskrift for routing test
  const recipes = [
    {
      id: 1,
      name: "Grillet laks med grønnsaker",
      description: "En enkel og sunn oppskrift med omega-3 rik laks og ferske grønnsaker.",
      cookTime: "25 minutter"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Oppskrifter</h1>
      <p className="text-slate-600">
        Dette er en demo-side for å teste routing. Oppskrifter vil bli lagt til senere.
      </p>
      
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id}
            className="rounded-lg bg-white/70 backdrop-blur border border-slate-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {recipe.name}
            </h2>
            <p className="text-slate-600 mb-3">
              {recipe.description}
            </p>
            <div className="text-sm text-slate-500">
              ⏱️ {recipe.cookTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## INSTRUKSJONER

### Installasjon og Kjøring

```bash
# 1. Installer avhengigheter
npm install

# 2. Start utviklingsserver
npm run dev

# 3. Åpne i nettleser
# http://localhost:3000
```

### Bygg for Produksjon

```bash
# Bygg applikasjonen
npm run build

# Start produksjonsserver
npm run start
```

### Vercel Deployment

1. Push koden til GitHub
2. Gå til Vercel (https://vercel.com)
3. Importer repository: christianbieknudegaard-boop/NutriSigna
4. **VIKTIG:** Sett Root Directory til `./` (repository root)
5. Klikk Deploy!

Vercel vil automatisk:
- Detektere Next.js
- Kjøre `npm install`
- Kjøre `npm run build`
- Deploye applikasjonen

---

## TEKNISKE DETALJER

### Versjonering
- **Next.js:** 14.2.35 (App Router) - Patched version med sikkerhetsfiks
- **React:** 18.3.1
- **TypeScript:** 5.x
- **Tailwind CSS:** 3.4.1

### Konfigurasjonsdetaljer

**next.config.js:**
- CommonJS format (`module.exports`) for å unngå ESM-quirks
- `reactStrictMode: true` aktivert

**tsconfig.json:**
- Ingen path aliases (`@/...`) - holder imports enkle
- Ekskluderer `ibd-ibs-pcos-core` (gammel struktur)

**Tailwind:**
- Minimal config
- Scoped til `app/**/*.{js,ts,jsx,tsx,mdx}`

### Sikkerhet
✅ **0 sårbarheter** - Oppgradert til Next.js 14.2.35 for å fikse:
- Denial of Service med Server Components
- Authorization bypass vulnerability
- Cache Poisoning
- Authorization Bypass i Middleware

---

## RUTER

- `/` - Hjemmeside (CORE v2 landing page)
- `/recipes` - Oppskrifter (demo med én oppskrift)

---

## FEATURES

### Inkludert (CORE v2)
✅ App Router (Next.js 14+)
✅ TypeScript
✅ Tailwind CSS styling
✅ Responsiv header med navigasjon
✅ Sticky header
✅ Main container (max-w-4xl)
✅ Footer med versjonsinformasjon
✅ To hovedruter: `/` og `/recipes`
✅ Demo oppskrift for testing

### IKKE Inkludert (kommer senere)
❌ CSV-import
❌ Auto-tags
❌ FODMAP-heuristikk
❌ Ukeplan
❌ Lokal AI

---

## VEDLIKEHOLD

### Oppdatere avhengigheter
```bash
npm update
```

### Sjekke for sårbarheter
```bash
npm audit
```

### Fikse sårbarheter
```bash
npm audit fix
```

---

**Prosjektet er klart for produksjon og Vercel deployment!** 🚀
