import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

export const Footer = () => (
  <footer id="contact" className={styles.footer}>
    <div className="container">
      <p className="eyebrow">06 / Contact</p>
      <a className={styles.cta} href="mailto:haidang.trih@gmail.com">
        <span>Have a good problem?</span>
        <strong>Let&apos;s make something matter.</strong>
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
