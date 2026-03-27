# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development server dengan Turbopack
npm run build     # Production build (static export ke /out)
npm run lint      # Jalankan ESLint
npm start         # Start production server lokal
```

## Architecture

Portfolio website statis yang di-deploy ke GitHub Pages menggunakan Next.js App Router dengan `output: 'export'`.

### Struktur penting

- **`src/app/page.tsx`** — Satu-satunya halaman (`"use client"`), berisi seluruh layout portfolio: Navbar, Hero, About, Skills, Education & Experience, Contact, Footer.
- **`src/constants/resumeData.ts`** — Single source of truth untuk semua konten portfolio (bio, skills, experience, education, contact). Selalu update file ini saat mengubah konten.
- **`src/app/layout.tsx`** — Root layout dengan metadata SEO dan Open Graph.
- **`src/app/globals.css`** — Import Bootstrap Icons (CDN), Tailwind CSS v4, custom `.glow-hover` class.
- **`.github/workflows/deploy.yml`** — CI/CD ke GitHub Pages: push ke `main` → build → deploy dari folder `out/`.

### Stack teknis

- **Next.js 16** (App Router, static export)
- **React 19** dengan Babel React Compiler
- **TypeScript 5** (strict mode, path alias `@/*` → `./src/*`)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **AOS** untuk scroll animations
- **Bootstrap Icons** via CDN

### Pola penting

- `next.config.ts` menggunakan `output: 'export'` dan `images.unoptimized: true` — wajib untuk GitHub Pages (tidak ada server).
- Semua konten dinamis (teks, data) ada di `resumeData.ts`, bukan hard-coded di komponen.
- Folder `legacy/` berisi versi HTML lama portfolio — tidak digunakan dalam build.
