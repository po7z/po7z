# The Kingdom Voices hero

A responsive React + Vite hero based on the Season 1 concert poster.

## Run locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Hero assets

Export the supplied poster artwork into these files:

```text
public/
└── assets/
    ├── hero-bg-desktop.jpg  # Recommended: 1920 × 1080 or larger
    └── hero-bg-mobile.jpg   # Recommended: 1080 × 1920 or larger
```

The `<picture>` in `src/components/HeroSection.jsx` loads only the appropriate
asset at the `768px` breakpoint. JPEG, WebP, or AVIF exports can be used; update
the two paths in `HERO_IMAGES` when changing formats.

Import the reusable component with:

```jsx
import HeroSection from "./components/HeroSection";

export default function Page() {
  return (
    <HeroSection
      registerHref="/register"
      auditionsHref="/auditions"
    />
  );
}
```

The hero uses plain CSS, so no Tailwind dependency or configuration is required.
