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
              {"I build software where\nmodels, data, and systems meet."}
            </span>
            
            <div className={styles.typingWrapper}>
              <TextType
                text={[
                  "Between models\nand systems.",
                  "I build software where\nmodels, data, and systems meet.",
                  "Grounded in\nquantitative engineering."
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
              I&apos;m a Computer Science student at The Hong Kong Polytechnic University, with a minor in Applied Mathematics.
            </p>
            <p>
              I work across machine learning, data systems, and software engineering, building solutions where quantitative reasoning meets real world constraints.
            </p>
            <p>
              My interests span AI/ML, quantitative engineering, FinTech, and reliable software systems.
            </p>
          </div>
        </div>
      </div>


    </section>
  );
};
