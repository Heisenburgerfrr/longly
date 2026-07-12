"use client";

import React from "react";
import styles from "./ThemeSwitcher.module.scss";

export type Verbosity = "small" | "medium" | "large";

interface ThemeSwitcherProps {
  selected: Verbosity;
  onChange: (value: Verbosity) => void;
}

const THEMES: { id: Verbosity; label: string; desc: string }[] = [
  { id: "small", label: "Absurdly Verbose", desc: "4-bit (Maximum length)" },
  { id: "medium", label: "Balanced Prose", desc: "8-bit (Standard length)" },
  { id: "large", label: "Semi-Efficient", desc: "11-bit (Shortest output)" },
];

export default function ThemeSwitcher({
  selected,
  onChange,
}: ThemeSwitcherProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>ELONGATION VERBOSITY</span>
      <div className={styles.segmentedControl}>
        {THEMES.map((theme) => {
          const isActive = selected === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              className={`${styles.segment} ${isActive ? styles.active : ""}`}
              onClick={() => onChange(theme.id)}
              aria-pressed={isActive}
            >
              <span className={styles.label}>{theme.label}</span>
              <span className={styles.desc}>{theme.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
