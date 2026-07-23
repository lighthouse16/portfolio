"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import LineSidebar from "@/components/LineSidebar";
import styles from "../deepflood/DeepFlood.module.css";

gsap.registerPlugin(useGSAP);

const sections = [
  { label: "Overview", id: "overview" },
  { label: "The Problem", id: "the-problem" },
  { label: "What I Built", id: "what-i-built" },
  { label: "System Design", id: "system-design" },
  { label: "My Contribution", id: "my-contribution" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Key Features", id: "key-features" },
  { label: "Engineering Decisions", id: "engineering-decisions" },
  { label: "Current Status", id: "current-status" },
];

export default function AppLynkCaseStudy() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      pageRef.current?.style.setProperty("--mouse-x", `${event.clientX}px`);
      pageRef.current?.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (reduceMotion) return;
    gsap.to(".reveal", { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" });
  }, { scope: pageRef });

  return (
    <main className={styles.page} ref={pageRef}>
      <div className={styles.dotGrid} aria-hidden="true" />
      <div className={`container ${styles.gridContainer}`}>
        <div className={styles.mainContent}>
          <Link href="/#projects" className={styles.backLink}><ArrowLeft size={16} /> Back</Link>

          <header className={`${styles.header} reveal`}>
            <h1 className={styles.title}>Making opportunity discovery feel less accidental.</h1>
            <p className={styles.subtitle}>An AI-assisted platform that turns scattered youth opportunities into structured, searchable, and relevant choices.</p>
            <div className={styles.metaRow}>
              <span>Product &amp; Full-Stack Engineering · Independent project</span>
              <span className={styles.metaDot}>·</span><span>2026 · Vietnam</span>
              <span className={styles.metaDot}>·</span><span>Work in progress</span>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="overview" className="reveal"><a href="#overview" className={styles.headingAnchor}>link</a>Overview</h2>
            <p className="reveal">AppLynk is a discovery platform for Vietnamese students and young people. It brings scholarships, competitions, internships, academic programs, and extracurricular activities into one system, then uses structured data, filters, and semantic retrieval to make the catalog easier to search.</p>
            <p className="reveal">I am building AppLynk as an independent project across product design, frontend development, data modeling, ingestion, LLM-assisted extraction, duplicate control, and search. The project asks a practical question: how can software reduce discovery friction while keeping comparison and selection with the user?</p>

            <h2 id="the-problem" className="reveal"><a href="#the-problem" className={styles.headingAnchor}>link</a>The Problem</h2>
            <p className="reveal">Valuable opportunities are spread across organization websites, social pages, documents, and application portals. Their formats differ, deadlines change, and titles often reveal little about eligibility or fit. Keyword search can retrieve exact phrases, but it struggles when a student describes an intention rather than a program name.</p>
            <p className="reveal">Aggregation alone does not solve this. A useful platform also needs reliable extraction, consistent fields, duplicate control, timely publishing, and ranking that explains relevance through the underlying opportunity data.</p>

            <h2 id="what-i-built" className="reveal"><a href="#what-i-built" className={styles.headingAnchor}>link</a>What I Built</h2>
            <p className="reveal">I designed two connected applications. The user-facing Next.js application supports browsing, search, profiles, and cloud-synced bookmarks. A FastAPI service handles collection and administration: retrieving source pages, extracting structured records with LLMs, normalizing fields, checking duplicates, generating stable identifiers, and publishing reviewed records to PostgreSQL.</p>
            <p className="reveal">Search combines conventional filters with vector similarity over 768-dimensional embeddings. This supports queries based on meaning as well as exact wording; profile fields are available as ranking inputs, while the full catalog remains browsable.</p>

            <h2 id="system-design" className="reveal"><a href="#system-design" className={styles.headingAnchor}>link</a>System Design</h2>
            <ul className="reveal">
              <li><strong>Collect:</strong> Configurable crawlers retrieve opportunity pages through Firecrawl, Crawl4AI, or Apify.</li>
              <li><strong>Extract:</strong> LLM processing converts varied pages into a consistent opportunity schema.</li>
              <li><strong>Normalize:</strong> Dates, categories, eligibility, providers, locations, and source references are cleaned before publication.</li>
              <li><strong>Deduplicate:</strong> Deterministic identifiers and similarity checks reduce repeated records from overlapping sources.</li>
              <li><strong>Index:</strong> PostgreSQL and pgvector store structured fields and embeddings for hybrid retrieval.</li>
              <li><strong>Match:</strong> Search and ranking combine query meaning, explicit filters, and available profile signals.</li>
              <li><strong>Deliver:</strong> Next.js presents discovery, detail, profile, and bookmark flows across desktop and mobile.</li>
            </ul>

            <h2 id="my-contribution" className="reveal"><a href="#my-contribution" className={styles.headingAnchor}>link</a>My Contribution</h2>
            <p className="reveal">AppLynk is an independent product and engineering project. My work spans the complete path from an unstructured source page to a useful recommendation surface.</p>
            <ul className="reveal">
              <li>Defined the product scope, information architecture, and core user journeys.</li>
              <li>Built the responsive Next.js application and reusable design system.</li>
              <li>Implemented authentication, profiles, bookmarks, and database access controls with Supabase.</li>
              <li>Built the FastAPI administration service and configurable crawling pipeline.</li>
              <li>Combined exact content hashes with embedding similarity checks to identify repeated source material.</li>
              <li>Implemented database-backed task claiming and stale-lock recovery for concurrent workers.</li>
              <li>Added tests, container configuration, and deployment definitions for repeatable delivery.</li>
            </ul>

            <h2 id="tech-stack" className="reveal"><a href="#tech-stack" className={styles.headingAnchor}>link</a>Tech Stack</h2>
            <ul className="reveal">
              <li><strong>Frontend:</strong> Next.js, React, TypeScript, Tailwind CSS, GSAP, Framer Motion</li>
              <li><strong>Backend:</strong> Async Python, FastAPI, Uvicorn</li>
              <li><strong>Data:</strong> Supabase, PostgreSQL, pgvector</li>
              <li><strong>AI processing:</strong> Gemini, OpenRouter, embeddings, structured LLM extraction</li>
              <li><strong>Collection:</strong> Firecrawl, Crawl4AI, Apify</li>
              <li><strong>Delivery:</strong> Docker, Render, process management, scheduled workers</li>
            </ul>

            <h2 id="key-features" className="reveal"><a href="#key-features" className={styles.headingAnchor}>link</a>Key Features</h2>
            <ul className="reveal">
              <li><strong>Semantic discovery:</strong> Users can describe what they want instead of guessing exact database terminology.</li>
              <li><strong>Duplicate control:</strong> Exact content hashes catch identical records, while embedding similarity checks flag semantically related source material.</li>
              <li><strong>Profile-aware ranking inputs:</strong> Education and interest fields are available to the ranking layer without hiding the full catalog.</li>
              <li><strong>Persistent shortlists:</strong> Authenticated users can save opportunities and continue research across sessions.</li>
              <li><strong>School directory:</strong> A server-side API provides suggestions across 3,185 Vietnamese high schools and universities without shipping the dataset in the client bundle.</li>
              <li><strong>Pipeline oversight:</strong> An administration surface exposes source configuration, task status, and publication controls.</li>
            </ul>

            <h2 id="engineering-decisions" className="reveal"><a href="#engineering-decisions" className={styles.headingAnchor}>link</a>Engineering Decisions</h2>
            <p className="reveal">The harder part of LLM-assisted ingestion is repeatable processing. The PostgreSQL task queue atomically claims pending work with row-level locking and resets stale locks after a timeout, preventing concurrent workers from claiming the same task during dequeue.</p>
            <p className="reveal">I also moved the school directory behind a debounced server API. This keeps 3,185 records out of the browser bundle while preserving autocomplete. Both decisions support the same goal: keeping data processing predictable around the AI-assisted steps.</p>

            <h2 id="current-status" className="reveal"><a href="#current-status" className={styles.headingAnchor}>link</a>Current Status</h2>
            <p className="reveal">AppLynk is under active development. The account flows, ingestion service, extraction pipeline, vector retrieval, and administration workflow are implemented; source coverage, ranking evaluation, and operational hardening remain ongoing work.</p>
            <p className="reveal">I am not reporting adoption or recommendation-quality metrics before a stable evaluation process exists. The current case study documents implemented system behavior and the engineering decisions behind it, not proven product impact.</p>
          </article>
        </div>

        <aside className={styles.sidebar} aria-label="Table of contents">
          <div className={styles.tocHeader}>On This Page</div>
          <LineSidebar items={sections.map(({ label }) => label)} accentColor="var(--ink)" textColor="var(--muted)" markerColor="var(--line)" showIndex={false} itemGap={12} fontSize={0.85} onItemClick={(index) => document.getElementById(sections[index].id)?.scrollIntoView({ behavior: "smooth" })} />
        </aside>
      </div>
    </main>
  );
}
