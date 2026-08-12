- 👋 Hi, I’m @po7z
- 👀 I’m interested in Web Dev and Music
- 🌱 I’m currently learning Programming

<!---
po7z/po7z is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->

---

# The Kingdom Voices — Season 1

Landing hero for the Season 1 campaign, built as a React + Vite app styled with Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build
npm run lint
```

## Using the hero

`HeroSection` is self-contained and renders every string from props, so it drops into any route:

```jsx
import HeroSection from './components/HeroSection'

export default function Home() {
  return <HeroSection />
}
```

Every piece of copy has a default and can be overridden:

```jsx
<HeroSection
  tagline="Saudi Arabia's Premier Christian Singing Contest!"
  title={['The', 'Kingdom', 'Voices']}
  season="Season 2"
  description="One stage. One season."
  primaryAction={{ label: 'Register Now', href: '/register' }}
  secondaryAction={{ label: 'Watch Auditions', href: '/auditions' }}
  domain="www.thekingdomvoices.com"
  domainHref="https://www.thekingdomvoices.com"
/>
```

The `title` array renders one line per entry, and the first line is set smaller when there are two
or more — that is what produces the stacked "THE / KINGDOM / VOICES" lockup from the poster.

## Background assets

The two stage plates live in `public/assets/` and are requested at a stable URL, which lets
`index.html` preload the one that will actually be used:

```
public/assets/hero-bg-desktop.jpg   1536×1024, used in landscape
public/assets/hero-bg-mobile.jpg    1024×1536, used in portrait
```

They carry no baked-in type — the wordmark is live HTML so it stays selectable, translatable, and
crisp on any display. Swap the files in place to re-skin the hero; no code change is needed.

To have Vite fingerprint and bundle the images instead, move them into `src/assets/` and pass the
imported URLs in:

```jsx
import desktopBg from './assets/hero-bg-desktop.jpg'
import mobileBg from './assets/hero-bg-mobile.jpg'

<HeroSection desktopImage={desktopBg} mobileImage={mobileBg} />
```

If you do, drop the matching `<link rel="preload">` tags from `index.html`, since the hashed
filenames are only known after the build.

Responsive swapping is done with a native `<picture>` element keyed on orientation rather than
width alone, so a portrait tablet gets the tall crop instead of a hard centre-cut of the wide one.

## Theme

Design tokens are declared once in `src/index.css` under Tailwind v4's `@theme`, which turns them
into ordinary utilities (`bg-stage-950`, `text-gold-200`, `font-display`, `animate-gold-shimmer`):

| Token                                    | Value                         | Role                       |
| ---------------------------------------- | ----------------------------- | -------------------------- |
| `stage-950` / `stage-900`                | `#100704` / `#1A0B06`         | Stage background           |
| `ember-900` / `ember-700`                | `#4A1208` / `#7A2210`         | Warm ambient gradients     |
| `spot-100`                               | `#FFF3E0`                     | Spotlight / body text      |
| `gold-200` / `gold-500` / `gold-700`     | `#F3E5AB` / `#D4AF37` / `#AA771C` | Gold foil accents      |

The metallic wordmark comes from the `text-gold-foil` utility (a gradient clipped to the glyphs)
paired with `animate-gold-shimmer`, which sweeps the highlight band across the letterforms. Because
clipped text is itself transparent, its shadows are applied with `filter: drop-shadow(...)` via
`gold-foil-shadow` rather than `text-shadow`.

Typography is Cinzel for display and Inter for UI, loaded from Google Fonts in `index.html`. Both
fall back to system serif/sans stacks if the request is blocked.

## Accessibility notes

- A layered overlay (`from-black/60 via-transparent to-[#100704]`, plus a vignette and local scrims
  behind the copy) keeps text readable over the photographic plate. Measured against the brightest
  backdrop pixel behind each block, every text element clears the 4.5:1 WCAG AA threshold.
- All interactive elements have visible `focus-visible` rings offset against the stage colour.
- The background image is decorative (`alt=""`, `aria-hidden`), so screen readers get the headline
  once, from the `<h1>`.
- Entrance animations, the gold shimmer, and the scroll cue are all disabled under
  `prefers-reduced-motion: reduce`.
- The hero fills `min-h-screen`, upgrading to `100svh` where supported so mobile browser chrome
  doesn't push the footer link below the fold. On short viewports a `short:` variant
  (`max-height: 730px`) tightens the vertical rhythm so the whole hero still resolves in one screen.
