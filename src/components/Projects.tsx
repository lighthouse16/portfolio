"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Projects.module.css";

const projects = [
  {
    number: "01",
    title: "AppLynk",
    description: "Designed normalized relational schemas and backend data pipelines optimizing query performance and data integrity.",
    meta: "Lead Developer · SQL · Backend · 2026",
    color: "blue",
  },
  {
    number: "02",
    title: "Smart Learning App",
    description: "A spaced-repetition learning platform presented live at PolyU\u2019s academic innovation symposium.",
    meta: "Full-stack · Algorithms · 2025",
    color: "yellow",
  },
  {
    number: "03",
    title: "Flood Forecasting",
    description: "Predictive ML models for flood forecasting using statistical time-series data and regression techniques.",
    meta: "SEAS Research · Python · ML · 2025",
    color: "green",
  },
];

export const Projects = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={`container ${styles.heading}`}>
        <p className="eyebrow">04 / Selected work</p>
        <h2 id="projects-title">Built with intent.<br />Made to move.</h2>
      </div>

      <div className={styles.list}>
        {projects.map((project, index) => (
          <motion.article
            className={`${styles.project} ${styles[project.color]}`}
            key={project.title}
            initial={reduceMotion ? false : { opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.75, delay: index * 0.05, ease: [0.2, 0, 0, 1] }}
          >
            <div className={`container ${styles.projectGrid}`}>
              <div className={styles.details}>
                <span className={styles.number}>{project.number}</span>
                <div>
                  <p className={styles.meta}>{project.meta}</p>
                  <h3>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                </div>
                <a href={`mailto:haidang.trih@gmail.com?subject=${encodeURIComponent(project.title)}`} aria-label={`Ask about ${project.title}`}>
                  <ArrowUpRight />
                </a>
              </div>
              <div className={styles.visual} aria-hidden="true">
                <span className={styles.shapeA} />
                <span className={styles.shapeB} />
                <span className={styles.shapeC} />
                <strong>{project.title.charAt(0)}</strong>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
