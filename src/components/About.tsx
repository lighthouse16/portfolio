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
                  "I turn complex problems into clean, performant software.",
                  "I build robust machine learning architectures.",
                  "I craft interfaces that feel alive."
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
              Currently pursuing a BSc (Hons) in Computer Science with a minor
              in Applied Mathematics at The Hong Kong Polytechnic University —
              full-ride academic scholarship recipient with a 3.5 / 4.3 GPA.
            </p>
            <p>
              My focus sits at the intersection of algorithms, machine learning,
              and thoughtful interface design. I care about code that&apos;s
              correct, fast, and kind to the people who use it.
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
              <span className={styles.label}>Expected</span>
              <span>May 2029</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.visual} aria-hidden="true" data-reveal>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
        <div className={styles.shape3} />
        <div className={styles.shape4} />
      </div>
    </section>
  );
};
