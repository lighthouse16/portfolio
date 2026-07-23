"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./Projects.module.css";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const projects = [
  {
    slug: "applynk",
    title: "AppLynk",
    subtitle: "AI-driven opportunity discovery platform for youth",
    tags: ["Data Pipeline", "LLM Extraction", "Information Retrieval", "Full-Stack Architecture"],
    year: "2026",
    href: "/projects/applynk",
  },
  {
    slug: "deepflood",
    title: "DeepFlood",
    subtitle: "Time-series ML pipeline for local flood forecasting",
    tags: ["Time-Series ML", "Leakage-Free Validation", "Peak-Sensitive Training", "Inference Pipeline"],
    year: "2025",
    href: "/projects/deepflood",
  },
];

export const Projects = () => {

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <div className={`container ${styles.heading}`}>
        <p className="eyebrow">04 / Projects</p>
        <h2 id="projects-title">
          Built with intent.
          <br />
          <span className={styles.headingAccent}>Made to move.</span>
        </h2>
      </div>

      <ScrollStack useWindowScroll={true} stackPosition="26%">
        {projects.map((project) => (
          <ScrollStackItem key={project.slug}>
            {project.href.startsWith("/") ? (
              <Link href={project.href} className={styles.projectContent} aria-label={`Open ${project.title}`}>
                <div className={styles.projectMeta}>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                </div>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
                <div className={styles.projectAction}>
                  <ArrowUpRight className={styles.actionIcon} />
                </div>
              </Link>
            ) : (
              <a href={project.href} target="_blank" rel="noreferrer" className={styles.projectContent} aria-label={`Open ${project.title}`}>
                <div className={styles.projectMeta}>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                </div>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
                <div className={styles.projectAction}>
                  <ArrowUpRight className={styles.actionIcon} />
                </div>
              </a>
            )}
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
};
