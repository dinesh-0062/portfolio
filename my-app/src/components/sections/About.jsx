export default function About() {
  return (
    <section id="about" data-stage={1} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="row align-items-end g-5">
        <div className="col-lg-7" data-reveal>
          <span className="eyebrow">A little about me</span>
          <h2 className="section-title about-title">I build digital experiences that connect <span className="g">technology with people.</span></h2>
        </div>
        <div className="col-lg-5" data-reveal>
          <p className="section-copy">
            I started with C and Python, then grew into the MERN stack, Next.js, and FastAPI. At Indixpert, I build
            full products, mentor students, and keep learning by sharing how the web works.
          </p>
          <p className="muted mb-0">
            My approach is practical: understand the problem, make the experience clear, and choose technology that earns its place.
          </p>
        </div>
      </div>
      <div className="stats-row row g-3 mt-5" data-reveal>
        <div className="col-6 col-lg-4">
          <div className="stat-block"><b className="stat g">03</b><span>Products in my portfolio</span></div>
        </div>
        <div className="col-6 col-lg-4">
          <div className="stat-block"><b className="stat g">2025</b><span>Started at Indixpert</span></div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="stat-block"><b className="stat g">End to end</b><span>From interface to data layer</span></div>
        </div>
      </div>
    </section>
  );
}
