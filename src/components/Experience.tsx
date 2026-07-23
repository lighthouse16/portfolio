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
    role: "BSc (Hons) Computer Science",
    org: "The Hong Kong Polytechnic University",
    detail: "Minor in Applied Mathematics",
    bullets: [
      "Full-ride academic scholarship recipient",
      "GPA 3.5 / 4.3 — DSA, OOP, Databases, Linear Algebra, Probability",
    ],
    icon: "🎓",
    stat: "3.5",
    statLabel: "GPA",
  },
  {
    id: "symposium",
    period: "Nov 2025",
    color: "red" as const,
    role: "Presenter & Product Demonstrator",
    org: "PolyU Symposium on Innovations",
    detail: "Hong Kong",
    bullets: [
      "Presented a smart learning app live at PolyU\u2019s academic innovation symposium",
      "Communicated software architecture and spaced-repetition algorithms to academic panels",
    ],
    icon: "🎤",
    stat: "200+",
    statLabel: "Audience",
  },
  {
    id: "seas",
    period: "Jul — Aug 2025",
    color: "green" as const,
    role: "Participant — AI & Applications",
    org: "SEAS Vietnam",
    detail: "Quảng Bình, Vietnam (Selected 43 / 400)",
    bullets: [
      "Completed an intensive 2-week MIT-adapted curriculum on AI, Python, linear algebra, and ML",
      "Applied AI to flood forecasting in Central Vietnam, predicting major 2024-2025 flood events (seas-flood.github.io)",
      "Presented findings and worked directly with mentors from Harvard, MIT, CERN, Stony Brook, Ericsson, UIUC, UCI, and VinAI",
    ],
    icon: "🔬",
    stat: "43",
    statLabel: "of 400",
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
        gsap.from(spineRef.current, {
          scaleY: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        });
      }

      /* cards stagger */
      gsap.utils.toArray<HTMLElement>("[data-exp-card]").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.96,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          delay: i * 0.08,
        });
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

      /* dots pulse */
      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              once: true,
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
          Where I&apos;ve been.
          <br />
          <span>What I&apos;ve built.</span>
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
                  <h3 className={styles.role}>{e.role}</h3>
                  <p className={styles.org}>{e.org}</p>

                  {/* expandable details */}
                  <div
                    className={`${styles.expandable} ${
                      isOpen ? styles.expanded : ""
                    }`}
                  >
                    <p className={styles.detail}>{e.detail}</p>
                    <ul className={styles.bullets}>
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
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
