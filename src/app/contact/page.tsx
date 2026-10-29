"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import styles from "./contact.module.css";

gsap.registerPlugin(useGSAP);

const channels = [
  {
    id: "email",
    label: "Email",
    value: "haidangtrih@gmail.com",
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
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    let success = false;
    if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText("haidangtrih@gmail.com");
        success = true;
      } catch {
        success = false;
      }
    }
    if (!success && typeof document !== "undefined") {
      let textarea: HTMLTextAreaElement | null = null;
      try {
        textarea = document.createElement("textarea");
        textarea.value = "haidangtrih@gmail.com";
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        success = Boolean(document.execCommand("copy"));
      } catch {
        success = false;
      } finally {
        if (textarea && textarea.parentNode) {
          textarea.parentNode.removeChild(textarea);
        }
      }
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (success) {
      setCopyState("success");
      timeoutRef.current = setTimeout(() => setCopyState("idle"), 2500);
    } else {
      setCopyState("error");
      timeoutRef.current = setTimeout(() => setCopyState("idle"), 3500);
    }
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
          {channels.map((channel) =>
            channel.id === "email" ? (
              <button
                key={channel.id}
                type="button"
                className={`${styles.channel} ${styles.channelButton} reveal`}
                onClick={handleCopy}
                aria-label={
                  copyState === "success"
                    ? "Email copied to clipboard"
                    : copyState === "error"
                    ? "Failed to copy email to clipboard. Please copy manually: haidangtrih@gmail.com"
                    : "Copy email address to clipboard"
                }
              >
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>
                  {channel.value}
                  {copyState === "success" && (
                    <span className={styles.channelFeedbackText} role="status">
                      {" · "}Copied to clipboard!
                    </span>
                  )}
                  {copyState === "error" && (
                    <span className={styles.channelFeedbackErrorText} role="alert">
                      {" · "}Copy failed. Please copy manually.
                    </span>
                  )}
                </span>
                {copyState === "success" ? (
                  <Check size={20} className={styles.channelFeedbackIcon} aria-hidden="true" />
                ) : copyState === "error" ? (
                  <Copy size={20} className={styles.channelFeedbackErrorIcon} aria-hidden="true" />
                ) : (
                  <Copy size={20} aria-hidden="true" />
                )}
              </button>
            ) : (
              <a
                key={channel.id}
                className={`${styles.channel} reveal`}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${channel.label}`}
              >
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>{channel.value}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            )
          )}
        </div>
      </div>
    </main>
  );
}
