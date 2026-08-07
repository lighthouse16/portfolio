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
    title: "Provincial Competitive Programming Excellent Student Contest",
    rank: "2nd Place",
    color: "red" as const,
  },
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
    title: "PolyU Full-Ride Academic Entry Scholarship",
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

      const cards = gsap.utils.toArray<HTMLElement>(
        trackRef.current.children
      );

      /* ── Main horizontal scroll ── */
      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth + 80}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      /* ── Symmetrical Wave pop-up per card ── */
      cards.forEach((card, i) => {
        let start = "center 65%";
        let end = "center 35%";

        if (i === 0) {
          // First card starts in viewport, pop it as it moves left
          start = "left 6%";
          end = "left -30%";
        } else if (i === cards.length - 1) {
          // Last card never centers, pop it as it arrives at the end
          start = "left 95%";
          end = "left 50%";
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: start,
            end: end,
            scrub: true,       // Sync perfectly with scroll
          },
        });

        // Pop up (Apex at center)
        tl.to(card, {
          y: -32,
          scale: 1.03,
          duration: 0.5,
          ease: "sine.out",
          force3D: true,
        });

        // Settle back down
        tl.to(card, {
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "sine.in",
          force3D: true,
        });
      });
    },
    { scope: wrapRef }
  );

  return (
    <section
      id="honors"
      ref={wrapRef}
      className={styles.section}
      aria-labelledby="honors-title"
    >
      <div className={styles.intro}>
        <div className="container">
          <p className="eyebrow">05 / Honors</p>
          <h2 id="honors-title" className={styles.title}>
            Recognition.
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
