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
    description: "A platform that transforms fragmented academic and career opportunity information into structured, searchable records through automated ingestion, extraction, deduplication, and semantic retrieval.",
    tags: ["Applied AI", "Data Systems", "Information Retrieval", "Backend Engineering"],
    year: "2026",
    href: "/projects/applynk",
  },
  {
    slug: "deepflood",
    title: "DeepFlood",
    subtitle: "Leakage-aware hydrological time-series nowcasting",
    description: "A basin-specific machine learning system for same-day streamflow nowcasting using temporal modeling, leakage-aware validation, and peak-sensitive training.",
    tags: ["Time-Series ML", "Temporal Modeling", "Model Evaluation", "ML Engineering"],
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
      </div>

      <div className={styles.titleContainer}>
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
