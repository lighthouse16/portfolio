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
              I turn complex problems into clean, performant software.
            </span>
            
            <div className={styles.typingWrapper}>
              <TextType
                text={[
                  "I build and evaluate applied AI systems.",
                  "I turn models into software people can inspect.",
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
              I&apos;m a Computer Science student at The Hong Kong Polytechnic University,
              studying algorithms, machine learning, and applied mathematics. I enjoy working
              on problems where mathematical reasoning must become dependable software.
            </p>
            <p>
              My recent work spans AppLynk, an AI-assisted platform for discovering and
              organizing youth opportunities, and DeepFlood, a time-series estimation
              prototype evaluated with chronological validation. Together, they strengthened
              how I approach data quality, reproducible evaluation, and software delivery.
            </p>
          </div>
          <div className={styles.meta} data-reveal>
            <div>
              <span className={styles.label}>Location</span>
              <span>Kowloon, Hong Kong</span>
            </div>
            <div>
              <span className={styles.label}>University</span>
              <span>PolyU — Computer Science</span>
            </div>
            <div>
              <span className={styles.label}>Expected Graduation</span>
              <span>May 2029</span>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};
