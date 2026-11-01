import { skillGroups } from "@/app/data/content";

export default function Skills() {
  return (
    <section id="skills" data-stage={3} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">Tools I reach for</span>
        <h2 className="section-title">A considered <span className="g">toolkit.</span></h2>
        <p className="section-copy">The right tools for interfaces that feel clear, backends that stay readable, and data that stays useful.</p>
      </div>
      <div className="row g-3 skill-categories mt-3">
        {skillGroups.map((group) => (
          <div key={group.title} className="col-12 col-sm-6 col-xl-3" data-reveal>
            <div className="skill-group">
              <h3>{group.title}</h3>
              <div className="d-flex flex-wrap gap-2">
                {group.items.map((skill) => <span key={skill} className="tag">{skill}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="skills-marquee" aria-label="Selected technologies">
        {skillGroups.slice(0, 2).map((group, index) => (
          <div key={group.title} className={`mq ${index % 2 ? "rev" : ""}`} aria-hidden="true">
            <div className="mq-track">
              {[...group.items, ...group.items, ...group.items].map((skill, i) => (
                <span key={`${skill}-${i}`} className="chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}