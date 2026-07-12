"use client";

import React from "react";
import styles from "./StatsBar.module.scss";

interface Stat {
  number: string;
  label: string;
}

const STATS: Stat[] = [
  {
    number: "2,048+",
    label: "Dictionary Words Available",
  },
  {
    number: "Exactly 0",
    label: "Databases Maintained",
  },
  {
    number: "∞%",
    label: "More Characters Than Needed",
  },
];

export default function StatsBar() {
  return (
    <section className={styles.statsBar}>
      <div className={styles.container}>
        {STATS.map((stat, index) => (
          <div key={index} className={styles.statItem}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
