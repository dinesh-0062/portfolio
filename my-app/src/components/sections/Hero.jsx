import LiveCodeBackground from "@/components/three/BackgroundEffects";

export default function Hero() {
  return (
    <section
      id="hero"
      data-stage={0}
      className="hero section min-vh-100 d-flex flex-column justify-content-center"
    >
      {/* Animated coding background */}
      <LiveCodeBackground />

      {/* Existing hero content */}
      <div className="hero-copy">
        <span className="eyebrow hero-eyebrow">
          <span className="pill-live-dot" />
          Available for full stack opportunities
        </span>

        <h1 className="hero-title">
          <span>Dinesh</span>
          <span className="hero-title-accent">
            Jangra<span className="hero-period"></span>
          </span>
        </h1>

        <p className="hero-lead">
          I build useful digital products — from polished interfaces to the
          systems that power them.
        </p>

        <div
          className="hero-role"
          aria-label="Full Stack Developer, Frontend Engineer, AI Developer, Creative Developer"
        >
          <span className="hero-role-label">Currently exploring</span>

          <span className="role-rotator" aria-hidden="true">
            <span>Full Stack Developer</span>
            <span>Frontend Engineer</span>
            <span>AI Developer</span>
            <span>Creative Developer</span>
          </span>
        </div>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <a className="btn-glow" href="#work">
            Explore selected work 
          </a>

          <a className="btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <a
        className="scroll-cue"
        href="#about"
        aria-label="Scroll to about section"
      >
        <span className="scroll-cue-line" aria-hidden="true" />
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}