"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextType from "./TextType";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className={styles.about}
      aria-labelledby="about-title"
    >
      <div className={`container ${styles.grid}`}>
        <p className="eyebrow" data-reveal>
          01 / About
        </p>
        <div className={styles.copy}>
          <h2 id="about-title" className={styles.statement} data-reveal>
            {/* Invisible spacer to reserve height and prevent layout shift */}
            <span aria-hidden="true" className={styles.spacer}>
              I build software where models, data, and systems meet.
            </span>
            
            <div className={styles.typingWrapper}>
              <TextType
                text={[
                  "I build software where models, data, and systems meet.",
                  "I turn quantitative reasoning into dependable software.",
                  "I care about data quality and evaluation integrity."
                ]}
                typingSpeed={45}
                deletingSpeed={25}
                pauseDuration={2500}
                showCursor={true}
                cursorCharacter="|"
                textColors={["var(--ink)", "var(--ink)", "var(--ink)"]}
              />
            </div>
          </h2>
          <div className={styles.bio} data-reveal>
            <p>
              I&apos;m a Computer Science student at The Hong Kong Polytechnic University, with a minor in Applied Mathematics. I am most interested in problems where quantitative reasoning has to survive contact with real data, imperfect assumptions, and production constraints.
            </p>
            <p>
              My recent work spans two sides of that problem. <strong>DeepFlood</strong> is a leakage-aware time-series machine learning project for same-day streamflow nowcasting, where I focused on temporal validation, rare-event weighting, and honest baseline comparison. <strong>AppLynk</strong> is an AI-assisted data product that turns fragmented web content into structured, searchable opportunities through extraction, deduplication, semantic retrieval, and asynchronous processing.
            </p>
            <p>
              I am currently exploring opportunities across <strong>AI/ML, quantitative and FinTech-oriented engineering, data systems, and software engineering</strong>. I care less about attaching a model to a product than about choosing the right abstraction, measuring it honestly, and building the surrounding system well.
            </p>
          </div>
          <div className={styles.meta} data-reveal>
            <div>
              <span className={styles.label}>Location</span>
              <span>Kowloon, Hong Kong</span>
            </div>
            <div>
              <span className={styles.label}>University</span>
              <span>PolyU — BSc (Hons) CS, Minor in Applied Math</span>
            </div>
            <div>
              <span className={styles.label}>Graduation</span>
              <span>Expected May 2029</span>
            </div>
            <div>
              <span className={styles.label}>Academic Standing</span>
              <span>GPA 3.5 / 4.3 · Full-Ride Academic Entry Scholar</span>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};
