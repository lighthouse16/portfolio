"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft } from "lucide-react";
import LineSidebar from "@/components/LineSidebar";
import { Math } from "@/components/Math";
import styles from "./DeepFlood.module.css";

gsap.registerPlugin(useGSAP);

const sections = [
  { label: "Origin", id: "origin" },
  { label: "Problem", id: "problem" },
  { label: "Data & Method", id: "data-method" },
  { label: "Re-engineering", id: "re-engineering" },
  { label: "Validation", id: "validation" },
  { label: "Results", id: "results" },
  { label: "Interpretation", id: "interpretation" },
  { label: "Limitations", id: "limitations" },
  { label: "Artifact", id: "artifact" },
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
      <div className={styles.dotGrid} aria-hidden="true" />
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
              <a href="https://deepflood.haidangtrih.me/" target="_blank" rel="noreferrer" className={styles.metaLink}>
                ↗ live dashboard
              </a>
            </div>
            <div className={styles.metaRow} style={{ marginTop: "10px" }}>
              <code>Python · TensorFlow/Keras · Pandas · Scikit-learn</code>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="origin" className="reveal">
              <a href="#origin" className={styles.headingAnchor}>link</a>Origin
            </h2>
            <p className="reveal">
              DeepFlood started during the Summer in Engineering and Applied Sciences (SEAS) 2025 program as a team exploration of flood modeling. After the program, the system was independently rebuilt around a more rigorous research question:
            </p>
            <blockquote className={`${styles.pullQuote} reveal`}>
              <p>
                Can a basin-specific time-series model preserve rare local streamflow extremes without leaking future information into validation?
              </p>
            </blockquote>
            <p className="reveal">
              The result is a same-day streamflow nowcasting prototype specific to the Long Đại basin, Quảng Bình, Vietnam. The SEAS team produced an initial model; the current system — including architecture, feature engineering, leakage controls, and evaluation dashboard — was independently re-engineered after the program.
            </p>

            <h2 id="problem" className="reveal">
              <a href="#problem" className={styles.headingAnchor}>link</a>Problem
            </h2>
            <p className="reveal">
              Extreme hydrological events create an imbalanced regression problem. Most observations represent normal flow conditions, while the most important events are rare peaks.
            </p>
            <p className="reveal">
              Time-series experiments also require careful validation design because random splits and preprocessing that uses full-dataset statistics can introduce future information into historical evaluation — inflating apparent performance without reflecting real predictive skill.
            </p>

            <h2 id="data-method" className="reveal">
              <a href="#data-method" className={styles.headingAnchor}>link</a>Data &amp; Method
            </h2>
            <p className="reveal">
              Each prediction uses a seven-day input window of hydrometeorological observations. The features derive from three stages of processing:
            </p>

            <div className={`${styles.architectureStack} reveal`}>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Raw observations</div>
                <div className={styles.layerItems}>Precipitation · Temperature · Solar radiation · Vapor pressure · Historical streamflow</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Engineered signals</div>
                <div className={styles.layerItems}>Rolling rainfall windows · Seasonality indicators · Lagged streamflow · Temporal statistics</div>
              </div>
              <div className={styles.layerArrow}>↓</div>
              <div className={styles.architectureLayer}>
                <div className={styles.layerHeader}>Model input</div>
                <div className={styles.layerItems}>39 features × 7-day window — all target-derived streamflow features use strictly lagged observations</div>
              </div>
            </div>

            <div className={`${styles.formulaBlock} reveal`}>
              <Math math="X_t \in \mathbb{R}^{7 \times 39}" block />
              <div className={styles.formulaSubtext}>
                where 7 = temporal sequence length (days) and 39 = engineered hydrometeorological features
              </div>
            </div>

            <p className="reveal">
              The sequence is processed through a sequential architecture:
            </p>
            <div className={`${styles.formulaBlock} reveal`}>
              <Math math="X_t \rightarrow \mathrm{Conv1D}_{64} \rightarrow \mathrm{BiLSTM}_{128} \rightarrow \mathrm{BiLSTM}_{64} \rightarrow \mathrm{Temporal\ Attention} \rightarrow \hat{Q}_t" block />
            </div>

            <blockquote className={`${styles.pullQuote} reveal`}>
              <p>
                The bidirectional layers operate only within the observed input window. They do not access observations after prediction time <Math math="t" />, and target-derived streamflow features use historical lags only.
              </p>
            </blockquote>

            <h2 id="re-engineering" className="reveal">
              <a href="#re-engineering" className={styles.headingAnchor}>link</a>Re-engineering
            </h2>
            <p className="reveal">
              The independent work focused on removing future-data leakage, rebuilding feature generation, enforcing chronological validation, adding peak-sensitive weighting, and creating reproducible evaluation artifacts.
            </p>
            <p className="reveal">
              To penalize large flow errors during training, samples are weighted by flow magnitude:
            </p>
            <div className={`${styles.formulaBlock} reveal`}>
              <Math math="w_i = 1 + 30\left(\frac{y_i}{y_{\max,\mathrm{train}}}\right)" block />
              <div className={styles.formulaSubtext} style={{ marginTop: "12px" }}>
                <Math math="1 \le w_i \le 31" /> &nbsp;within the training target range
              </div>
            </div>
            <p className="reveal">
              Here <Math math="y_i" /> is the training target for sample <Math math="i" /> and <Math math="y_{\max,\mathrm{train}}" /> is the maximum streamflow in the training period. High-flow observations become progressively more influential during optimization — improving sensitivity to large flow changes but potentially increasing average absolute error on ordinary observations.
            </p>

            <h2 id="validation" className="reveal">
              <a href="#validation" className={styles.headingAnchor}>link</a>Validation
            </h2>
            <p className="reveal">
              To prevent temporal leakage, evaluation enforces a strict chronological split:
            </p>

            <div className={`${styles.chronoSplit} reveal`}>
              <div className={styles.chronoHeader}>
                <span>EARLIER</span>
                <span>LATER</span>
              </div>
              <div className={styles.chronoBar}>
                <div className={styles.chronoTrain}>Training period — 70%</div>
                <div className={styles.chronoVal}>Validation period — 30%</div>
              </div>
              <div className={styles.chronoCaption}>
                Validation period contains 107 chronological observations. The same period was used for checkpoint selection.
              </div>
            </div>

            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Safeguard</th>
                    <th>What it prevents</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Chronological split</strong></td>
                    <td>Future observations being randomly mixed into the training set</td>
                  </tr>
                  <tr>
                    <td><strong>Train-only scaling</strong></td>
                    <td>Future distribution information entering preprocessing scalers</td>
                  </tr>
                  <tr>
                    <td><strong>Strictly lagged streamflow</strong></td>
                    <td>Day-T target information leaking into day-T model input features</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="results" className="reveal">
              <a href="#results" className={styles.headingAnchor}>link</a>Results
            </h2>
            <p className="reveal">
              Performance comparison across the 107-observation validation period:
            </p>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th className={styles.numCol}>DeepFlood</th>
                    <th className={styles.numCol}>Persistence baseline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>MAE</strong></td>
                    <td className={styles.numCol}>130.8 m³/s</td>
                    <td className={styles.numCol}>128.1 m³/s</td>
                  </tr>
                  <tr>
                    <td><strong>RMSE</strong></td>
                    <td className={styles.numCol}>148.1 m³/s</td>
                    <td className={styles.numCol}>314.3 m³/s</td>
                  </tr>
                  <tr>
                    <td><strong>NSE</strong></td>
                    <td className={styles.numCol}>0.726</td>
                    <td className={styles.numCol}>−0.223</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="reveal">
              DeepFlood reduces RMSE by approximately 52.9% relative to persistence. DeepFlood MAE is approximately 2.1% higher than persistence.
            </p>

            <p className="reveal">
              Diagnostic on the largest event in the validation period:
            </p>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Validation peak diagnostic</th>
                    <th className={styles.numCol}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Observed peak</strong></td>
                    <td className={styles.numCol}>2,576.39 m³/s</td>
                  </tr>
                  <tr>
                    <td><strong>Predicted peak</strong></td>
                    <td className={styles.numCol}>2,800.68 m³/s</td>
                  </tr>
                  <tr>
                    <td><strong>Magnitude error</strong></td>
                    <td className={styles.numCol}>+8.7%</td>
                  </tr>
                  <tr>
                    <td><strong>Timing lag</strong></td>
                    <td className={styles.numCol}>0 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="reveal" style={{ fontSize: "0.88rem" }}>
              This diagnostic covers a single event and is not evidence of general peak forecasting reliability.
            </p>

            <h2 id="interpretation" className="reveal">
              <a href="#interpretation" className={styles.headingAnchor}>link</a>Interpretation
            </h2>
            <p className="reveal">
              DeepFlood does not outperform persistence on every metric. Persistence achieves slightly lower MAE because streamflow often changes gradually between consecutive days — the persistence assumption is competitive under normal conditions.
            </p>
            <p className="reveal">
              DeepFlood substantially improves RMSE and NSE. This reflects the intended trade-off: peak-sensitive training places more weight on large flow errors during optimization, which improves sensitivity to large flow changes at the cost of a small increase in average absolute error on ordinary observations. The metrics disagree because they measure different things — MAE treats all errors equally, while RMSE penalizes large deviations more heavily.
            </p>

            <h2 id="limitations" className="reveal">
              <a href="#limitations" className={styles.headingAnchor}>link</a>Limitations
            </h2>
            <div className={`${styles.editorialTableWrapper} reveal`}>
              <table className={styles.editorialTable}>
                <thead>
                  <tr>
                    <th>Evidence supports</th>
                    <th>Evidence does NOT establish</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Same-day streamflow nowcasting for Long Đại</td>
                    <td>Multi-day forecasting skill</td>
                  </tr>
                  <tr>
                    <td>Chronological validation period performance</td>
                    <td>Untouched independent test performance</td>
                  </tr>
                  <tr>
                    <td>Basin-specific results</td>
                    <td>Cross-basin generalization</td>
                  </tr>
                  <tr>
                    <td>Precomputed evaluation dashboard</td>
                    <td>Operational warning deployment</td>
                  </tr>
                  <tr>
                    <td>Peak-sensitive behavior during validation period</td>
                    <td>Reliability across all extreme events</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="artifact" className="reveal">
              <a href="#artifact" className={styles.headingAnchor}>link</a>Artifact
            </h2>
            <p className="reveal">
              Evaluation dashboard: <a href="https://deepflood.haidangtrih.me/" target="_blank" rel="noreferrer" className={styles.metaLink}><code>https://deepflood.haidangtrih.me/</code></a>
            </p>
            <p className="reveal">
              Predictions shown are precomputed evaluation outputs. The dashboard visualizes hindcast results and is not an operational inference service.
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
