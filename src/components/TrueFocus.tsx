"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./TrueFocus.module.css";

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  colors?: string[];
  glowColors?: string[];
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus = ({
  sentence = "True Focus",
  separator = " ",
  manualMode = false,
  blurAmount = 5,
  borderColor = "green",
  glowColor = "rgba(0, 255, 0, 0.6)",
  colors,
  glowColors,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}: TrueFocusProps) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return;
    const wordEl = wordRefs.current[currentIndex];
    if (!wordEl || !containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const activeRect = wordEl.getBoundingClientRect();

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    });
  }, [currentIndex, words.length]);

  const handleMouseEnter = useCallback(
    (index: number) => {
      if (manualMode) {
        setLastActiveIndex(index);
        setCurrentIndex(index);
      }
    },
    [manualMode]
  );

  const handleMouseLeave = useCallback(() => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  }, [manualMode, lastActiveIndex]);

  return (
    <div className={styles.container} ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        const currentBorderColor = colors?.[index] || borderColor;
        const currentGlowColor = glowColors?.[index] || glowColor;
        
        return (
          <span
            key={index}
            ref={(el) => { wordRefs.current[index] = el; }}
            className={`${styles.word} ${manualMode ? styles.manual : ""} ${isActive && !manualMode ? styles.active : ""}`}
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              color: isActive ? currentBorderColor : "inherit",
              "--border-color": currentBorderColor,
              "--glow-color": currentGlowColor,
              transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className={styles.frame}
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration }}
        style={{
          "--border-color": colors?.[currentIndex] || borderColor,
          "--glow-color": glowColors?.[currentIndex] || glowColor,
        } as React.CSSProperties}
      >
        <span className={`${styles.corner} ${styles.topLeft}`} />
        <span className={`${styles.corner} ${styles.topRight}`} />
        <span className={`${styles.corner} ${styles.bottomLeft}`} />
        <span className={`${styles.corner} ${styles.bottomRight}`} />
      </motion.div>
    </div>
  );
};

export default TrueFocus;
