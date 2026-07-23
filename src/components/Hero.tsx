"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import TrueFocus from "./TrueFocus";
import styles from "./Hero.module.css";

export const Hero = () => {
  const reduceMotion = useReducedMotion();

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.frame}`}>
        <motion.div
          className={styles.copy}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            id="hero-title"
            className={styles.title}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } }}
          >
            <TrueFocus
              sentence="Build. Measure. Improve."
              separator=" "
              manualMode={false}
              blurAmount={5}
              colors={["var(--blue)", "var(--red)", "var(--green)"]}
              glowColors={[
                "rgba(66, 133, 244, 0.4)",
                "rgba(234, 67, 53, 0.4)",
                "rgba(52, 168, 83, 0.4)"
              ]}
              animationDuration={0.6}
              pauseBetweenAnimations={1.5}
            />
          </motion.div>

          <motion.div
            className={styles.explore}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } } }}
          >
            <Link href="/#about" aria-label="Explore about me" onClick={handleExplore}>
              <span className={styles.exploreText}>Explore</span>
              <ArrowDown className={styles.exploreIcon} />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
