"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const links = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.nav}`}>
        <a href="#top" className={styles.logo} aria-label="Home">
          <span className={styles.mark} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Hai Dang</span>
        </a>

        <nav id="primary-navigation" className={`${styles.links} ${open ? styles.open : ""}`} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a href="mailto:haidang.trih@gmail.com" className={styles.contact}>
          Let&apos;s work together <span aria-hidden="true">↗</span>
        </a>

        <button
          className={styles.menu}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};
