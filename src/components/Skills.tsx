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
      { name: "Python", note: "ML & backend", devicon: "python" },
      { name: "TypeScript", note: "Web & application dev", devicon: "typescript" },
      { name: "SQL", note: "Queries & schema design", Lucide: Database },
      { name: "C++", note: "Algorithms & structures", devicon: "cplusplus" },
      { name: "Java", note: "OOP & coursework", devicon: "java" },
      { name: "C", note: "Foundations & coursework", src: "/c-logo.svg" },
    ],
  },
  {
    id: "ml-data",
    label: "ML & Data",
    accent: "var(--red)",
    icon: BrainCircuit,
    items: [
      { name: "TensorFlow / Keras", note: "Neural networks", devicon: "tensorflow" },
      { name: "Scikit-learn", note: "Classical ML & evaluation", devicon: "scikitlearn" },
      { name: "Pandas", note: "Tabular data processing", devicon: "pandas" },
      { name: "NumPy", note: "Numerical computing", devicon: "numpy" },
      { name: "Time-Series Modeling", note: "Sequential data", Lucide: Activity },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    accent: "var(--green)",
    icon: Database,
    items: [
      { name: "PostgreSQL", note: "Relational database", devicon: "postgresql" },
      { name: "pgvector", note: "Vector retrieval", Lucide: Search },
      { name: "FastAPI", note: "Python backend services", devicon: "fastapi" },
      { name: "Next.js", note: "Web application framework", devicon: "nextjs/nextjs-plain" },
      { name: "Git", note: "Version control & workflows", devicon: "git" },
      { name: "Docker", note: "Containerization", devicon: "docker" },
      { name: "Linux", note: "Development & deployment", devicon: "linux" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
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
        gsap.set(panels, { autoAlpha: 0, y: 24, pointerEvents: "none" });
        gsap.set(panels[0], { autoAlpha: 1, y: 0, pointerEvents: "auto" });

        // Position indicator under active tab initially
        const firstTab = tabRefs.current[0];
        if (firstTab && indicatorRef.current) {
          gsap.set(indicatorRef.current, {
            x: firstTab.offsetLeft,
            y: firstTab.offsetTop,
            width: firstTab.offsetWidth,
            height: firstTab.offsetHeight,
          });
        }

        const N = groups.length - 1;
        const timeline = gsap.timeline({ paused: true });
        for (let i = 0; i < N; i++) {
          const switchTime = i + 1;
          timeline
            .to(panels[i], { autoAlpha: 0, y: -20, pointerEvents: "none", duration: 0.2 }, switchTime - 0.2)
            .to(panels[i + 1], { autoAlpha: 1, y: 0, pointerEvents: "auto", duration: 0.2 }, switchTime);
        }

        triggerRef.current = ScrollTrigger.create({
          id: "skills-tabs",
          trigger: sectionRef.current,
          start: () => {
            const sm = parseFloat(window.getComputedStyle(sectionRef.current!).scrollMarginTop) || 0;
            return `top ${sm + 92}px`;
          },
          end: () => `+=${window.innerHeight * 1.2}`,
          pin: true,
          scrub: 0.5,
          animation: timeline,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * (groups.length - 1);
            let next = 0;
            if (t >= 2.9) next = 3;
            else if (t >= 1.9) next = 2;
            else if (t >= 0.9) next = 1;

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
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: "auto",
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
          How I <span>build.</span>
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
