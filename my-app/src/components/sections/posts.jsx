import { posts, exploring } from "@/app/data/content";

export default function Posts() {
  return (
    <section id="posts" data-stage={6} className="section min-vh-100 d-flex flex-column justify-content-center">
      <div className="section-heading" data-reveal>
        <span className="eyebrow">Ideas I keep coming back to</span>
        <h2 className="section-title">Learning in <span className="g">public.</span></h2>
        <p className="section-copy">A living reading list across the web, AI, and the systems we build.</p>
      </div>
      <div className="row g-4 mt-2">
        {posts.map((post, index) => (
          <div key={post.title} className="col-12 col-md-6 col-xl-4" data-reveal>
            <article className="glass post-card h-100">
              <span className="post-index">0{index + 1}</span>
              <small className="post-tag">{post.tag}</small>
              <h3 className="card-title-x">{post.title}</h3>
              <p className="muted mb-0">{post.text}</p>
              <span className="post-status">Notes in progress</span>
            </article>
          </div>
        ))}
      </div>
      <div className="glass d-flex flex-wrap align-items-center gap-3 p-4 mt-4">
        <b className="g">Exploring now</b>
        {exploring.map((e) => <span key={e} className="tag">{e}</span>)}
      </div>
    </section>
  );
}