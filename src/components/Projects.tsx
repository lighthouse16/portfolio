"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import styles from "./Projects.module.css";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

import { PROJECTS } from "@/data/projects";

export const Projects = () => {

  return (
    <section
      id="projects"
      className={styles.section}
      aria-labelledby="projects-title"
    >
      <div className={`container ${styles.headerGrid}`}>
        <p className="eyebrow">04 / Projects</p>
        <div className={styles.titleContainer}>
          <h2 id="projects-title" className={styles.titleWrapper}>
            <span>
              Selected <span className={styles.headingAccent}>work.</span>
            </span>
          </h2>
        </div>
      </div>

      <ScrollStack useWindowScroll={true} stackPosition="26%">
        {PROJECTS.map((project) => {
          const cardContent = (
            <>
              <div className={styles.projectMeta}>
                <span className={styles.year}>{project.year}</span>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.subtitle}>{project.cardDescription || project.subtitle}</p>
                {project.metrics && (
                  <div className={styles.metricsRow}>
                    <span className={styles.metricsValue}>{project.metrics.usageLine}</span>
                    <span className={styles.metricsDot} aria-hidden="true">·</span>
                    <span className={styles.metricsPeriod}>{project.metrics.reportingPeriod}</span>
                  </div>
                )}
              </div>
              <div className={styles.projectTags}>
                {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
              <div className={styles.projectAction}>
                <ArrowUpRight className={styles.actionIcon} />
              </div>
            </>
          );

          return (
            <ScrollStackItem key={project.slug}>
              {project.href.startsWith("/") ? (
                <Link href={project.href} className={styles.projectContent} aria-label={`Open ${project.title}`}>
                  {cardContent}
                </Link>
              ) : (
                <a href={project.href} target="_blank" rel="noreferrer" className={styles.projectContent} aria-label={`Open ${project.title}`}>
                  {cardContent}
                </a>
              )}
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
};
