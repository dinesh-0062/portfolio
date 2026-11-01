"use client";
import { useEffect } from "react";
import { stages } from "@/app/data/stages";
import { store } from "@/app/lib/store";

export default function useActiveSection() {
    useEffect(() => {
        const root = document.documentElement;
        const els = [...document.querySelectorAll("[data-stage]")];
        const revealEls = [...document.querySelectorAll("[data-reveal]")];
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const apply = (i) => {
            store.active = i;
            root.style.setProperty("--a1", stages[i].pal[0]);
            root.style.setProperty("--a2", stages[i].pal[1]);
            window.dispatchEvent(new CustomEvent("stage", { detail: i })); 
        };
        apply(0);

        // -50% top aur bottom: sirf screen ki beech wali line section ko "active" banati hai
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) apply(Number(e.target.dataset.stage));
                });
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );
        els.forEach((el) => io.observe(el));

        root.classList.add("motion-ready");
        let revealObserver;
        if (reducedMotion) {
            revealEls.forEach((el) => el.classList.add("is-visible"));
        } else {
            revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
            );
            revealEls.forEach((el) => revealObserver.observe(el));
        }

        return () => {
            io.disconnect();
            revealObserver?.disconnect();
            root.classList.remove("motion-ready");
        };
    }, []);
}