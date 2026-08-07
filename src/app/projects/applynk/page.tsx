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
              <code>Python · FastAPI · Next.js 16 · PostgreSQL · pgvector · Docker · GitHub Actions</code>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="context" className="reveal"><a href="#context" className={styles.headingAnchor}>link</a>Context</h2>
            <p className="reveal">
              For students, finding a good opportunity is often less about whether it exists and more about whether they happen to see it.
            </p>
            <p className="reveal">
              Scholarships, competitions, internships, exchange programs, workshops, and volunteering opportunities are distributed across university websites, social posts, organization pages, PDFs, and application portals.
            </p>
            <p className="reveal">
              AppLynk transforms fragmented opportunity information into a structured discovery system:
            </p>

            <h2 id="system" className="reveal"><a href="#system" className={styles.headingAnchor}>link</a>System</h2>
            <p className="reveal">
              The system separates uncertain source material from published product data.
            </p>

            <div className={`${styles.architectureStack} reveal`}>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Sources</div>
                <div className={styles.layerItems}>Websites · Social posts · PDFs · User submissions</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Processing</div>
                <div className={styles.layerItems}>Filter · Deduplicate · Extract · Normalize · Enrich</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Data</div>
                <div className={styles.layerItems}>Raw posts · Published opportunities · Embeddings · Profiles</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Product</div>
                <div className={styles.layerItems}>Discovery · Search · Ranking · Collections · Bookmarks</div>
              </div>
            </div>

            <p className="reveal">
              Raw crawler output is treated as evidence, not automatically as product content.
            </p>

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
              <strong>Cheap deterministic filtering before inference:</strong> TF-IDF relevance filtering screens out off-domain documents, while MinHash LSH identifies near-duplicate raw content before any LLM calls.
            </p>
            <p className="reveal">
              <strong>Schema-constrained extraction:</strong> LLM workflows extract bounded factual fields (deadlines, eligibility, provider details) instead of generating uncontrolled prose.
            </p>
            <p className="reveal">
              <strong>Semantic + structured retrieval:</strong> 768-dimensional embeddings stored with PostgreSQL + <code>pgvector</code> complement structured SQL filters to balance intent matching with strict constraints.
            </p>

            <h2 id="product" className="reveal"><a href="#product" className={styles.headingAnchor}>link</a>Product</h2>
            <p className="reveal">
              AppLynk delivers a live discovery experience tailored for Vietnamese students and young professionals, featuring bilingual (Vietnamese / English) interfaces and rapid autocomplete across 3,185 verified education institutions.
            </p>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Bilingual Discovery</strong></td>
                    <td>Vietnamese / English catalog navigation and search interface</td>
                  </tr>
                  <tr>
                    <td><strong>School Directory API</strong></td>
                    <td>Server-side autocomplete suggestions across 3,185 Vietnamese high schools and universities</td>
                  </tr>
                  <tr>
                    <td><strong>Hybrid Retrieval</strong></td>
                    <td>Combines strict SQL metadata filtering with vector similarity (768-d pgvector embeddings)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="reliability" className="reveal"><a href="#reliability" className={styles.headingAnchor}>link</a>Reliability</h2>
            <p className="reveal">
              Seven asynchronous workers coordinate ingestion without external queue dependencies:
            </p>

            <div className={`${styles.reliabilityDiagram} reveal`}>
              <div className={styles.reliabilityNode}>
                Scheduled crawlers
                <div className={styles.reliabilitySubNode}>Six-hour ingestion cycles via GitHub Actions</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>
                PostgreSQL task queue
                <div className={styles.reliabilitySubNode}>Atomic state transitions &amp; transactional ownership</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>Scrape → Extract → Publish</div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.reliabilityNode}>Translate · Classify · Index</div>
              <div className={styles.layerArrow} style={{ marginTop: "4px" }}>↳ Stale Reaper recovers abandoned leases</div>
            </div>

            <p className="reveal">
              Worker leases, heartbeats, and stale-task recovery prevent abandoned tasks and duplicate processing across all seven background execution nodes.
            </p>

            <h2 id="decisions" className="reveal"><a href="#decisions" className={styles.headingAnchor}>link</a>Decisions</h2>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Decision</th>
                    <th>Why</th>
                    <th>Cost / Trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Filter before inference</strong></td>
                    <td>Reduce unnecessary model calls</td>
                    <td>Additional pipeline complexity</td>
                  </tr>
                  <tr>
                    <td><strong>PostgreSQL-backed queue</strong></td>
                    <td>Transactional ownership control</td>
                    <td>Less suitable than dedicated brokers at very large scale</td>
                  </tr>
                  <tr>
                    <td><strong>Separate raw and published data</strong></td>
                    <td>Preserve provenance</td>
                    <td>More explicit lifecycle management</td>
                  </tr>
                  <tr>
                    <td><strong>Semantic + structured retrieval</strong></td>
                    <td>Combine meaning and constraints</td>
                    <td>Two retrieval approaches</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="ownership" className="reveal"><a href="#ownership" className={styles.headingAnchor}>link</a>Ownership</h2>
            <p className="reveal">
              Independent end-to-end build covering frontend application, backend services, ingestion pipeline, LLM extraction workflow, database design, vector retrieval, and deployment automation.
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
