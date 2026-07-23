"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const channels = [
  {
    label: "Email",
    value: "haidang.trih@gmail.com",
    href: "mailto:haidang.trih@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/lighthouse16",
    href: "https://www.linkedin.com/in/lighthouse16/",
  },
  {
    label: "GitHub",
    value: "github.com/lighthouse16",
    href: "https://github.com/lighthouse16",
  },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

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
      <div className={`container ${styles.gridContainer}`}>
        <header className={styles.header}>
          <p className="eyebrow reveal">Contact</p>
          <h1 className={`${styles.title} reveal`}>Let&apos;s discuss the problem first.</h1>
          <p className={`${styles.subtitle} reveal`}>
            For internships, research, or project conversations, email is the most direct way to reach me.
          </p>
          <a className={`${styles.primary} reveal`} href="mailto:haidang.trih@gmail.com">
            <Mail size={18} aria-hidden="true" />
            Email Hai Dang
          </a>
        </header>

        <div className={styles.channels} aria-label="Contact channels">
          {channels.map((channel) => (
            <a
              key={channel.label}
              className={`${styles.channel} reveal`}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className={styles.channelLabel}>{channel.label}</span>
              <span className={styles.channelValue}>{channel.value}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
