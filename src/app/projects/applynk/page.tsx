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
  { label: "Problem & Constraints", id: "problem-constraints" },
  { label: "System Overview", id: "system-overview" },
  { label: "Architecture & Data Flow", id: "architecture-data-flow" },
  { label: "Ownership", id: "ownership" },
  { label: "Core Technologies", id: "core-technologies" },
  { label: "Selected Capabilities", id: "selected-capabilities" },
  { label: "Engineering Trade-offs", id: "engineering-trade-offs" },
  { label: "Status & Evaluation", id: "status-evaluation" },
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
            <p className={styles.subtitle}>An AI-assisted data product that turns fragmented opportunity information into structured, searchable, and easier-to-compare records.</p>
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
            <p className="reveal">AppLynk is an independent product and engineering project for Vietnamese students and young professionals searching for scholarships, competitions, internships, workshops, exchange programs, volunteering opportunities, and other academic or career programs.</p>
            <p className="reveal">The problem is not a lack of information. It is the opposite: opportunities are scattered across organization websites, Facebook posts, PDFs, application portals, and university pages, often with inconsistent titles, deadlines, eligibility language, and structure.</p>
            <p className="reveal">I built AppLynk around a simple product premise: <strong>software should reduce the work required to discover and compare opportunities without pretending to make the final decision for the user.</strong></p>
            <p className="reveal">The result is a bilingual discovery platform backed by an automated data-processing system that collects source content, converts it into a consistent schema, controls duplicates, generates embeddings, and serves the resulting records through structured filters and semantic search.</p>

            <h2 id="problem-constraints" className="reveal"><a href="#problem-constraints" className={styles.headingAnchor}>link</a>Problem &amp; Constraints</h2>
            <p className="reveal">A conventional directory would solve only the storage problem. AppLynk has to solve several harder problems before a record is useful enough to show to a user.</p>
            <ul className="reveal">
              <li><strong>Heterogeneous sources:</strong> A scholarship page, Facebook recruitment post, competition announcement, and PDF flyer can describe the same types of facts in completely different formats.</li>
              <li><strong>Unreliable structure:</strong> Fields such as deadline, organizer, target audience, benefits, eligibility, location, and application link are frequently missing, embedded in long prose, or expressed inconsistently.</li>
              <li><strong>Duplicate and cross-posted content:</strong> The same opportunity can appear on several channels with different formatting, shortened descriptions, or reposted text.</li>
              <li><strong>Changing information:</strong> Deadlines and program details can become stale. A discovery product therefore has to preserve source references and separate collected content from published records.</li>
              <li><strong>Expensive probabilistic processing:</strong> LLM calls and embedding operations are useful, but they should not be the first or only tool in the pipeline. Deterministic and statistical filters should remove obvious noise or duplicates before more expensive inference when possible.</li>
              <li><strong>Concurrent background work:</strong> Collection, extraction, publication, translation, classification, and indexing do not happen as one synchronous web request. They require recoverable background processing with explicit task state.</li>
            </ul>
            <p className="reveal">These constraints shaped AppLynk more than the choice of frontend framework.</p>

            <h2 id="system-overview" className="reveal"><a href="#system-overview" className={styles.headingAnchor}>link</a>System Overview</h2>
            <p className="reveal">AppLynk consists of two connected surfaces.</p>
            <h3 className="reveal">User-facing application</h3>
            <p className="reveal">The Next.js application provides bilingual Vietnamese / English routes, opportunity browsing and detail pages, structured filters, natural-language semantic search, user authentication, profiles and interests, persistent bookmarks, onboarding flows, category pages, related-opportunity suggestions, server-side school autocomplete, and dynamic social preview images. The interface is designed to keep the full catalog browsable; personalization and semantic ranking can change ordering, but they do not hide the underlying dataset from the user.</p>
            <h3 className="reveal">Data-processing and administration system</h3>
            <p className="reveal">A Python/FastAPI backend manages source configuration, web collection, relevance filtering, near-duplicate detection, LLM-based structured extraction, normalization, semantic duplicate checks, publication, translation, collection classification, search indexing, and operational review. The pipeline is backed by PostgreSQL and coordinated through database-managed task state rather than an external streaming platform.</p>

            <h2 id="architecture-data-flow" className="reveal"><a href="#architecture-data-flow" className={styles.headingAnchor}>link</a>Architecture &amp; Data Flow</h2>
            <p className="reveal">The core data path is: <strong>Discover → Collect → Filter → Deduplicate → Extract → Normalize → Publish → Index → Retrieve</strong></p>
            <ol className="reveal">
              <li><strong>Discover and collect:</strong> Configurable collectors use tools such as Crawl4AI, Playwright, Firecrawl, Apify, and direct HTTP retrieval depending on the source. The system also supports query expansion and search-result evaluation for discovering relevant pages beyond a fixed source list.</li>
              <li><strong>Filter before expensive inference:</strong> Collected text passes through relevance checks before LLM extraction. A TF-IDF-based relevancy layer helps reject documents that do not resemble the opportunity domain. Near-duplicate raw content is screened using MinHash LSH, reducing repeated downstream processing for cross-posted material. This stage exists because an LLM should not be used to solve a problem that a cheaper deterministic or statistical filter can solve first.</li>
              <li><strong>Structured extraction:</strong> Relevant unstructured text is converted into normalized fields through schema-constrained LLM extraction. The extraction workflow is designed around explicit data contracts rather than free-form generation. Output is validated and malformed structured responses can be repaired before records move forward. The objective is not to &quot;ask an LLM what the page means.&quot; It is to turn inconsistent source documents into a bounded application schema.</li>
              <li><strong>Semantic duplicate control:</strong> AppLynk generates 768-dimensional embeddings for semantic comparison and stores them in PostgreSQL through pgvector. Vector similarity complements deterministic identifiers and near-duplicate text filtering. These mechanisms operate at different stages because exact duplicates, lightly edited reposts, and semantically equivalent announcements are not the same problem.</li>
              <li><strong>Publish and enrich:</strong> Validated records are transferred into the published opportunity dataset, where downstream workers can classify them into curated collections, generate translations, save embeddings, trigger search indexing, and refresh user-facing data. Raw source material and user-facing records remain separate so that ingestion artifacts do not automatically become published content.</li>
              <li><strong>Retrieve:</strong> Search combines explicit structured filters, keyword-compatible fields, vector similarity, and ranking signals such as freshness, deadline, extraction confidence, and available profile affinity. Semantic retrieval is an additional retrieval path, not a replacement for structured search.</li>
            </ol>

            <h2 id="ownership" className="reveal"><a href="#ownership" className={styles.headingAnchor}>link</a>Ownership</h2>
            <p className="reveal">AppLynk is an independent project. I designed and implemented the system end to end. My ownership spans three areas:</p>
            <h3 className="reveal">Product &amp; application</h3>
            <ul className="reveal">
              <li>Defined the product scope and information architecture.</li>
              <li>Designed the core discovery, search, profile, onboarding, and bookmark flows.</li>
              <li>Built the bilingual Next.js interface and reusable design system.</li>
              <li>Implemented authentication and application-level data access through Supabase.</li>
            </ul>
            <h3 className="reveal">Data &amp; applied AI</h3>
            <ul className="reveal">
              <li>Designed the opportunity schema and raw-to-published data flow.</li>
              <li>Built multi-source ingestion.</li>
              <li>Implemented relevance filtering and duplicate control.</li>
              <li>Integrated schema-constrained LLM extraction.</li>
              <li>Added 768-dimensional embedding generation and pgvector retrieval.</li>
              <li>Built profile-aware and freshness-aware ranking signals.</li>
            </ul>
            <h3 className="reveal">Reliability &amp; delivery</h3>
            <ul className="reveal">
              <li>Built database-backed task coordination for concurrent workers.</li>
              <li>Added leases, heartbeat state, and stale-task recovery.</li>
              <li>Added automated checks through GitHub Actions.</li>
              <li>Scheduled recurring crawler workflows.</li>
              <li>Containerized backend services and defined cloud deployment configuration.</li>
            </ul>
            <p className="reveal">The project is useful to me precisely because it requires more than one layer of engineering: probabilistic AI components have to live inside deterministic data contracts, recoverable workflows, and a usable product.</p>

            <h2 id="core-technologies" className="reveal"><a href="#core-technologies" className={styles.headingAnchor}>link</a>Core Technologies</h2>
            <ul className="reveal">
              <li><strong>Application:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS, Base UI, GSAP / Framer Motion</li>
              <li><strong>Backend:</strong> Python 3.11, FastAPI, Asyncio, Uvicorn</li>
              <li><strong>Data:</strong> PostgreSQL, Supabase, pgvector</li>
              <li><strong>Applied AI:</strong> Gemini, OpenRouter, Schema-constrained LLM extraction, 768-dimensional embeddings, TF-IDF, MinHash LSH, Cosine similarity, RapidFuzz / trigram-style text similarity</li>
              <li><strong>Collection:</strong> Crawl4AI, Playwright, Firecrawl, Apify, Beautiful Soup / HTTP retrieval</li>
              <li><strong>Delivery &amp; Quality:</strong> GitHub Actions, Docker / Docker Compose, Render deployment configuration, Scheduled crawler workflows</li>
            </ul>

            <h2 id="selected-capabilities" className="reveal"><a href="#selected-capabilities" className={styles.headingAnchor}>link</a>Selected Capabilities</h2>
            <ul className="reveal">
              <li><strong>Semantic search:</strong> Users can describe the kind of opportunity they want without knowing the exact title or terminology used by the source. Natural-language queries are embedded and matched against stored vectors, while structured filters remain available.</li>
              <li><strong>Multi-stage data quality:</strong> AppLynk uses relevance filtering for off-domain documents, deterministic identifiers for exact repetition, MinHash LSH for near-duplicate raw text, semantic similarity for meaning-level repetition, and schema validation before publication.</li>
              <li><strong>Asynchronous ingestion:</strong> Organized around 7 specialized asynchronous workers covering scraping, extraction, publication, classification, translation, indexing, and stale-task recovery. Tasks are coordinated through PostgreSQL-backed queue state with atomic claiming, worker leases, heartbeat updates, and recovery.</li>
              <li><strong>Scheduled collection:</strong> Crawler workflows run on a recurring schedule through GitHub Actions, including six-hour ingestion cycles for automated source refresh.</li>
              <li><strong>Search and ranking:</strong> Ranking can incorporate semantic similarity, freshness, deadline proximity, extraction confidence, and user profile affinity.</li>
              <li><strong>User-facing product flows:</strong> Includes bilingual routing, user authentication, profiles, cloud-synced bookmarks, opportunity detail pages, category hubs, onboarding, related opportunity suggestions, and dynamic OpenGraph images.</li>
              <li><strong>School autocomplete:</strong> A server-side endpoint serves suggestions from a directory of 3,185 Vietnamese high schools and universities, keeping data out of the client bundle.</li>
            </ul>

            <h2 id="engineering-trade-offs" className="reveal"><a href="#engineering-trade-offs" className={styles.headingAnchor}>link</a>Engineering Trade-offs</h2>
            <ul className="reveal">
              <li><strong>Filter before the LLM:</strong> LLMs are flexible but comparatively expensive and probabilistic. AppLynk uses domain relevance filtering and near-duplicate checks before structured extraction where possible, reducing unnecessary inference.</li>
              <li><strong>PostgreSQL-backed coordination instead of introducing another queue service:</strong> The system already depends on PostgreSQL for application and vector data. Using database-backed task state keeps task claiming, worker ownership, and publication transitions close to transactional data.</li>
              <li><strong>Separate raw data from published data:</strong> Collected content is not automatically trustworthy enough to become a user-facing record. The raw-to-published separation creates a boundary for processing without losing original source context.</li>
              <li><strong>Combine structured retrieval with semantic retrieval:</strong> Embeddings are useful for user intent, but exact attributes such as type, deadline, location, or student level are better represented as structured data.</li>
              <li><strong>Keep personalization additive:</strong> User interests and profile fields contribute ranking signals, but the full catalog remains accessible.</li>
            </ul>

            <h2 id="status-evaluation" className="reveal"><a href="#status-evaluation" className={styles.headingAnchor}>link</a>Status &amp; Evaluation</h2>
            <p className="reveal">AppLynk is live and under active development.</p>
            <h3 className="reveal">Implemented</h3>
            <p className="reveal">Bilingual user application, authentication, profiles, opportunity browsing, detail views, bookmarking, ingestion, relevance filtering, near-duplicate filtering, structured LLM extraction, normalization, pgvector semantic retrieval, 7-worker background pipeline, task recovery, administration workflows, scheduled ingestion, automated checks, deployment configuration.</p>
            <h3 className="reveal">Still being evaluated or improved</h3>
            <p className="reveal">Source coverage, ranking quality, extraction quality across heterogeneous source types, operational robustness under longer-running unattended ingestion, user behavior and adoption, recommendation usefulness.</p>
            <h3 className="reveal">Claims I deliberately do not make</h3>
            <p className="reveal">I do not currently report a user-adoption number, recommendation-accuracy score, or product-impact percentage. I also do not describe AppLynk as a proprietary LLM, a massive distributed streaming system, or a proven recommendation engine. The current case study documents <strong>implemented system behavior, design trade-offs, and the engineering required to make AI-assisted data processing dependable enough to use.</strong></p>
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
