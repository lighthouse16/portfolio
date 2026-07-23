"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import TrueFocus from "./TrueFocus";
import styles from "./Hero.module.css";

export const Hero = () => {
  const reduceMotion = useReducedMotion();

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
              sentence="Think. Build. Ship."
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



        </motion.div>
      </div>
    </section>
  );
};
