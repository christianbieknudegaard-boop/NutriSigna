# NutriSigna CORE v2

Dette er CORE v2 - en stabil Next.js-applikasjon med App Router og Tailwind CSS, optimalisert for Vercel deployment.

## Filstruktur

```
/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── app/
    ├── globals.css
    ├── layout.tsx
    ├── page.tsx
    └── recipes/
        └── page.tsx
```

## Teknologi Stack

- **Next.js 14.2.5** (App Router)
- **React 18.3.1**
- **Tailwind CSS 3.4.1**
- **TypeScript 5**

## Funksjoner

### Core Features (v2)
- ✅ Responsiv header med navigasjon
- ✅ To hovedruter: `/` (hjem) og `/recipes` (oppskrifter)
- ✅ Minimal og pen UI med Tailwind CSS
- ✅ Sticky header med lenker
- ✅ Footer med versjonsinformasjon

### Ikke Inkludert (patches kommer senere)
- ❌ CSV-import
- ❌ Auto-tags
- ❌ FODMAP-heuristikk
- ❌ Ukeplan
- ❌ Lokal AI

## Kom i Gang

### Installasjon

```bash
npm install
```

### Utvikling

```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

### Bygg for Produksjon

```bash
npm run build
```

### Start Produksjonsserver

```bash
npm run start
```

## Vercel Deployment

1. Push koden til GitHub
2. Gå til [Vercel](https://vercel.com)
3. Importer repository
4. Sett **Root Directory** til `./` (repository root)
5. Deploy!

Vercel vil automatisk detektere Next.js og konfigurere riktig build-kommando.

## Prosjektstruktur

### `app/layout.tsx`
- Importerer `./globals.css`
- Sticky header med navnet "IBD · IBS · PCOS – Mat"
- Navigasjonslenker til `/` og `/recipes`
- Main container: `max-w-4xl`, `px-4`, `py-6`
- Footer: "CORE v2 (Vercel-safe) – patches kommer etterpå."

### `app/page.tsx`
- Hjemmeside med tittel "CORE v2"
- Forklarer at dette er stabil base for Vercel
- Knapp/lenke til `/recipes`

### `app/recipes/page.tsx`
- Demo array med én oppskrift (routing test)
- Kort-liste med enkel styling (`rounded`, `border`, `bg-white/70`)

## package.json Scripts

- `dev` - Starter utviklingsserver
- `build` - Bygger applikasjonen for produksjon
- `start` - Starter produksjonsserver

## Konfigurasjon

### next.config.js
CommonJS format (`module.exports`) for å unngå ESM-quirks.

### tsconfig.json
Ingen path aliases (`@/...`) - holder imports enkle.

### Tailwind
Minimal config, scoped til `app/**/*.{js,ts,jsx,tsx,mdx}`.

## Lisens

Private project.
