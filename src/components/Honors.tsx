"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Honors.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const honors = [
  {
    year: "2025",
    title: "Newton Spark Young Informatics Olympiad",
    rank: "Finalist",
    color: "blue" as const,
  },
  {
    year: "2024",
    title: "International Youth Math Challenge (IYMC)",
    rank: "Special Honour",
    color: "yellow" as const,
  },
  {
    year: "2024",
    title: "Asia International Mathematical Olympiad (AIMO)",
    rank: "Bronze Prize",
    color: "red" as const,
  },
  {
    year: "2025–2029",
    title: "PolyU Full-Ride Academic Scholarship",
    rank: "Recipient",
    color: "green" as const,
  },
];

const accentMap: Record<string, string> = {
  blue: "var(--blue)",
  red: "var(--red)",
  yellow: "var(--yellow)",
  green: "var(--green)",
};

export const Honors = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !wrapRef.current) return;

      const cards = trackRef.current.children;
      const totalScroll =
        trackRef.current.scrollWidth - window.innerWidth + 80;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      /* fade-in each card */
      gsap.utils.toArray<HTMLElement>(cards).forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          scale: 0.88,
          duration: 0.5,
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            containerAnimation: undefined, // cards animate with main pin
            start: "left 90%",
            once: true,
          },
        });
      });
    },
    { scope: wrapRef }
  );

  return (
    <section
      ref={wrapRef}
      className={styles.section}
      aria-labelledby="honors-title"
    >
      <div className={styles.intro}>
        <div className="container">
          <p className="eyebrow">05 / Honors</p>
          <h2 id="honors-title" className={styles.title}>
            Recognition <span>&amp; awards.</span>
          </h2>
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {honors.map((h) => (
          <article
            key={h.title}
            className={styles.card}
            style={{ "--accent": accentMap[h.color] } as React.CSSProperties}
          >
            <span className={styles.year}>{h.year}</span>
            <h3 className={styles.cardTitle}>{h.title}</h3>
            <span className={styles.rank}>{h.rank}</span>
            <div className={styles.accent} />
          </article>
        ))}
      </div>
    </section>
  );
};
