import { timeline } from "@/app/data/content";

export default function Journey() {
  return (
    <section id="journey" data-stage={5} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="row">
        <div className="col-lg-8" data-reveal>
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">Building forward,<br /><span className="g">one step at a time.</span></h2>
          <div className="tl">
            {timeline.map((t) => (
              <div key={t.title} className="tl-item">
                <small className="timeline-date">{t.when}</small>
                <h3 className="card-title-x mb-2">{t.title}</h3>
                <p className="muted mb-0">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}