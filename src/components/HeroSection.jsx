/**
 * HeroSection — "The Kingdom Voices" landing hero.
 *
 * Assets are served from `public/` so the browser can request them at their
 * final URL and we can preload the LCP image from `index.html`. To bundle them
 * with a content hash instead, drop the files in `src/assets/` and pass the
 * imported URLs in:
 *
 *   import desktopBg from '../assets/hero-bg-desktop.jpg'
 *   import mobileBg from '../assets/hero-bg-mobile.jpg'
 *   <HeroSection desktopImage={desktopBg} mobileImage={mobileBg} />
 *
 * @typedef {{ label: string, href: string }} HeroAction
 *
 * @param {object} props
 * @param {string} [props.tagline]
 * @param {string[]} [props.title]      Rendered one line per entry; the first
 *                                      line is set smaller when there are 2+.
 * @param {string} [props.season]
 * @param {string} [props.description]
 * @param {HeroAction} [props.primaryAction]
 * @param {HeroAction} [props.secondaryAction]
 * @param {string} [props.domain]
 * @param {string} [props.domainHref]
 * @param {string} [props.desktopImage]
 * @param {string} [props.mobileImage]
 * @param {string} [props.className]
 */
export default function HeroSection({
  tagline = "Saudi Arabia's Premier Christian Singing Contest!",
  title = ['The', 'Kingdom', 'Voices'],
  season = 'Season 1',
  description = 'One stage. One season. A nationwide search for the voices that will lead a generation in worship.',
  primaryAction = { label: 'Register Now', href: '/register' },
  secondaryAction = { label: 'Watch Auditions', href: '/auditions' },
  domain = 'www.thekingdomvoices.com',
  domainHref = 'https://www.thekingdomvoices.com',
  desktopImage = '/assets/hero-bg-desktop.jpg',
  mobileImage = '/assets/hero-bg-mobile.jpg',
  className = '',
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={`relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-stage-950 ${className}`}
    >
      {/* ---------- Stage plate: mobile 9:16 swapped for desktop 16:9 ---------- */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopImage} />
        <img
          src={mobileImage}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-30 h-full w-full bg-stage-950 bg-cover bg-center object-cover object-center"
        />
      </picture>

      {/* ---------- Contrast + atmosphere overlays ---------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-b from-black/60 via-transparent to-[#100704]"
      />
      {/* Warm ember wash so the amber grade survives the darkening overlay. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_90%_at_50%_115%,rgba(74,18,8,0.85)_0%,rgba(74,18,8,0.35)_38%,transparent_70%)] mix-blend-screen"
      />
      {/* Vignette keeps focus centre-stage and lifts text contrast at the edges. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(75%_60%_at_50%_38%,transparent_0%,rgba(16,7,4,0.55)_72%,rgba(16,7,4,0.92)_100%)]"
      />
      {/* Top-down spotlight cone. */}
      <div
        aria-hidden="true"
        className="absolute -top-1/3 left-1/2 -z-10 h-[120%] w-[160%] -translate-x-1/2 animate-beam-sway bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(255,243,224,0.10)_16deg,transparent_34deg,transparent_146deg,rgba(255,243,224,0.08)_166deg,transparent_184deg)] blur-[2px]"
      />
      {/* Particle dust caught in the beams. */}
      <div
        aria-hidden="true"
        className="stage-dust absolute inset-0 -z-10 animate-dust-drift opacity-70"
      />
      {/* Local scrim directly behind the wordmark for guaranteed AA contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[14%] -z-10 h-[58%] bg-[radial-gradient(60%_50%_at_50%_50%,rgba(16,7,4,0.72)_0%,rgba(16,7,4,0.35)_55%,transparent_100%)]"
      />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-6 pt-28 pb-12 text-center sm:px-8 sm:pt-32 lg:pt-36">
        <p
          className="animate-rise-in flex items-center gap-4 font-display text-[0.7rem] leading-relaxed font-semibold tracking-[0.28em] text-gold-200 uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:gap-6 sm:text-sm sm:tracking-[0.34em]"
          style={{ animationDelay: '80ms' }}
        >
          <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-r from-transparent to-gold-500/70 sm:block" />
          <span className="max-w-md text-balance">{tagline}</span>
          <span aria-hidden="true" className="hidden h-px w-10 bg-gradient-to-l from-transparent to-gold-500/70 sm:block" />
        </p>

        <h1
          id="hero-heading"
          className="animate-rise-in gold-foil-shadow mt-8 font-display leading-[0.86] font-black tracking-[0.02em] uppercase sm:mt-10"
          style={{ animationDelay: '200ms' }}
        >
          {title.map((line, index) => (
            <span
              key={line}
              className={`text-gold-foil block animate-gold-shimmer ${
                index === 0 && title.length > 1
                  ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
                  : 'text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]'
              }`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p
          className="animate-rise-in mt-7 flex items-center gap-5 font-display text-sm font-semibold tracking-[0.42em] text-spot-100 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:mt-8 sm:text-base sm:tracking-[0.55em]"
          style={{ animationDelay: '320ms' }}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500 sm:w-14" />
          {season}
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500 sm:w-14" />
        </p>

        {description ? (
          <p
            className="animate-rise-in mt-7 max-w-xl text-balance text-base leading-relaxed text-spot-100/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-lg"
            style={{ animationDelay: '420ms' }}
          >
            {description}
          </p>
        ) : null}

        <div
          className="animate-rise-in mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
          style={{ animationDelay: '520ms' }}
        >
          <a
            href={primaryAction.href}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-700 via-gold-500 to-gold-200 px-9 py-4 text-sm font-bold tracking-[0.16em] text-stage-950 uppercase shadow-[0_14px_36px_-12px_rgba(212,175,55,0.85)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stage-950 focus-visible:outline-none sm:w-auto"
          >
            {primaryAction.label}
            <ArrowIcon />
          </a>

          <a
            href={secondaryAction.href}
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-200/45 bg-stage-950/55 px-9 py-4 text-sm font-bold tracking-[0.16em] text-spot-100 uppercase backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-gold-200 hover:bg-stage-900/75 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-stage-950 focus-visible:outline-none sm:w-auto"
          >
            <PlayIcon />
            {secondaryAction.label}
          </a>
        </div>
      </div>

      {/* ---------- Footer strip ---------- */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 pb-8 sm:px-8 sm:pb-10">
        <a
          href={domainHref}
          className="rounded-sm text-[0.7rem] font-semibold tracking-[0.34em] text-spot-100/85 uppercase drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] transition-colors hover:text-gold-200 focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-4 focus-visible:ring-offset-stage-950 focus-visible:outline-none sm:text-xs sm:tracking-[0.42em]"
        >
          {domain}
        </a>
        <span
          aria-hidden="true"
          className="block h-9 w-px animate-scroll-cue bg-gradient-to-b from-gold-500/80 to-transparent"
        />
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 text-gold-500 transition-transform duration-300 group-hover:scale-110"
    >
      <circle cx="10" cy="10" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      <path d="M8.3 6.3 14 10l-5.7 3.7a.6.6 0 0 1-.93-.5V6.8a.6.6 0 0 1 .93-.5Z" />
    </svg>
  )
}
