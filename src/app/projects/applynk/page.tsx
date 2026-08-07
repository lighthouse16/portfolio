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
  { label: "Context", id: "context" },
  { label: "Problem", id: "problem" },
  { label: "Architecture", id: "architecture" },
  { label: "AI Pipeline", id: "ai-pipeline" },
  { label: "Reliability", id: "reliability" },
  { label: "Ownership", id: "ownership" },
  { label: "Trade-offs", id: "trade-offs" },
  { label: "Status", id: "status" },
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
            <p className={styles.subtitle}>AI-assisted discovery for fragmented academic and career opportunities.</p>
            <div className={styles.metaRow}>
              <span>Applied AI · Data Systems · Full-Stack Engineering</span>
              <span className={styles.metaDot}>·</span><span>Independent project · 2026 · Vietnam</span>
              <span className={styles.metaDot}>·</span><span>Active development</span>
              <span className={styles.metaDot}>·</span>
              <a href="https://applynk.haidangtrih.me/en" target="_blank" rel="noreferrer" className={styles.metaLink}>
                ↗ live website
              </a>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="context" className="reveal"><a href="#context" className={styles.headingAnchor}>link</a>Context</h2>
            <p className="reveal">AppLynk is an independent discovery platform for Vietnamese students and young professionals searching for scholarships, competitions, internships, workshops, and academic programs.</p>
            <p className="reveal">Opportunities are scattered across organization websites, social posts, PDFs, and portals with inconsistent formats and deadlines. AppLynk automates ingestion and structures the catalog so users can easily search and compare opportunities.</p>

            <h2 id="problem" className="reveal"><a href="#problem" className={styles.headingAnchor}>link</a>Problem</h2>
            <ul className="reveal">
              <li><strong>Heterogeneous sources:</strong> Web pages, Facebook posts, announcements, and PDFs present eligibility and facts differently.</li>
              <li><strong>Unreliable structure:</strong> Deadlines, locations, eligibility rules, and links are often missing or hidden in prose.</li>
              <li><strong>Duplicates &amp; cross-posts:</strong> The same opportunity frequently appears across multiple channels in slightly different formats.</li>
              <li><strong>Expensive inference:</strong> LLM extraction and embedding generation are valuable, but should not be wasted on noisy or repeated data.</li>
            </ul>

            <h2 id="architecture" className="reveal"><a href="#architecture" className={styles.headingAnchor}>link</a>Architecture</h2>
            <p className="reveal">AppLynk pairs a user-facing bilingual Next.js 16 application with a Python/FastAPI backend system.</p>
            <p className="reveal">The core data pipeline follows: <strong>Discover → Collect → Filter → Deduplicate → Extract → Normalize → Publish → Index → Retrieve</strong></p>

            <h2 id="ai-pipeline" className="reveal"><a href="#ai-pipeline" className={styles.headingAnchor}>link</a>AI Pipeline</h2>
            <ul className="reveal">
              <li><strong>Filter before LLM:</strong> TF-IDF relevance filtering screens out off-domain documents, while MinHash LSH identifies near-duplicate raw content before any LLM calls.</li>
              <li><strong>Structured extraction:</strong> Relevant text is passed to LLM extraction workflows enforcing bounded JSON schemas for validated fields.</li>
              <li><strong>Semantic retrieval:</strong> Generates 768-dimensional embeddings stored in PostgreSQL via <code>pgvector</code>, supporting natural-language search alongside structured SQL filters.</li>
              <li><strong>School directory API:</strong> Serves autocomplete suggestions across 3,185 Vietnamese high schools and universities via a server endpoint to keep client bundles lean.</li>
            </ul>

            <h2 id="reliability" className="reveal"><a href="#reliability" className={styles.headingAnchor}>link</a>Reliability</h2>
            <p className="reveal">Background collection, extraction, and indexing are handled by <strong>seven specialized asynchronous workers</strong>.</p>
            <p className="reveal">Rather than introducing heavyweight message queues, tasks are coordinated atomically in PostgreSQL using worker leases, heartbeats, and stale-task recovery. Scheduled crawling workflows run on six-hour cycles via GitHub Actions.</p>

            <h2 id="ownership" className="reveal"><a href="#ownership" className={styles.headingAnchor}>link</a>Ownership</h2>
            <p className="reveal">AppLynk is an end-to-end independent build across product design, full-stack web development, data pipeline engineering, vector retrieval integration, and deployment configuration (Docker / Render / GitHub Actions).</p>

            <h2 id="trade-offs" className="reveal"><a href="#trade-offs" className={styles.headingAnchor}>link</a>Trade-offs</h2>
            <ul className="reveal">
              <li><strong>Filter before inference:</strong> Increases pipeline steps but prevents wasting expensive LLM tokens on non-opportunity or duplicate content.</li>
              <li><strong>PostgreSQL task queue:</strong> Keeps task management transactional and simple for current scale without adding complex external queue infrastructure.</li>
              <li><strong>Separate raw &amp; published storage:</strong> Maintains clean data lineage and prevents raw crawler artifacts from exposing unverified data to users.</li>
              <li><strong>Additive personalization:</strong> Profile signals boost relevance ranking without hiding or gating any catalog entries.</li>
            </ul>

            <h2 id="status" className="reveal"><a href="#status" className={styles.headingAnchor}>link</a>Status</h2>
            <p className="reveal">AppLynk is live at <code>https://applynk.haidangtrih.me/en</code> and under active development. Core ingestion, extraction, vector retrieval, and user flows are implemented; source coverage and ranking refinements remain ongoing.</p>
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
