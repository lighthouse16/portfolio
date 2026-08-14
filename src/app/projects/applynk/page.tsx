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
  { label: "System", id: "system" },
  { label: "Pipeline", id: "pipeline" },
  { label: "Product", id: "product" },
  { label: "Reliability", id: "reliability" },
  { label: "Decisions", id: "decisions" },
  { label: "Ownership", id: "ownership" },
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
            <div className={styles.metaRow} style={{ marginTop: "10px" }}>
              <code>Python · FastAPI · Next.js · PostgreSQL · pgvector · Docker · GitHub Actions</code>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="context" className="reveal"><a href="#context" className={styles.headingAnchor}>link</a>Context</h2>
            <p className="reveal">
              For students, finding a good opportunity is often less about whether it exists and more about whether they happen to see it.
            </p>
            <p className="reveal">
              Scholarships, competitions, internships, exchange programs, workshops, and volunteering opportunities are distributed across university websites, social posts, organization pages, PDFs, and application portals. Source formats are inconsistent. Deadlines and eligibility may be buried in prose. The same announcement often appears in several places with slightly different text.
            </p>
            <p className="reveal">
              AppLynk exists to transform that fragmented information into structured, searchable records.
            </p>

            <h2 id="system" className="reveal"><a href="#system" className={styles.headingAnchor}>link</a>System</h2>
            <p className="reveal">
              The core design principle separates raw source material from published product data. Crawler output enters the system as evidence to be evaluated, not as content ready to serve.
            </p>
            <blockquote className={`${styles.pullQuote} reveal`}>
              <p>Raw crawler output is evidence. It is not automatically product content.</p>
            </blockquote>

            <div className={`${styles.architectureStack} reveal`}>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Sources</div>
                <div className={styles.layerItems}>Websites · Social posts · PDFs · User submissions</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Raw ingestion</div>
                <div className={styles.layerItems}>Raw records · Source metadata · Timestamps</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Processing</div>
                <div className={styles.layerItems}>Relevance filtering · Duplicate control · Structured extraction · Normalization</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Publication boundary</div>
                <div className={styles.layerItems}>Validated structured records</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Application data</div>
                <div className={styles.layerItems}>Published opportunities · Vector index · User state</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Product</div>
                <div className={styles.layerItems}>Discovery · Search · Ranking · Collections · Bookmarks</div>
              </div>
            </div>

            <h2 id="pipeline" className="reveal"><a href="#pipeline" className={styles.headingAnchor}>link</a>Pipeline</h2>
            <div className={`${styles.editorialDiagram} reveal`}>
              <div className={styles.diagramFlowHorizontal}>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Discover</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Collect</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Filter</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Deduplicate</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Extract</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Normalize</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Publish</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Index</span></div>
                <div className={styles.diagramArrow}>→</div>
                <div className={styles.diagramStep}><span className={styles.diagramLabel}>Retrieve</span></div>
              </div>
            </div>

            <p className="reveal">
              <strong>Deterministic filtering before inference:</strong> TF-IDF relevance screening rejects off-domain documents, and MinHash LSH identifies near-duplicate raw records before any LLM processing. The goal is to avoid spending probabilistic model calls on content that deterministic checks can reject first.
            </p>
            <p className="reveal">
              <strong>Structured interpretation:</strong> LLM workflows recover bounded structured fields such as deadlines, eligibility, and provider details from heterogeneous source text using schema-constrained output. The model interprets source information; it does not become the source of truth. Structured output is normalized before publication.
            </p>
            <p className="reveal">
              <strong>Hybrid retrieval:</strong> 768-dimensional embeddings stored with PostgreSQL and <code>pgvector</code> support semantic retrieval. Semantic similarity handles conceptual meaning; SQL structured fields enforce explicit constraints such as deadline, category, and eligibility. Both paths are complementary, not interchangeable.
            </p>

            <h2 id="product" className="reveal"><a href="#product" className={styles.headingAnchor}>link</a>Product</h2>
            <p className="reveal">
              AppLynk delivers a live discovery experience for Vietnamese students and young professionals, with bilingual Vietnamese and English interfaces.
            </p>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>System underneath</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Opportunity discovery</strong></td>
                    <td>Structured published records surfaced through ranking logic</td>
                  </tr>
                  <tr>
                    <td><strong>Natural language search</strong></td>
                    <td>Vector retrieval (768-d pgvector embeddings) combined with structured SQL filters</td>
                  </tr>
                  <tr>
                    <td><strong>Personalization</strong></td>
                    <td>Profile signals and ranking adjustments based on user context</td>
                  </tr>
                  <tr>
                    <td><strong>School directory</strong></td>
                    <td>Server-side autocomplete across 3,185 Vietnamese high schools and universities</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="reliability" className="reveal"><a href="#reliability" className={styles.headingAnchor}>link</a>Reliability</h2>
            <p className="reveal">
              Seven asynchronous workers coordinate ingestion without external queue dependencies. Worker roles include: <strong>scrape</strong>, <strong>extract</strong>, <strong>publish</strong>, <strong>translate</strong>, <strong>classify</strong>, <strong>index</strong>, and <strong>reaper</strong>.
            </p>

            <div className={`${styles.reliabilityDiagram} reveal`}>
              <div className={styles.reliabilityNode}>
                Scheduled crawlers
                <div className={styles.reliabilitySubNode}>Six-hour ingestion cycles via GitHub Actions</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>
                PostgreSQL task coordination
                <div className={styles.reliabilitySubNode}>Atomic state transitions · transactional ownership · worker leases · heartbeats</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>Scrape → Extract → Publish</div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>Translate · Classify · Index</div>
              <div className={styles.layerArrow} style={{ marginTop: "4px" }}>↳ Stale Reaper recovers abandoned leases</div>
            </div>

            <p className="reveal">
              <strong>Failure recovery:</strong> If a worker fails after claiming a task, its lease eventually becomes stale. The Reaper releases the abandoned ownership so another worker can safely reclaim the task.
            </p>

            <h2 id="decisions" className="reveal"><a href="#decisions" className={styles.headingAnchor}>link</a>Decisions</h2>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Decision</th>
                    <th>Why</th>
                    <th>Trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Filter before inference</strong></td>
                    <td>Avoid sending obvious noise and near-duplicate content through model processing because deterministic checks are cheaper and sufficient for a first pass</td>
                    <td>Adds a preprocessing stage; mis-calibrated thresholds could incorrectly reject valid content</td>
                  </tr>
                  <tr>
                    <td><strong>PostgreSQL-backed task coordination</strong></td>
                    <td>Task state and transactional ownership stay close to application data without introducing another stateful infrastructure component</td>
                    <td>A dedicated message broker may become more appropriate at materially larger scale or throughput</td>
                  </tr>
                  <tr>
                    <td><strong>Separate raw and published data</strong></td>
                    <td>Preserve provenance and keep unverified crawler output away from users; makes the publication decision an explicit step</td>
                    <td>Requires managing a two-stage data lifecycle rather than publishing records directly on ingest</td>
                  </tr>
                  <tr>
                    <td><strong>Semantic + structured retrieval</strong></td>
                    <td>Semantic similarity handles conceptual meaning and intent; structured fields enforce explicit constraints that vector distance cannot reliably express</td>
                    <td>Requires maintaining two complementary retrieval paths with separate indexing concerns</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="ownership" className="reveal"><a href="#ownership" className={styles.headingAnchor}>link</a>Ownership</h2>
            <p className="reveal">
              Independent end-to-end build covering product interface, full-stack application, ingestion architecture, structured extraction, database design, semantic retrieval, worker coordination, and deployment automation.
            </p>
            <p className="reveal">
              The project is fundamentally about deciding where uncertainty belongs in a system and building the surrounding infrastructure to make that boundary dependable.
            </p>

            <h2 id="status" className="reveal"><a href="#status" className={styles.headingAnchor}>link</a>Status</h2>
            <p className="reveal">
              Live product: <a href="https://applynk.haidangtrih.me/en" target="_blank" rel="noreferrer" className={styles.metaLink}><code>https://applynk.haidangtrih.me/en</code></a>
            </p>
            <p className="reveal">
              Active development focused on expanding sources, improving ranking, and refining retrieval quality.
            </p>
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
