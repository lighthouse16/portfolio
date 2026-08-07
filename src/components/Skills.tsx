"use client";

import { KeyboardEvent, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Braces,
  BrainCircuit,
  ChartNoAxesCombined,
  Database,
  Languages,
  Activity,
  Wrench,
  ShieldCheck,
  Search,
  FileJson,
  ListOrdered,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import styles from "./Skills.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SkillGroup = {
  id: string;
  label: string;
  accent: string;
  icon: LucideIcon;
  items: { name: string; note: string; devicon?: string; simpleicon?: string; src?: string; Lucide?: LucideIcon }[];
};

const groups: SkillGroup[] = [
  {
    id: "programming",
    label: "Programming",
    accent: "var(--blue)",
    icon: Braces,
    items: [
      { name: "Python", note: "ML, data, backend & automation", devicon: "python" },
      { name: "TypeScript", note: "Full-stack & typed dev", devicon: "typescript" },
      { name: "SQL", note: "Queries & schema design", Lucide: Database },
      { name: "C++", note: "Algorithms & data structures", devicon: "cplusplus" },
      { name: "Java", note: "OOP & coursework", devicon: "java" },
      { name: "C", note: "Foundations & coursework", src: "/c-logo.svg" },
    ],
  },
  {
    id: "ml-quant",
    label: "ML & Quantitative",
    accent: "var(--red)",
    icon: BrainCircuit,
    items: [
      { name: "Time-Series Modeling", note: "Sequential data & validation", Lucide: Activity },
      { name: "Feature Engineering", note: "Domain & leakage-aware signals", Lucide: Wrench },
      { name: "Model Evaluation", note: "Holdouts, baselines & metrics", Lucide: ShieldCheck },
      { name: "TensorFlow / Keras", note: "Neural-network training", devicon: "tensorflow" },
      { name: "PyTorch", note: "ML experimentation", devicon: "pytorch" },
      { name: "Scikit-learn", note: "Preprocessing & metrics", devicon: "scikitlearn" },
      { name: "Pandas / NumPy", note: "Numerical & tabular data", Lucide: ChartNoAxesCombined },
    ],
  },
  {
    id: "data-ai",
    label: "Data & AI Systems",
    accent: "var(--green)",
    icon: Database,
    items: [
      { name: "PostgreSQL", note: "Relational data & transactions", devicon: "postgresql" },
      { name: "pgvector", note: "Embedding storage & retrieval", Lucide: Search },
      { name: "LLM Integration", note: "Structured extraction & outputs", Lucide: FileJson },
      { name: "Information Retrieval", note: "Semantic search & filters", Lucide: Search },
      { name: "Data Quality", note: "Deduplication & normalization", Lucide: ListOrdered },
      { name: "FastAPI", note: "Python APIs & processing", devicon: "fastapi" },
      { name: "Asynchronous Processing", note: "Worker pipelines & recovery", Lucide: Activity },
    ],
  },
  {
    id: "software-eng",
    label: "Software Engineering",
    accent: "var(--blue)",
    icon: Wrench,
    items: [
      { name: "Next.js / React", note: "Web apps & workflows", devicon: "nextjs/nextjs-plain" },
      { name: "Git / GitHub Actions", note: "VCS, CI/CD & automation", devicon: "github" },
      { name: "Docker", note: "Containerized environments", devicon: "docker" },
      { name: "Linux / Unix", note: "Dev & deployment workflows", devicon: "linux" },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    accent: "var(--yellow)",
    icon: Languages,
    items: [
      { name: "English", note: "IELTS 7.5", Lucide: MessageCircle },
      { name: "Vietnamese", note: "Native", Lucide: MessageCircle },
      { name: "Chinese", note: "A1", Lucide: MessageCircle },
    ],
  },
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const panels = gsap.utils.toArray<HTMLElement>("[data-skill-panel]", stage);
      const progress = stage.querySelector<HTMLElement>("[data-skill-progress]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(panels, { autoAlpha: 0, y: 28, pointerEvents: "none" });
        gsap.set(panels[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });

        const timeline = gsap.timeline({ paused: true });
        groups.slice(1).forEach((_, index) => {
          const position = index + 1;
          timeline
            .to(panels[index], { autoAlpha: 0, y: -24, pointerEvents: "none", duration: 0.28 }, position - 0.28)
            .to(panels[position], { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.38 }, position - 0.02);
        });

        triggerRef.current = ScrollTrigger.create({
          id: "skills-tabs",
          trigger: sectionRef.current,
          start: () => {
            const sm = parseFloat(window.getComputedStyle(sectionRef.current!).scrollMarginTop) || 0;
            return `top ${sm + 92}px`;
          },
          end: () => `+=${window.innerHeight * (groups.length - 1)}`,
          pin: true,
          scrub: 0.6,
          animation: timeline,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const next = Math.min(groups.length - 1, Math.round(self.progress * (groups.length - 1)));
            
            // Native DOM manipulation to avoid React re-render jank
            tabRefs.current.forEach((tab, idx) => {
              if (!tab) return;
              if (idx === next) {
                tab.classList.add(styles.tabActive);
                tab.setAttribute("aria-selected", "true");
                
                if (indicatorRef.current) {
                  gsap.to(indicatorRef.current, {
                    x: tab.offsetLeft,
                    y: tab.offsetTop,
                    width: tab.offsetWidth,
                    height: tab.offsetHeight,
                    duration: 0.35,
                    ease: "power3.out",
                    overwrite: "auto"
                  });
                }
              } else {
                tab.classList.remove(styles.tabActive);
                tab.setAttribute("aria-selected", "false");
              }
            });

            if (progress) gsap.set(progress, { scaleX: self.progress });
          },
        });

        return () => {
          triggerRef.current = null;
        };
      });

      mm.add("(max-width: 860px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(panels, { clearProps: "all" });
        if (progress) gsap.set(progress, { clearProps: "all" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const selectTab = (index: number) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const target = trigger.start + (trigger.end - trigger.start) * (index / (groups.length - 1));
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }

    setActiveIndex(index);
    setTimeout(() => {
      document.getElementById(`skills-panel-${groups[index].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 10);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % groups.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + groups.length) % groups.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;

    event.preventDefault();
    tabRefs.current[next]?.focus();
    selectTab(next);
  };

  return (
    <section id="skills" ref={sectionRef} className={styles.section} aria-labelledby="skills-title">
      <div className={`container ${styles.header}`}>
        <p className="eyebrow">02 / Skills</p>
        <h2 id="skills-title" className={styles.title}>
          Built for models. <span>Grounded in systems.</span>
        </h2>
      </div>

      <div ref={stageRef} className={`container ${styles.stage}`}>
        <div className={styles.tabRail}>
          <div className={styles.tabs} role="tablist" aria-label="Skill groups">
            <div className={styles.tabIndicator} ref={indicatorRef} />
            {groups.map((group, index) => {
              const Icon = group.icon;
              const active = index === activeIndex;
              return (
                <button
                  key={group.id}
                  ref={(node) => { tabRefs.current[index] = node; }}
                  id={`skills-tab-${group.id}`}
                  className={`${styles.tab} ${active ? styles.tabActive : ""}`}
                  style={{ "--accent": group.accent } as React.CSSProperties}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`skills-panel-${group.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className={styles.tabNumber}>0{index + 1}</span>
                  <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  <span>{group.label}</span>
                </button>
              );
            })}
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span data-skill-progress className={styles.progressFill} />
          </div>
        </div>

        <div className={styles.panelStack}>
          {groups.map((group, groupIndex) => {
            const Icon = group.icon;
            return (
              <article
                key={group.id}
                id={`skills-panel-${group.id}`}
                className={styles.panel}
                style={{ "--accent": group.accent } as React.CSSProperties}
                role="tabpanel"
                aria-labelledby={`skills-tab-${group.id}`}
                aria-hidden={groupIndex !== activeIndex}
                data-skill-panel
              >
                <div className={styles.skillGrid}>
                  {group.items.map((item) => (
                    <div key={item.name} className={styles.skillItem}>
                      <div className={styles.itemLogo} aria-hidden="true">
                        {item.src ? (
                          <img src={item.src} alt="" loading="lazy" />
                        ) : item.devicon ? (
                          <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.devicon.includes('/') ? item.devicon : `${item.devicon}/${item.devicon}-original`}.svg`} alt="" loading="lazy" />
                        ) : item.simpleicon ? (
                          <img src={`https://cdn.simpleicons.org/${item.simpleicon}`} alt="" loading="lazy" />
                        ) : item.Lucide ? (
                          <item.Lucide strokeWidth={1.75} />
                        ) : null}
                      </div>
                      <strong>{item.name}</strong>
                      <span>{item.note}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
