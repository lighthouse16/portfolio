"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

export const Footer = () => {
  const pathname = usePathname();

  // Hide footer on case study pages
  if (pathname && pathname.startsWith("/projects/")) {
    return null;
  }

  return (
    <footer id="contact" className={styles.footer}>
      <div className="container">
        <p className="eyebrow">06 / Contact</p>
        <a className={styles.cta} href="mailto:haidang.trih@gmail.com">
          <span>Interested in models, data, or hard software problems?</span>
          <strong>Let&apos;s connect and build well.</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className={styles.bottom}>
          <p>Hai Dang Trinh · Kowloon, Hong Kong</p>
          <nav aria-label="Social links">
            <a href="https://github.com/lighthouse16" rel="noreferrer" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/lighthouse16/" rel="noreferrer" target="_blank">LinkedIn</a>
            <a href="#top">Back to top ↑</a>
          </nav>
          <p>© {new Date().getFullYear()} Hai Dang Trinh</p>
        </div>
      </div>
    </footer>
  );
};
