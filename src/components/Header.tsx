"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Honors", "#honors"],
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      // Clear hash cleanly in URL without reloading
      window.history.replaceState(null, "", "/");
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.nav}`}>
        <Link 
          href={pathname === "/" ? "#top" : "/#top"} 
          className={styles.logo} 
          aria-label="Home"
          onClick={(e) => handleNav(e, "#top")}
        >
          <span className={styles.mark} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Hai Dang</span>
        </Link>

        <nav id="primary-navigation" className={`${styles.links} ${open ? styles.open : ""}`} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link 
              key={href} 
              href={pathname === "/" ? href : `/${href}`} 
              onClick={(e) => handleNav(e, href)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className={styles.contact}>
          Let&apos;s work together <span aria-hidden="true">↗</span>
        </Link>

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
