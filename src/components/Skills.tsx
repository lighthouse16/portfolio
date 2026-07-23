"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const languages = [
  { name: "C++", level: 90 },
  { name: "C", level: 80 },
  { name: "Python", level: 85 },
  { name: "SQL", level: 75 },
];

const competencies = [
  "Data Structures & Algorithms",
  "Time-Series Modeling",
  "Machine Learning",
  "Object-Oriented Programming",
  "Probability & Statistics",
];

const tools = ["NumPy", "Pandas", "Scikit-learn", "Git", "Linux / Unix"];

const spoken = [
  { lang: "English", detail: "IELTS 7.5", pct: 85 },
  { lang: "Vietnamese", detail: "Native", pct: 100 },
  { lang: "Chinese", detail: "A1", pct: 20 },
];

export const Skills = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* bars animate width on scroll */
      gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((bar) => {
        gsap.from(bar, {
          width: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <div className={styles.header}>
          <p className="eyebrow">02 / Skills</p>
          <h2 id="skills-title" className={styles.title}>
            Tools I use.
            <br />
            <span>Problems I solve.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Programming languages */}
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Programming</h3>
            <div className={styles.bars}>
              {languages.map((l) => (
                <div key={l.name} className={styles.barRow}>
                  <span className={styles.barLabel}>{l.name}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      data-bar
                      style={{ width: `${l.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core competencies */}
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Core Competencies</h3>
            <div className={styles.pills}>
              {competencies.map((c) => (
                <span key={c} className={`${styles.pill} reveal`}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Tools &amp; Frameworks</h3>
            <div className={styles.pills}>
              {tools.map((t) => (
                <span key={t} className={`${styles.pill} ${styles.pillAlt} reveal`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Spoken languages */}
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Languages</h3>
            <div className={styles.bars}>
              {spoken.map((s) => (
                <div key={s.lang} className={styles.barRow}>
                  <span className={styles.barLabel}>
                    {s.lang} <small>{s.detail}</small>
                  </span>
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${styles.barLang}`}
                      data-bar
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
