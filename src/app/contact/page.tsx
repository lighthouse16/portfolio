"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const channels = [
  {
    id: "email",
    label: "Email",
    value: "haidangtrih@gmail.com",
    href: "#",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/lighthouse16",
    href: "https://www.linkedin.com/in/lighthouse16/",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/lighthouse16",
    href: "https://github.com/lighthouse16",
  },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("haidangtrih@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <h1 className={`${styles.title} reveal`}>Let&apos;s discuss the problem.</h1>
        </header>

        <div className={styles.channels} aria-label="Contact channels">
          {channels.map((channel) => (
            <a
              key={channel.id}
              className={`${styles.channel} reveal`}
              href={channel.href}
              onClick={(e) => {
                if (channel.id === "email") {
                  handleCopy(e);
                }
              }}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className={styles.channelLabel}>{channel.label}</span>
              <span className={styles.channelValue}>
                {channel.id === "email" && copied ? "Copied to clipboard!" : channel.value}
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
