# The Kingdom Voices — Hero Section

Production-ready React + Vite hero for **THE KINGDOM VOICES — Season 1**, matching the luxury concert-stage poster aesthetic (warm amber spotlights, metallic gold title, full-bleed microphone stage).

Live staging reference: [tkv-staging.web.app](https://tkv-staging.web.app)

## Quick start

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Hero assets

Place responsive backgrounds in `public/assets/`:

| File | Use |
|------|-----|
| `public/assets/hero-bg-desktop.jpg` | Desktop / tablet (`min-width: 768px`) |
| `public/assets/hero-bg-mobile.jpg` | Mobile default |

The `HeroSection` loads them via `<picture>` + `<source media="...">` so only the appropriate asset is requested.

Vite serves anything under `public/` at the site root — no import required:

```tsx
<img src="/assets/hero-bg-mobile.jpg" alt="" />
```

Optional: import from `src/assets` if you prefer hashed filenames:

```tsx
import heroDesktop from '../assets/hero-bg-desktop.jpg'
```

## Component usage

```tsx
import { HeroSection } from './components/HeroSection'

export default function App() {
  return (
    <main>
      <HeroSection
        registerHref="/register"
        watchHref="#auditions"
      />
    </main>
  )
}
```

## Stack

- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (entrance + `prefers-reduced-motion` support)
- Cinzel (display) + Outfit (UI)

## Design notes

- Palette: stage `#100704`, amber `#4A1208`, spotlight `#FFF3E0`, gold `#D4AF37` / `#F3E5AB` / `#AA771C`
- Overlay: `from-black/60 → transparent → #100704` for WCAG AA contrast on text and CTAs
- Title uses a shimmering gold gradient with drop shadows for readability over the stage image
