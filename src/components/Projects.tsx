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
    subtitle: "AI-assisted opportunity discovery and data processing platform",
    description: "A full-stack platform that turns fragmented web and social content into structured, searchable academic and career opportunities. The system combines multi-source ingestion, schema-constrained LLM extraction, duplicate control, semantic retrieval, asynchronous processing, and a bilingual user experience.",
    tags: ["Applied AI", "Data Ingestion", "LLM Extraction", "Semantic Retrieval", "Backend Systems"],
    year: "2026",
    href: "/projects/applynk",
  },
  {
    slug: "deepflood",
    title: "DeepFlood",
    subtitle: "Leakage-aware hydrological time-series nowcasting",
    description: "A basin-specific time-series ML system for same-day streamflow estimation in Vietnam's Long Đại basin. DeepFlood combines 39 hydrometeorological signals, seven-day sequences, a Conv1D–BiLSTM–Temporal Attention model, peak-aware training, and chronological validation against a persistence baseline.",
    tags: ["Time-Series ML", "Temporal Validation", "Peak-Aware Regression", "Baseline Evaluation", "ML Engineering"],
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
        <h2 id="projects-title" className={styles.titleWrapper}>
          <span className={styles.lineLeft}>Built with intent.</span>
          <span className={`${styles.headingAccent} ${styles.lineRight}`}>Made to move.</span>
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
