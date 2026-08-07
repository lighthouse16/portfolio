"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import LineSidebar from "@/components/LineSidebar";
import styles from "./DeepFlood.module.css";

gsap.registerPlugin(useGSAP);

const sections = [
  { label: "Origin", id: "origin" },
  { label: "Problem", id: "problem" },
  { label: "Method", id: "method" },
  { label: "Validation", id: "validation" },
  { label: "Results", id: "results" },
  { label: "Limitations", id: "limitations" },
  { label: "Demo", id: "demo" },
];

export default function DeepFloodCaseStudy() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        pageRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        pageRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (reduceMotion) return;
    gsap.to(".reveal", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
    });
  }, { scope: pageRef });

  return (
    <main className={styles.page} ref={pageRef}>
      <div className={styles.dotGrid} />
      <div className={`container ${styles.gridContainer}`}>
        
        {/* Main Content Column */}
        <div className={styles.mainContent}>
          <Link href="/#projects" className={styles.backLink}>
            <ArrowLeft size={16} /> Back
          </Link>
          
          <header className={`${styles.header} reveal`}>
            <h1 className={styles.title}>
              Teaching a flood model to hear one river.
            </h1>
            <p className={styles.subtitle}>
              Same-day streamflow nowcasting for local extremes.
            </p>
            <div className={styles.metaRow}>
              <span>Time-Series ML · Hydrological Nowcasting · ML Engineering</span>
              <span className={styles.metaDot}>·</span>
              <span>SEAS 2025 team origin · Independently re-engineered</span>
              <span className={styles.metaDot}>·</span>
              <span>Long Đại basin, Quảng Bình, Vietnam</span>
              <span className={styles.metaDot}>·</span>
              <a href="https://deepflood.haidangtrih.me/" target="_blank" rel="noreferrer" className={styles.metaLink}>
                ↗ live dashboard
              </a>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="origin" className="reveal">
              <a href="#origin" className={styles.headingAnchor}>link</a>Origin
            </h2>
            <p className="reveal">
              DeepFlood originated as a team prototype during the <strong>Summer in Engineering and Applied Sciences (SEAS)</strong> program in July–August 2025.
            </p>
            <p className="reveal">
              Following the program, I independently re-engineered the system around a core question: <em>Can a basin-specific time-series model preserve rare local streamflow extremes while eliminating data leakage in validation?</em>
            </p>
            <p className="reveal">
              DeepFlood is a <strong>same-day streamflow nowcasting prototype</strong> for Vietnam&apos;s Long Đại basin, using day-T meteorology and past river-flow lags. It is not an operational multi-day early-warning system.
            </p>

            <h2 id="problem" className="reveal">
              <a href="#problem" className={styles.headingAnchor}>link</a>Problem
            </h2>
            <ul className="reveal">
              <li><strong>Local scale vs global range:</strong> Long Đại&apos;s recorded peak reaches ~7,990.3 m³/s. Generic multi-basin models smooth out local extremes to optimize global error.</li>
              <li><strong>Rare-event imbalance:</strong> Normal flow dominates the dataset, leading unweighted models to underpredict rare, high-consequence flood events.</li>
              <li><strong>Temporal data leakage:</strong> Random dataset splitting or fitting scalers across the full timeline leaks future information into historical validation.</li>
            </ul>

            <h2 id="method" className="reveal">
              <a href="#method" className={styles.headingAnchor}>link</a>Method
            </h2>
            <p className="reveal">
              The model ingests <strong>7-day sequences</strong> composed of <strong>39 engineered hydrometeorological signals</strong> (precipitation accumulation over 3–60 days, strictly lagged flow over 1–14 days, rolling stats, and seasonal encodings).
            </p>
            <p className="reveal">
              <strong>Neural architecture (TensorFlow/Keras):</strong>
            </p>
            <ol className="reveal">
              <li><strong>Conv1D (64 filters):</strong> Extracts short-term temporal patterns and rates of change.</li>
              <li><strong>Bidirectional LSTM (128 &amp; 64 units):</strong> Captures sequential dependencies across the time window.</li>
              <li><strong>Temporal Attention:</strong> Weighs informative timesteps before passing to the dense regression head.</li>
            </ol>
            <p className="reveal">
              <strong>Peak-aware sample weighting:</strong> Training samples are weighted by magnitude using <code>weight = 1 + 30 × (y / y_max)</code>, penalizing large flood errors up to ~31×.
            </p>

            <h2 id="validation" className="reveal">
              <a href="#validation" className={styles.headingAnchor}>link</a>Validation
            </h2>
            <ul className="reveal">
              <li><strong>Chronological holdout:</strong> 70/30 split in chronological order (final 30% = 107 validation observations). Because this period informed checkpoint selection, it is reported as a <em>validation period</em>, not an independent test set.</li>
              <li><strong>Train-only scaling:</strong> Feature and target scalers are fitted exclusively on the 70% training split to prevent future range leakage.</li>
              <li><strong>Strictly lagged flow:</strong> Day-T streamflow is never an input to its own estimation.</li>
            </ul>

            <h2 id="results" className="reveal">
              <a href="#results" className={styles.headingAnchor}>link</a>Results
            </h2>
            <div className="reveal" style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ padding: "8px 12px" }}>Metric</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>DeepFlood</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Persistence Baseline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 12px" }}>MAE</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>130.8 m³/s</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>128.1 m³/s</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 12px" }}>RMSE</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>148.1 m³/s</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>314.3 m³/s</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px 12px" }}>NSE</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>0.726</td>
                    <td style={{ padding: "8px 12px", textAlign: "right" }}>-0.223</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="reveal">
              <strong>Trade-off analysis:</strong> Persistence slightly leads on MAE because DeepFlood&apos;s peak-weighted objective sacrifices minor average precision on normal-flow days. However, DeepFlood substantially improves RMSE (148.1 vs 314.3) and NSE (0.726 vs -0.223), proving far superior at capturing major flow variations.
            </p>
            <p className="reveal">
              <strong>Holdout peak:</strong> Observed peak 2,576.39 m³/s vs predicted 2,800.68 m³/s (+8.7% magnitude error, 0-day timing lag).
            </p>

            <h2 id="limitations" className="reveal">
              <a href="#limitations" className={styles.headingAnchor}>link</a>Limitations
            </h2>
            <ul className="reveal">
              <li>No untouched independent test set (validation used for early stopping).</li>
              <li>No multi-day forecast lead time.</li>
              <li>No operational flood-warning deployment claim.</li>
              <li>No cross-basin generalizability claim without retraining/re-calibration.</li>
            </ul>

            <h2 id="demo" className="reveal">
              <a href="#demo" className={styles.headingAnchor}>link</a>Demo
            </h2>
            <p className="reveal">
              An inspectable evaluation dashboard displaying pre-computed hydrographs, residuals, and sensitivity controls is available live at <code>https://deepflood.haidangtrih.me/</code>. It is a static evaluation artifact, not an online inference server.
            </p>
          </article>
        </div>

        {/* Sticky Table of Contents Sidebar */}
        <aside className={styles.sidebar} aria-label="Table of contents">
          <div className={styles.tocHeader}>
            On This Page
          </div>
          <LineSidebar
            items={sections.map(({ label }) => label)}
            accentColor="var(--ink)"
            textColor="var(--muted)"
            markerColor="var(--line)"
            showIndex={false}
            itemGap={12}
            fontSize={0.85}
            onItemClick={(index) => {
              const el = document.getElementById(sections[index].id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </aside>

      </div>
    </main>
  );
}
