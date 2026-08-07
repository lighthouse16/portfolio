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
    detail: "Kowloon, Hong Kong · Expected May 2029",
    bullets: [
      "Cumulative GPA: 3.5 / 4.3",
      "Recipient of a Full-Ride Academic Entry Scholarship",
      "Selected coursework: Data Structures, Object-Oriented Programming, Principles of Data Science, AI & Data Analytics, Discrete Mathematics, Linear Algebra",
    ],
    icon: "🎓",
    stat: "3.5",
    statLabel: "GPA",
  },
  {
    id: "symposium",
    period: "Nov 2025",
    color: "red" as const,
    role: "Research Proposal Presenter · Data-Driven Educational Technology",
    org: "PolyU Symposium on Innovations for a Sustainable Future",
    detail: "Hong Kong",
    bullets: [
      "Presented a data-driven educational technology proposal centered on adaptive spaced repetition and measurable STEM knowledge retention.",
      "Proposed a system that connects spaced-repetition scheduling with a quantitative learning-analytics framework.",
      "Presented the system design, evaluation methodology, and measurable retention criteria to symposium judges and academic attendees.",
    ],
    icon: "🎤",
    stat: "60+",
    statLabel: "Presenters",
  },
  {
    id: "seas",
    period: "Jul — Aug 2025",
    color: "green" as const,
    role: "Participant · AI & Applications",
    org: "Summer in Engineering and Applied Sciences (SEAS)",
    detail: "Quảng Bình, Vietnam",
    bullets: [
      "Completed an intensive AI/ML summer school adapted from MIT Computer Science coursework, with mentorship involving researchers from MIT, Harvard, CERN, UIUC, and VinAI.",
      "Collaborated on the original team flood-modeling prototype for Central Vietnam through exploratory data analysis, feature engineering, and early modeling.",
      "After the summer school, independently re-engineered the prototype into the current DeepFlood system with basin-specific modeling, leakage-aware validation, and peak-sensitive training.",
    ],
    icon: "🔬",
    stat: "43",
    statLabel: "of 400+",
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
          Learning, presenting, <span>and building beyond coursework.</span>
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

                {/* card content */}
                <div className={styles.cardContent}>
                  <span className={styles.period}>{e.period}</span>
                  <h3 className={styles.role}>{e.org}</h3>
                  <p className={styles.org}>{e.role}</p>

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
                </div>

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
