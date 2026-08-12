import { useState } from "react";

const HERO_IMAGES = {
  desktop: "/assets/hero-bg-desktop.jpg",
  mobile: "/assets/hero-bg-mobile.jpg",
};

export default function HeroSection({
  registerHref = "#register",
  auditionsHref = "#auditions",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <picture className="hero__media" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={HERO_IMAGES.mobile} />
        <img
          src={HERO_IMAGES.desktop}
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="hero__stage-glow" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="hero__dust" aria-hidden="true" />

      <header className="hero__header">
        <a className="hero__brand" href="/" aria-label="The Kingdom Voices home">
          TKV
          <span>Season 1</span>
        </a>
        <button
          className="hero__menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="hero-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`hero__nav${isMenuOpen ? " hero__nav--open" : ""}`}
          id="hero-navigation"
          aria-label="Primary navigation"
        >
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#format" onClick={() => setIsMenuOpen(false)}>Competition</a>
          <a href="#judges" onClick={() => setIsMenuOpen(false)}>Judges</a>
        </nav>
      </header>

      <div className="hero__content">
        <p className="hero__eyebrow">
          Saudi Arabia&apos;s premier
          <br />
          Christian singing contest
        </p>

        <h1 className="hero__title" id="hero-title">
          <span>The</span>
          <span>Kingdom</span>
          <span>Voices</span>
        </h1>

        <p className="hero__season">
          <span aria-hidden="true" />
          Season 1
          <span aria-hidden="true" />
        </p>

        <p className="hero__intro">
          Let your voice rise. Join a new generation of gospel singers and sing
          for His glory.
        </p>

        <div className="hero__actions">
          <a className="button button--gold" href={registerHref}>
            Register Now
          </a>
          <a className="button button--glass" href={auditionsHref}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 7 8 5-8 5V7Z" />
            </svg>
            Watch Auditions
          </a>
        </div>
      </div>

      <a
        className="hero__domain"
        href="https://www.thekingdomvoices.com"
        target="_blank"
        rel="noreferrer"
      >
        www.thekingdomvoices.com
      </a>
    </section>
  );
}
