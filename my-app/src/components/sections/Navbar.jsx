"use client";
import { useEffect, useRef, useState } from "react";

// stage = stages.js mein us section ka index
const links = [
  { href: "#about", label: "About", stage: 1 },
  { href: "#services", label: "Services", stage: 2, optional: true },
  { href: "#skills", label: "Skills", stage: 3 },
  { href: "#work", label: "Work", stage: 4 },
  { href: "#journey", label: "Journey", stage: 5, optional: true },
  { href: "#posts", label: "Notes", stage: 6, optional: true },
  { href: "#contact", label: "Contact", stage: 7 },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });
  const refs = useRef([]);
  const bar = useRef(null);
  const nav = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nextHidden = y > last + 4 && y > 300;
      if (nextHidden !== hidden) setHidden(nextHidden);
      last = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    const onStage = (e) => setActive(e.detail);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("stage", onStage);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("stage", onStage);
    };
  }, [hidden]);

  // current section ka link (journey/posts par "Work" highlight rahega)
  const current = links.reduce((acc, l, i) => (l.stage <= active ? i : acc), -1);
  const target = hover ?? current;

  useEffect(() => {
    const el = refs.current[target];
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth, on: true } : { x: 0, w: 0, on: false });
  }, [target]);

  return (
    <>
      <div className="scroll-bar" ref={bar} aria-hidden="true" />
      <nav
        ref={nav}
        className={`nav-x d-flex align-items-center ${hidden ? "hide" : ""}`}
        aria-label="Main navigation"
        onPointerLeave={() => setHover(null)}
      >
        <span
          aria-hidden="true"
          className="nav-pill"
          style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.on ? 1 : 0 }}
        />
        <a href="#hero" className="nav-brand d-flex align-items-center gap-2 fw-bold" aria-label="Dinesh Jangra, home">
          <span className="brand-ring" aria-hidden="true" />
          <span className="d-none d-md-inline">Dinesh</span>
        </a>
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            ref={(el) => (refs.current[i] = el)}
            onPointerEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            onBlur={(event) => {
              if (!nav.current?.contains(event.relatedTarget)) setHover(null);
            }}
            aria-current={current === i ? "location" : undefined}
            className={l.optional ? "nav-optional" : ""}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </>
  );
}