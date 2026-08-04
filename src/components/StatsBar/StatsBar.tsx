"use client";

import React from "react";
import styles from "./StatsBar.module.scss";

interface Stat {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const STATS: Stat[] = [
  {
    number: "2,048+",
    label: "Dictionary words available for stateless payload translation.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <circle
          cx="17"
          cy="6"
          r="1.5"
          fill="var(--accent)"
          stroke="var(--accent)"
          strokeWidth="0"
        />
        <circle
          cx="6"
          cy="16"
          r="1"
          fill="var(--accent)"
          stroke="var(--accent)"
          strokeWidth="0"
        />
      </svg>
    ),
  },
  {
    number: "Exactly 0",
    label: "Databases or lookup tables maintained by our engineers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
        <line
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
  {
    number: "∞%",
    label: "More characters generated than strictly necessary.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path
          d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          stroke="var(--accent)"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    number: "0.00%",
    label: "Link compression payload ratio achieved.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="var(--accent)" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.header}>
        <span className={styles.preHeading}>Longly by the numbers</span>
        <h2 className={styles.heading}>
          Loved by zero databases for over a week
        </h2>
      </div>

      <div className={styles.grid}>
        {STATS.map((stat, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.iconWrapper}>{stat.icon}</div>
            <div className={styles.cardBottom}>
              <span className={styles.number}>
                {stat.number === "∞%" ? (
                  <span className={styles.infinityContainer}>
                    <span className={styles.infinity}>∞</span>
                    <span className={styles.percent}>%</span>
                  </span>
                ) : (
                  stat.number
                )}
              </span>
              <p className={styles.label}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
