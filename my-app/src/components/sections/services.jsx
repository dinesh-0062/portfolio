import { services } from "@/app/data/content";

export default function Services() {
  return (
    <section id="services" data-stage={2} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">From first sketch to shipped product</span>
        <h2 className="section-title">Ways I can <span className="g">help.</span></h2>
      </div>
      <div className="row g-4 mt-2">
        {services.map((s, i) => (
          <div key={s.title} className="col-12 col-md-6 col-lg-3" data-reveal>
            <article className="glass service-card p-4 h-100">
              <span className="service-index">0{i + 1}</span>
              <em className="icon-box">{s.icon}</em>
              <h3 className="card-title-x">{s.title}</h3>
              <p className="muted mb-0">{s.text}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}