
import { profile } from "@/app/data/content";

export default function Contact() {
    return (
        <section
            id="contact"
            data-stage={7}
            className="section contact-section min-vh-100 d-flex flex-column justify-content-center position-relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="contact-glow contact-glow-one"></div>
            <div className="contact-glow contact-glow-two"></div>

            <div className="container position-relative contact-container">

                <div className="contact-content" data-reveal>

                    {/* Eyebrow */}
                    <div className="contact-eyebrow mb-4">
                        <span className="contact-live-dot"></span>
                        <span>OPEN TO MEANINGFUL WORK</span>
                        <i className="bi bi-stars"></i>
                    </div>

                    {/* Heading */}
                    <h2 className="contact-title">
                        Have an idea?
                        <br />
                        <span className="contact-gradient">
                            Let's build something meaningful.
                        </span>
                    </h2>

                    <p className="contact-description">
                        Have a project, an exciting opportunity, or just want
                        to connect? I'm always open to meaningful conversations
                        and creative collaborations.
                    </p>

                    {/* Email Card */}
                    <a
                        href={`mailto:${profile.email}`}
                        className="contact-email-card text-decoration-none"
                    >
                        <div className="contact-email-icon">
                            <i className="bi bi-envelope-paper"></i>
                        </div>

                        <div className="contact-email-info">
                            <span>LET'S START A CONVERSATION</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="contact-email-arrow">
                            <i className="bi bi-arrow-up-right"></i>
                        </div>
                    </a>

                    {/* Social Links */}
                    <div className="contact-socials mt-4">

                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-link"
                        >
                            <i className="bi bi-linkedin"></i>
                            <span>LinkedIn</span>
                            <i className="bi bi-arrow-up-right"></i>
                        </a>

                        <a
                            href="https://github.com/dinesh-0062"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-social-link"
                        >
                            <i className="bi bi-github"></i>
                            <span>GitHub</span>
                            <i className="bi bi-arrow-up-right"></i>
                        </a>

                        <a
                            href={`mailto:${profile.email}`}
                            className="contact-social-link"
                        >
                            <i className="bi bi-send"></i>
                            <span>Send an email</span>
                            <i className="bi bi-arrow-up-right"></i>
                        </a>

                    </div>
                </div>

                {/* Footer */}
                <footer className="site-footer contact-footer">
                    <span>
                        Designed & built by Dinesh Jangra
                        <i className="bi bi-heart-fill ms-2"></i>
                    </span>

                    <a href="#hero" className="contact-back-top">
                        Back to top
                        <i className="bi bi-arrow-up-right ms-1"></i>
                    </a>
                </footer>

            </div>
        </section>
    );
}
