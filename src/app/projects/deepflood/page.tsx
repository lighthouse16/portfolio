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
  { label: "Project Origin & Scope", id: "project-origin-scope" },
  { label: "Modeling Problem", id: "modeling-problem" },
  { label: "Modeling Approach", id: "modeling-approach" },
  { label: "Independent Re-engineering", id: "independent-re-engineering" },
  { label: "Methods & Tools", id: "methods-tools" },
  { label: "Methodological Safeguards", id: "methodological-safeguards" },
  { label: "Results & Limitations", id: "results-limitations" },
  { label: "Evaluation Artifact", id: "evaluation-artifact" },
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
              A leakage-aware time-series ML system for same-day streamflow nowcasting in Vietnam&apos;s Long Đại basin, designed to preserve local extremes that broader models can smooth over.
            </p>
            <div className={styles.metaRow}>
              <span>Time-Series ML · Hydrological Nowcasting · ML Engineering</span>
              <span className={styles.metaDot}>·</span>
              <span>SEAS 2025 team origin · Independently re-engineered after program</span>
              <span className={styles.metaDot}>·</span>
              <span>Long Đại basin, Quảng Bình, Vietnam</span>
              <span className={styles.metaDot}>·</span>
              <a href="https://deepflood.haidangtrih.me/" target="_blank" rel="noreferrer" className={styles.metaLink}>
                ↗ live dashboard
              </a>
            </div>
          </header>

          <article className={styles.postProse}>
            <h2 id="project-origin-scope" className="reveal">
              <a href="#project-origin-scope" className={styles.headingAnchor}>link</a>Project Origin &amp; Scope
            </h2>
            <p className="reveal">
              DeepFlood began as a collaborative flood-modeling prototype during the <strong>Summer in Engineering and Applied Sciences (SEAS)</strong> in July–August 2025.
            </p>
            <p className="reveal">
              The summer-school project introduced the problem and produced an initial team prototype. After the program, I independently rebuilt the system around a narrower and more defensible question:
            </p>
            <blockquote className="reveal">
              Can a basin-specific time-series model preserve rare local streamflow extremes while avoiding the validation leakage that can make sequential models look better than they are?
            </blockquote>
            <p className="reveal">
              The current DeepFlood system is the result of that independent re-engineering. It is a <strong>same-day streamflow nowcasting prototype</strong> for the Long Đại basin. It uses meteorological observations for day T and river-flow information only through prior days. It is not a multi-day early-warning forecast. That distinction is central to how I evaluate and describe the project.
            </p>

            <h2 id="modeling-problem" className="reveal">
              <a href="#modeling-problem" className={styles.headingAnchor}>link</a>Modeling Problem
            </h2>
            <p className="reveal">
              Two properties of the data make the problem difficult.
            </p>
            <ul className="reveal">
              <li><strong>Local scale:</strong> Long Đại&apos;s recorded series contains an extreme peak of approximately 7,990.3 m³/s. When data from basins with very different discharge scales are mixed, local extremes can become small relative to the total range seen by a broader model. A model can therefore optimize average behavior while responding poorly to the event that matters most locally. I addressed this by calibrating the current system specifically to the Long Đại basin rather than treating local discharge as one small part of a national-scale target distribution.</li>
              <li><strong>Rare-event imbalance:</strong> Most observations are not extreme floods. A regression model trained uniformly across the full distribution can achieve acceptable average error while underweighting the relatively small number of very high-flow events. DeepFlood therefore uses magnitude-based sample weighting so that high-flow training examples contribute more strongly to the optimization objective without removing normal-flow observations.</li>
              <li><strong>Temporal leakage:</strong> Time-series evaluation creates another risk: preprocessing can accidentally use information from the future. Random splitting, fitting scalers on the full dataset, or allowing current-target information into rolling features can all inflate apparent performance. The current pipeline is designed around chronological separation and strictly lagged target-derived features.</li>
            </ul>

            <h2 id="modeling-approach" className="reveal">
              <a href="#modeling-approach" className={styles.headingAnchor}>link</a>Modeling Approach
            </h2>
            <p className="reveal">
              The model consumes <strong>seven-day sequences</strong> built from <strong>39 engineered hydrometeorological signals</strong>.
            </p>
            <p className="reveal">
              The feature set combines daily meteorological observations, precipitation accumulation windows spanning 3 to 60 days, rolling rainfall statistics, strictly lagged streamflow values spanning 1 to 14 days, past-flow rolling statistics, cyclical seasonal encodings, and change/interaction features. All target-derived features are constructed from information available before the current target value.
            </p>
            <h3 className="reveal">Neural architecture</h3>
            <p className="reveal">
              Each seven-day sequence is processed by a hybrid network:
            </p>
            <ol className="reveal">
              <li><strong>Conv1D:</strong> 64 filters; captures short local patterns and rate-of-change behavior across the temporal window.</li>
              <li><strong>Bidirectional LSTM:</strong> stacked recurrent layers with 128 and 64 units; models dependencies within the observed input sequence.</li>
              <li><strong>Temporal Attention:</strong> assigns learned importance across timesteps in the seven-day context; produces a weighted sequence representation before regression.</li>
              <li><strong>Dense regression head:</strong> maps the sequence representation to same-day streamflow.</li>
            </ol>
            <p className="reveal">
              The model is implemented in TensorFlow/Keras. The architecture is not presented as novel research. Its value in this project lies in how it is combined with basin-specific features, leakage-aware preprocessing, peak-sensitive training, and transparent evaluation.
            </p>

            <h2 id="independent-re-engineering" className="reveal">
              <a href="#independent-re-engineering" className={styles.headingAnchor}>link</a>Independent Re-engineering
            </h2>
            <p className="reveal">
              My post-SEAS work focused on turning the team prototype into a reproducible and auditable ML workflow.
            </p>
            <h3 className="reveal">Data and validation</h3>
            <ul className="reveal">
              <li>Rebuilt the feature pipeline around 39 signals.</li>
              <li>Enforced strictly past-lagged streamflow features.</li>
              <li>Removed look-ahead paths in target-derived features.</li>
              <li>Replaced random-style evaluation with chronological splitting.</li>
              <li>Fitted input and target scalers on the training period only.</li>
            </ul>
            <h3 className="reveal">Model and objective</h3>
            <ul className="reveal">
              <li>Rebuilt the sequence model as Conv1D + BiLSTM + Temporal Attention.</li>
              <li>Added magnitude-based sample weighting for rare high-flow events.</li>
              <li>Localized training and scaling to the Long Đại basin.</li>
            </ul>
            <h3 className="reveal">Reproducibility and inspection</h3>
            <ul className="reveal">
              <li>Preserved model and scaler artifacts for repeatable inference.</li>
              <li>Added pipeline sanity checks.</li>
              <li>Exported prediction tables for inspection.</li>
              <li>Built an evaluation dashboard showing predictions, rainfall context, residual behavior, and high-flow cases.</li>
              <li>Containerized the dashboard environment with Docker/Nginx while also publishing the static evaluation artifact.</li>
            </ul>
            <p className="reveal">
              The project is intentionally documented as an evolution from a team origin to individually owned post-program work.
            </p>

            <h2 id="methods-tools" className="reveal">
              <a href="#methods-tools" className={styles.headingAnchor}>link</a>Methods &amp; Tools
            </h2>
            <ul className="reveal">
              <li><strong>Modeling:</strong> Python, TensorFlow / Keras, Conv1D, Bidirectional LSTM, Temporal Attention</li>
              <li><strong>Data &amp; feature engineering:</strong> Pandas, NumPy, Scikit-learn, lagged streamflow variables, multi-scale precipitation windows, cyclical encodings, rolling statistics</li>
              <li><strong>Evaluation:</strong> Chronological train/validation split, train-only scaling, persistence baseline, MAE, RMSE, Nash–Sutcliffe Efficiency (NSE), peak magnitude error, peak timing error</li>
              <li><strong>Reproducibility:</strong> Versioned model artifacts, versioned scalers, pipeline tests / sanity checks, exported prediction tables</li>
              <li><strong>Evaluation interface:</strong> Chart.js, HTML / CSS / JavaScript</li>
              <li><strong>Delivery:</strong> Docker, Nginx, GitHub Pages, custom domain</li>
            </ul>

            <h2 id="methodological-safeguards" className="reveal">
              <a href="#methodological-safeguards" className={styles.headingAnchor}>link</a>Methodological Safeguards
            </h2>
            <ul className="reveal">
              <li><strong>Chronological validation:</strong> The dataset is split 70% / 30% in chronological order. The final 30% contains 107 observations and is treated as a validation period. Because that period also informed early stopping and checkpoint selection, I do not call it an independent test set.</li>
              <li><strong>Train-only scaling:</strong> Feature and target scalers are fitted only on the training period and then held fixed for validation. This prevents information about future validation ranges from influencing preprocessing.</li>
              <li><strong>Strictly lagged target-derived features:</strong> Current-day streamflow is never used as an input for its own prediction. Streamflow context uses prior observations, including lags from T−1 through T−14, while rainfall and other meteorological signals provide the current environmental context used for same-day nowcasting.</li>
              <li><strong>Peak-aware sample weighting:</strong> Training examples receive weights based on target magnitude: <code>weight = 1 + 30 × (y / training maximum)</code>. The largest training examples therefore receive weights of up to approximately 31× the base contribution. This changes the optimization trade-off: the model pays more attention to rare high-flow events, at the cost of slightly weaker average absolute error on ordinary observations.</li>
              <li><strong>Basin-specific calibration:</strong> The current system is calibrated to Long Đại&apos;s distribution. That improves local scale representation but limits direct transferability. A new basin would require re-calibration and retraining.</li>
            </ul>

            <h2 id="results-limitations" className="reveal">
              <a href="#results-limitations" className={styles.headingAnchor}>link</a>Results &amp; Limitations
            </h2>
            <p className="reveal">
              The validation period contains 107 observations from the final 30% of the chronological series.
            </p>
            <h3 className="reveal">Validation metrics</h3>
            <div className="reveal" style={{ overflowX: "auto", margin: "16px 0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--line)" }}>
                    <th style={{ padding: "8px 12px" }}>Metric</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>DeepFlood</th>
                    <th style={{ padding: "8px 12px", textAlign: "right" }}>Persistence baseline</th>
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
              <strong>Interpretation:</strong> DeepFlood does not outperform persistence on every metric. The persistence baseline is slightly better on MAE, which indicates that the peak-sensitive objective sacrifices some average absolute accuracy on more common observations. The model performs substantially better on RMSE and NSE, metrics that respond more strongly to large errors and overall fit across the hydrograph. This trade-off is consistent with the modeling objective: I deliberately gave rare high-flow examples more weight rather than optimizing only for average-day error.
            </p>
            <h3 className="reveal">Holdout peak</h3>
            <p className="reveal">
              Observed validation peak: <strong>2,576.39 m³/s</strong> · DeepFlood estimate: <strong>2,800.68 m³/s</strong> (Magnitude error: <strong>+8.7%</strong>, Peak timing error: <strong>0 days</strong>). The result shows that the model captured the largest event in the validation period on the correct day, while modestly overestimating its magnitude. It should not be generalized beyond the available validation period.
            </p>
            <h3 className="reveal">Full-hindcast diagnostic</h3>
            <p className="reveal">
              Across the complete series, including training data: recorded maximum <strong>7,990.3 m³/s</strong>, modeled value <strong>7,175.8 m³/s</strong>. This is an <strong>in-sample representational diagnostic</strong>, not evidence of unseen-event generalization. It is included only to show that the architecture can represent a peak at that scale after fitting.
            </p>

            <h2 id="evaluation-artifact" className="reveal">
              <a href="#evaluation-artifact" className={styles.headingAnchor}>link</a>Evaluation Artifact
            </h2>
            <p className="reveal">
              The public dashboard is designed to make model behavior inspectable rather than reduce the project to a single score. It includes streamflow prediction vs. observation, rainfall context, error inspection, high-flow cases, hydrograph views, and scenario/sensitivity controls.
            </p>
            <p className="reveal">
              The dashboard displays pre-computed model results and scenario analysis. It is <strong>not</strong> a live operational TensorFlow inference service and should not be described as one.
            </p>
            <h3 className="reveal">What DeepFlood does not demonstrate</h3>
            <p className="reveal">
              DeepFlood is a strong learning and evaluation project, but its boundaries should remain explicit. It does not currently demonstrate an independent untouched test set, multi-day forecast lead time, deployment in a real flood-warning workflow, live sensor ingestion, online model inference, automatic retraining, generalization to unseen river basins, or field impact or decision-making outcomes.
            </p>
            <p className="reveal">
              The project demonstrates something narrower and more defensible: <strong>a reproducible, basin-specific time-series ML workflow that treats leakage, rare events, baseline comparison, and evaluation limits as first-class engineering problems.</strong>
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
