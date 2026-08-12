import { motion, useReducedMotion } from 'framer-motion'

const PARTICLES = [
  { left: '12%', top: '22%', size: 2, delay: '0s', duration: '9s' },
  { left: '28%', top: '38%', size: 3, delay: '-2s', duration: '11s' },
  { left: '48%', top: '18%', size: 2, delay: '-4s', duration: '8s' },
  { left: '63%', top: '32%', size: 2.5, delay: '-1s', duration: '10s' },
  { left: '78%', top: '24%', size: 2, delay: '-3s', duration: '12s' },
  { left: '18%', top: '58%', size: 2, delay: '-5s', duration: '9s' },
  { left: '72%', top: '52%', size: 3, delay: '-6s', duration: '13s' },
  { left: '88%', top: '42%', size: 2, delay: '-2.5s', duration: '10s' },
] as const

type HeroSectionProps = {
  registerHref?: string
  watchHref?: string
  className?: string
}

export function HeroSection({
  registerHref = '#register',
  watchHref = '#auditions',
  className = '',
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.85,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }

  return (
    <section
      aria-labelledby="hero-title"
      className={`relative isolate flex min-h-screen flex-col overflow-hidden bg-stage text-spotlight ${className}`.trim()}
    >
      {/* Full-bleed responsive stage background */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet="/assets/hero-bg-desktop.jpg"
          />
          <img
            src="/assets/hero-bg-mobile.jpg"
            alt=""
            width={1024}
            height={1536}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Contrast overlay — WCAG AA over stage imagery */}
      <div
        className="hero-overlay absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="hero-vignette absolute inset-0 -z-10"
        aria-hidden="true"
      />

      {/* Soft spotlight bloom */}
      <div
        className="hero-glow pointer-events-none absolute left-1/2 top-[8%] -z-10 h-40 w-[70%] max-w-3xl -translate-x-1/2 rounded-full bg-spotlight/20 blur-3xl"
        style={{ animation: reduceMotion ? undefined : 'soft-pulse 6s ease-in-out infinite' }}
        aria-hidden="true"
      />

      {/* Subtle dust particles */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full bg-gold-light"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: reduceMotion
                ? undefined
                : `particle-drift ${p.duration} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-between px-5 py-10 sm:px-8 sm:py-12 lg:py-14">
        <motion.p
          {...fadeUp(0.05)}
          className="max-w-xl text-center font-display text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-spotlight/90 sm:text-xs sm:tracking-[0.32em]"
        >
          Saudi Arabia&apos;s Premier Christian Singing Contest!
        </motion.p>

        <div className="flex flex-col items-center text-center">
          <motion.h1
            id="hero-title"
            {...fadeUp(0.18)}
            className="font-display text-gold-metallic text-[clamp(2.35rem,10vw,5.75rem)] font-black leading-[0.92] tracking-wide"
          >
            <span className="block">THE</span>
            <span className="block">KINGDOM</span>
            <span className="block">VOICES</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.32)}
            className="mt-4 font-display text-sm font-semibold uppercase tracking-[0.45em] text-gold-light sm:mt-5 sm:text-base sm:tracking-[0.55em]"
          >
            Season 1
          </motion.p>

          <motion.p
            {...fadeUp(0.42)}
            className="mt-5 max-w-md text-sm leading-relaxed text-spotlight/80 sm:mt-6 sm:text-base"
          >
            Lift your voice for His glory — registrations open for youth ages
            12–18 across Saudi Arabia.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          >
            <a
              href={registerHref}
              className="inline-flex h-12 items-center justify-center bg-gradient-to-r from-gold-mid via-gold to-gold-light px-8 text-sm font-bold uppercase tracking-[0.18em] text-stage shadow-[0_0_32px_rgba(212,175,55,0.35)] transition duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-14 sm:px-10"
            >
              Register Now
            </a>
            <a
              href={watchHref}
              className="inline-flex h-12 items-center justify-center border border-gold/45 bg-stage/40 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-gold-light backdrop-blur-sm transition duration-200 hover:border-gold hover:bg-gold/10 hover:text-spotlight active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:h-14 sm:px-10"
            >
              Watch Auditions
            </a>
          </motion.div>
        </div>

        <motion.a
          {...fadeUp(0.7)}
          href="https://www.thekingdomvoices.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 font-display text-[0.65rem] font-medium uppercase tracking-[0.42em] text-spotlight/70 transition hover:text-gold-light sm:mt-12 sm:text-xs sm:tracking-[0.5em]"
        >
          www.thekingdomvoices.com
        </motion.a>
      </div>
    </section>
  )
}

export default HeroSection
