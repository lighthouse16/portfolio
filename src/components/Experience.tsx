"use client";

import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const entries = [
  {
    id: "polyu",
    period: "2025 — 2029",
    color: "blue" as const,
    role: "BSc (Hons) Computer Science · Minor in Applied Mathematics",
    org: "The Hong Kong Polytechnic University",
    detail: "Hong Kong · Expected May 2029",
    bullets: [
      "Full-Ride Academic Entry Scholarship recipient.",
      "Selected coursework in Data Structures, OOP, Data Science, AI & Data Analytics, Discrete Mathematics, and Linear Algebra.",
    ],
    icon: "🎓",
    stat: "3.5",
    statLabel: "GPA",
  },
  {
    id: "seas",
    period: "Jul — Aug 2025",
    color: "green" as const,
    role: "Participant · AI/ML Summer Program",
    org: "Summer in Engineering and Applied Sciences (SEAS)",
    detail: "Quảng Bình, Vietnam",
    bullets: [
      "Completed an intensive AI/ML program adapted from MIT coursework, developing a team flood-modeling prototype through EDA, feature engineering, and spatiotemporal sequence modeling.",
      "Presented the results to an international panel, then independently re-engineered the prototype into the current DeepFlood system.",
    ],
    icon: "🔬",
    stat: "43",
    statLabel: "of 400+",
  },
  {
    id: "symposium",
    period: "Nov 2025",
    color: "red" as const,
    role: "Research Proposal Presenter · Data-Driven Educational Technology",
    org: "PolyU Symposium on Innovations for a Sustainable Future",
    detail: "Hong Kong",
    bullets: [
      "Designed an AI-enabled educational technology framework combining adaptive spaced repetition, quantitative learning analytics, and end-to-end data flows for long-term STEM retention.",
      "Defined the evaluation methodology and measurable retention metrics, then defended system feasibility and technical design choices before a faculty research panel.",
    ],
    icon: "🎤",
    stat: "RESEARCH",
    statLabel: "PRESENTER",
  },
];

const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  red: "var(--red)",
  green: "var(--green)",
};

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = useCallback(
    (id: string) => setActiveId((prev) => (prev === id ? null : id)),
    []
  );

  useGSAP(
    () => {
      /* spine draw */
      if (spineRef.current) {
        gsap.fromTo(
          spineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          }
        );
      }

      /* cards stagger */
      gsap.utils.toArray<HTMLElement>("[data-exp-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      /* stat counters */
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
        const endVal = el.getAttribute("data-stat") || "0";
        const isNumeric = /^\d+(\.\d+)?$/.test(endVal);
        if (!isNumeric) return;

        const obj = { val: 0 };
        const target = parseFloat(endVal);
        const isFloat = endVal.includes(".");

        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = isFloat
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toString();
          },
        });
      });

      /* dots scrub-synced with spine line */
      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: dot,
              start: "top 70%",
              end: "top 55%",
              scrub: 0.3,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={styles.section}
      aria-labelledby="exp-title"
    >
      <div className={`container ${styles.header}`}>
        <p className="eyebrow">03 / Experience</p>
        <h2 id="exp-title" className={styles.title}>
          Along <span>the way.</span>
        </h2>
      </div>

      <div className={`container ${styles.timeline}`}>
        {/* central spine */}
        <div
          ref={spineRef}
          className={styles.spine}
          aria-hidden="true"
        />

        {entries.map((e, i) => {
          const isOpen = activeId === e.id;
          const side = i % 2 === 0 ? "left" : "right";

          return (
            <div
              key={e.id}
              className={`${styles.row} ${styles[side]}`}
              data-exp-card
            >
              {/* timeline dot */}
              <div
                className={styles.dot}
                style={{ "--dot-color": colorMap[e.color] } as React.CSSProperties}
                data-dot
                aria-hidden="true"
              >
                <span className={styles.dotRing} />
              </div>

              {/* card */}
              <button
                className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}
                style={
                  { "--accent": colorMap[e.color] } as React.CSSProperties
                }
                onClick={() => toggle(e.id)}
                aria-expanded={isOpen}
                type="button"
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardMain}>
                    <span className={styles.period}>{e.period}</span>
                    <h3 className={styles.role}>{e.org}</h3>
                    <p className={styles.org}>{e.role}</p>
                  </div>

                  {/* stat badge */}
                  <div className={styles.statBadge} aria-hidden="true">
                    <span
                      className={styles.statValue}
                      data-stat={e.stat}
                    >
                      {e.stat}
                    </span>
                    <span className={styles.statLabel}>{e.statLabel}</span>
                  </div>
                </div>

                  {/* expandable details */}
                  <div
                    className={`${styles.expandable} ${
                      isOpen ? styles.expanded : ""
                    }`}
                  >
                    <div className={styles.expandableInner}>
                      <p className={styles.detail}>{e.detail}</p>
                      <ul className={styles.bullets}>
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* expand indicator */}
                  <span className={styles.expandHint} aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>

                {/* accent bar */}
                <div className={styles.accentBar} aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
