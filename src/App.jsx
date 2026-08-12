import HeroSection from './components/HeroSection'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Auditions', href: '#auditions' },
  { label: 'Judges', href: '#judges' },
  { label: 'Contact', href: '#contact' },
]

/**
 * The header is rendered outside the hero so the hero stays a drop-in section.
 * It sits over the hero's top gradient overlay, which is what keeps the nav
 * links above the WCAG AA contrast threshold against the stage image.
 */
function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-8"
      >
        <a
          href="#hero"
          className="rounded-sm font-display text-sm font-bold tracking-[0.3em] text-gold-200 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-4 focus-visible:ring-offset-stage-950 focus-visible:outline-none"
        >
          TKV
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-sm text-xs font-semibold tracking-[0.2em] text-spot-100 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition-colors hover:text-gold-200 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-4 focus-visible:ring-offset-stage-950 focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/register"
          className="rounded-full border border-gold-200/45 bg-stage-950/55 px-5 py-2.5 text-[0.65rem] font-bold tracking-[0.18em] text-spot-100 uppercase backdrop-blur-sm transition-colors hover:border-gold-200 hover:text-gold-200 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stage-950 focus-visible:outline-none sm:text-xs"
        >
          Register
        </a>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-stage-950">
      <a
        href="#hero-heading"
        className="sr-only rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-stage-950 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="hero">
        <HeroSection />
      </main>
    </div>
  )
}
