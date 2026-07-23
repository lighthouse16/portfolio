"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ScrollAnimations.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ScrollAnimations = () => {
  const barRef = useRef<HTMLDivElement>(null);

  // Fix Next.js App Router bug: cross-page hash navigation doesn't scroll
  // correctly when GSAP ScrollTrigger modifies layout.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  useGSAP(() => {
    /* ── progress bar ── */
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    /* ── batch reveal for .reveal elements ── */
    ScrollTrigger.batch(".reveal", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          overwrite: true,
        });
      },
      start: "top 88%",
      once: true,
    });

    /* ── respect reduced motion ── */
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.globalTimeline.clear();
    });
  });

  return <div ref={barRef} className={styles.bar} />;
};
