# The Kingdom Voices — Hero Section

Production-ready React + Vite hero section for **The Kingdom Voices — Season 1**, inspired by the luxury concert poster aesthetic.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to preview the hero section.

## Project Structure

```
public/
  assets/
    hero-bg-desktop.jpg   # Desktop hero background (1920×1080)
    hero-bg-mobile.jpg    # Mobile hero background (1080×1920)
src/
  components/
    HeroSection.tsx       # Reusable hero component
  App.tsx                 # Demo page
  index.css               # Tailwind + custom theme tokens
```

## Importing the Component

```tsx
import HeroSection from './components/HeroSection';

function App() {
  return (
    <HeroSection
      onRegister={() => window.location.href = '/register'}
      onWatchAuditions={() => window.location.href = '/auditions'}
    />
  );
}
```

## Replacing Background Assets

1. Export your poster art as optimized JPEGs:
   - **Desktop:** `public/assets/hero-bg-desktop.jpg` (recommended 1920×1080, ≤ 300 KB)
   - **Mobile:** `public/assets/hero-bg-mobile.jpg` (recommended 1080×1920, ≤ 200 KB)
2. Keep the same filenames so the `<picture>` element resolves correctly.
3. Alternatively, use Vite static imports for cache-busting:

```tsx
import heroDesktop from '../assets/hero-bg-desktop.jpg';
import heroMobile from '../assets/hero-bg-mobile.jpg';
```

Place imported files in `src/assets/` and pass them as props if you extend the component.

## Regenerating Placeholder Backgrounds

Placeholder gradient backgrounds are included for development. Regenerate them with:

```bash
python3 scripts/generate-hero-assets.py
```

Replace these with final poster JPEGs before production deployment.

## Build for Production

```bash
npm run build
npm run preview
```

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `stage-dark` | `#100704` | Stage background |
| `amber-deep` | `#4A1208` | Warm ambient glow |
| `gold` | `#D4AF37` | Primary accent |
| `gold-light` | `#F3E5AB` | Highlight shimmer |
| `gold-dark` | `#AA771C` | Shadow depth |
| `spotlight` | `#FFF3E0` | Text & beam highlights |

## Accessibility

- Semantic `<section>` with `aria-labelledby`
- Decorative images marked `aria-hidden`
- Gradient overlay ensures WCAG AA contrast for text and buttons
- Focus-visible outlines on interactive elements
