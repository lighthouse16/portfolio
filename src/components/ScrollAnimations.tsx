"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ScrollAnimations.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ScrollAnimations = () => {
  const barRef = useRef<HTMLDivElement>(null);

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
