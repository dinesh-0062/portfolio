import { projects } from "@/app/data/content";

export default function Work() {
  return (
    <section id="work" data-stage={4} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">Selected projects</span>
        <h2 className="section-title">Work with <span className="g">purpose.</span></h2>
      </div>
      <div className="row g-4 mt-2">
        {projects.map((project, index) => (
          <div key={project.title} className={`col-12 ${index === 0 ? "" : "col-lg-6"}`} data-reveal>
            <article className={`glass project project-${index}`}>
              <div className={`art art-${index}`} aria-hidden="true">
                <div className="art-topline"><span>{project.title}</span><span>0{index + 1} / 03</span></div>
                <div className="art-core">
                  <span className="art-orbit art-orbit-one" />
                  <span className="art-orbit art-orbit-two" />
                  <span className="art-mark">{project.code}</span>
                  <span className="art-caption">{index === 0 ? "Understand. Prepare. Grow." : index === 1 ? "A clearer view of every stay." : "Find the image in the collection."}</span>
                </div>
                <span className="art-glint" />
              </div>
              <div className="project-copy">
                <div className="project-heading">
                  <span className="project-kicker">0{index + 1} — Product design & engineering</span>
                  <h3 className="card-title-x">{project.title}</h3>
                </div>
                <p className="muted">{project.text}</p>
                <div className="d-flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}