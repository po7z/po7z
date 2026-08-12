import { useMemo } from 'react';

const DESKTOP_BG = '/assets/hero-bg-desktop.jpg';
const MOBILE_BG = '/assets/hero-bg-mobile.jpg';

const PARTICLE_COUNT = 28;

interface Particle {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    left: `${8 + ((id * 37) % 84)}%`,
    size: `${1 + (id % 3)}px`,
    delay: `${(id * 0.45) % 8}s`,
    duration: `${10 + (id % 7)}s`,
    opacity: 0.15 + (id % 5) * 0.08,
  }));
}

export interface HeroSectionProps {
  onRegister?: () => void;
  onWatchAuditions?: () => void;
}

export default function HeroSection({
  onRegister,
  onWatchAuditions,
}: HeroSectionProps) {
  const particles = useMemo(() => createParticles(), []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-stage-dark"
    >
      {/* Responsive background */}
      <picture className="pointer-events-none absolute inset-0 -z-20">
        <source media="(min-width: 768px)" srcSet={DESKTOP_BG} />
        <img
          src={MOBILE_BG}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Atmospheric lighting layers */}
      <div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="hero-vignette pointer-events-none absolute inset-0 -z-10"
      />

      {/* Contrast overlay for WCAG AA readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-[#100704]"
      />

      {/* Warm ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-2/3 bg-gradient-to-b from-[#4A1208]/40 via-[#2A0A05]/20 to-transparent"
      />

      {/* Floating dust particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute bottom-0 rounded-full bg-[#FFF3E0]"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animation: `float-dust ${particle.duration} linear ${particle.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-between px-5 py-10 text-center sm:px-8 md:px-12 md:py-14">
        {/* Tagline */}
        <p className="mt-2 max-w-3xl font-body text-[0.65rem] font-medium uppercase tracking-[0.28em] text-spotlight/90 sm:text-xs sm:tracking-[0.32em] md:mt-4 md:text-sm">
          Saudi Arabia&apos;s Premier Christian Singing Contest!
        </p>

        {/* Headline block */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 md:gap-6">
          <h1
            id="hero-heading"
            className="font-display leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            <span className="block text-3xl font-semibold tracking-[0.18em] text-gold-shimmer sm:text-4xl md:text-5xl">
              The
            </span>
            <span className="mt-1 block text-5xl font-bold tracking-[0.08em] text-gold-shimmer sm:text-7xl md:text-8xl lg:text-9xl">
              Kingdom
            </span>
            <span className="mt-1 block text-5xl font-bold tracking-[0.12em] text-gold-shimmer sm:text-7xl md:text-8xl lg:text-9xl">
              Voices
            </span>
          </h1>

          <p className="font-display text-sm font-medium uppercase tracking-[0.55em] text-spotlight/95 sm:text-base md:text-lg">
            Season 1
          </p>

          {/* CTAs */}
          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 md:mt-10">
            <button
              type="button"
              onClick={onRegister}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-gold/60 bg-gradient-to-b from-gold-light/90 via-gold to-gold-dark px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.18em] text-stage-dark shadow-[0_8px_32px_rgba(212,175,55,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Register Now
            </button>
            <button
              type="button"
              onClick={onWatchAuditions}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-spotlight/35 bg-black/35 px-8 py-3 font-body text-sm font-semibold uppercase tracking-[0.18em] text-spotlight backdrop-blur-sm transition hover:border-spotlight/60 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spotlight"
            >
              Watch Auditions
            </button>
          </div>
        </div>

        {/* Footer URL */}
        <a
          href="https://www.thekingdomvoices.com"
          className="mb-2 font-body text-[0.6rem] font-medium uppercase tracking-[0.42em] text-spotlight/75 transition hover:text-spotlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.thekingdomvoices.com
        </a>
      </div>
    </section>
  );
}
