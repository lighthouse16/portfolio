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

export default function DeepFloodCaseStudy() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pageRef.current) {
        pageRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        pageRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
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
              A flood-forecasting system that helps a local river model respond to the extremes that broad models often miss.
            </p>
            <div className={styles.metaRow}>
              <span>ML Engineering · Team project extended independently</span>
              <span className={styles.metaDot}>·</span>
              <span>SEAS Summer School, August 2025 · Long Dai basin, Vietnam</span>
              <span className={styles.metaDot}>·</span>
              <a href="https://lighthouse16.github.io/deepflood/" target="_blank" rel="noreferrer" className={styles.metaLink}>
                ↗ live dashboard
              </a>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="overview" className="reveal">
              <a href="#overview" className={styles.headingAnchor}>link</a>Overview
            </h2>
            <p className="reveal">
              DeepFlood began as a team project at the SEAS Summer School in August 2025. After the program, I independently extended the prototype into a basin-specific forecasting system: auditing the evaluation path, removing future-data leakage, prioritizing rare flood peaks, and publishing an inspectable dashboard.
            </p>

            <h2 id="the-problem" className="reveal">
              <a href="#the-problem" className={styles.headingAnchor}>link</a>The Problem
            </h2>
            <p className="reveal">
              Long Dai&apos;s historic flood peak reached approximately 7,990 m³/s, but broad multi-basin models can treat local extremes as small relative to much larger rivers. Normal-flow days also dominate the dataset, encouraging safe predictions that miss rare, high-consequence floods. I redesigned the learning problem around local scale, leakage-safe evaluation, and peak response.
            </p>

            <h2 id="what-i-built" className="reveal">
              <a href="#what-i-built" className={styles.headingAnchor}>link</a>What I Built
            </h2>
            <p className="reveal">
              I rebuilt the workflow around 39 engineered weather and hydrological signals, seven-day sequences, and a Conv1D–BiLSTM–Temporal Attention model. Training examples receive magnitude-based sample weights of up to about 31× the base weight, while feature and target scalers are fitted only on the training period. A Chart.js dashboard makes predictions, errors, rainfall context, and scenarios easy to inspect.
            </p>

            <h2 id="my-contribution" className="reveal">
              <a href="#my-contribution" className={styles.headingAnchor}>link</a>My Contribution
            </h2>
            <p className="reveal">
              The initial prototype was built collaboratively during the SEAS Summer School. My later contribution focused on turning that prototype into a more rigorous, basin-specific system.
            </p>
            <ul className="reveal">
              <li>Audited the original validation and feature-generation path.</li>
              <li>Removed look-ahead and scaler leakage.</li>
              <li>Localized the training distribution to the Long Dai basin.</li>
              <li>Added magnitude-based sample weighting of up to about 31× the base weight for the largest training examples.</li>
              <li>Rebuilt the Conv1D–BiLSTM–Temporal Attention training pipeline.</li>
              <li>Preserved model and scaler artifacts for repeatable inference.</li>
              <li>Connected predictions to an inspectable dashboard.</li>
              <li>Containerized the frontend with Nginx and Docker, then published it through GitHub Pages.</li>
            </ul>

            <h2 id="tech-stack" className="reveal">
              <a href="#tech-stack" className={styles.headingAnchor}>link</a>Tech Stack
            </h2>
            <ul className="reveal">
              <li><strong>Modeling:</strong> Python, TensorFlow/Keras, Conv1D, BiLSTM, Temporal Attention</li>
              <li><strong>Time-series engineering:</strong> Pandas, NumPy, Scikit-learn, lag features, rolling windows</li>
              <li><strong>Evaluation:</strong> Chronological split, leakage prevention, weighted regression, checkpointing</li>
              <li><strong>Inference:</strong> Joblib, versioned model and scaler artifacts, reproducible prediction tables</li>
              <li><strong>Product:</strong> HTML, CSS, JavaScript, Chart.js</li>
              <li><strong>Delivery:</strong> GitHub Pages, Docker, Nginx</li>
            </ul>

            <h2 id="key-features" className="reveal">
              <a href="#key-features" className={styles.headingAnchor}>link</a>Key Features
            </h2>
            <ul className="reveal">
              <li><strong>Leakage-aware preprocessing:</strong> Input and target scalers are fitted only on the first 70% training period, then held fixed for validation.</li>
              <li><strong>Basin-specific calibration:</strong> The model is trained on Long Dai&apos;s discharge scale rather than a mixed national distribution.</li>
              <li><strong>Hydrological memory without current-target leakage:</strong> Rainfall accumulations over 3–60 days and streamflow lags over 1–14 days provide context without exposing current-day flow.</li>
              <li><strong>Peak-aware training:</strong> Magnitude-based sample weights increase the contribution of high-flow training examples while retaining normal-flow days.</li>
              <li><strong>Inspectable deployment:</strong> The dashboard makes predictions, errors, rainfall context, and scenario changes visible instead of reducing performance to one score.</li>
            </ul>

            <h2 id="evaluation--limitations" className="reveal">
              <a href="#evaluation--limitations" className={styles.headingAnchor}>link</a>Evaluation &amp; Limitations
            </h2>
            <p className="reveal">
              Evaluation uses a 107-row chronological holdout covering the final 30% of the series. Because this period also informed early stopping and checkpoint selection, I report it as validation performance rather than an independent test benchmark.
            </p>
            <p className="reveal">
              The model slightly trailed a persistence baseline on MAE (130.8 vs. 128.1 m³/s), while improving RMSE (148.1 vs. 314.3 m³/s) and NSE (0.726 vs. −0.223). On the holdout peak, it estimated 2,800.68 m³/s for an observed 2,576.39 m³/s, an 8.7% magnitude error with zero-day timing error.
            </p>
            <p className="reveal">
              Across the full hindcast, including the training period, the model reproduced 7,175.8 m³/s of the recorded 7,990.3 m³/s peak. This is an in-sample fit diagnostic showing representational capacity, not evidence of performance on an unseen extreme.
            </p>
            <p className="reveal">
              DeepFlood remains a same-day estimation prototype, not an operational warning system. The current evaluation does not demonstrate multi-day lead time, an independent test set, or field impact.
            </p>
          </article>
        </div>

        {/* Sticky Table of Contents Sidebar */}
        <aside className={styles.sidebar} aria-label="Table of contents">
          <div className={styles.tocHeader}>
            On This Page
          </div>
          <LineSidebar
            items={[
              'Overview',
              'The Problem',
              'What I Built',
              'My Contribution',
              'Tech Stack',
              'Key Features',
              'Evaluation & Limitations'
            ]}
            accentColor="var(--ink)"
            textColor="var(--muted)"
            markerColor="var(--line)"
            showIndex={false}
            itemGap={12}
            fontSize={0.85}
            onItemClick={(index) => {
              const ids = [
                'overview',
                'the-problem',
                'what-i-built',
                'my-contribution',
                'tech-stack',
                'key-features',
                'evaluation--limitations'
              ];
              const el = document.getElementById(ids[index]);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </aside>

      </div>
    </main>
  );
}
