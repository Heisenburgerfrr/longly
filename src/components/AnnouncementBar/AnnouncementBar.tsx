"use client";

import React, { useState, useEffect } from "react";
import styles from "./AnnouncementBar.module.scss";

interface Announcement {
  badge: string;
  text: string;
  linkText: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    badge: "Report",
    text: "Only 3% of URLs reach their full potential length.",
    linkText: "Read the report →",
  },
  {
    badge: "Study",
    text: "Elongated links receive 400% more eye rolls.",
    linkText: "See the data →",
  },
  {
    badge: "Stat",
    text: "Database queries reduced to exactly 0.00%.",
    linkText: "Learn how →",
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 500); // Wait for fade-out before updating index
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const current = ANNOUNCEMENTS[index];

  const handleScrollToHero = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.announcementBar}>
      <div
        className={styles.contentWrapper}
        style={{
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(-5px)",
        }}
        onClick={handleScrollToHero}
      >
        <span className={styles.badge}>{current.badge}</span>
        <span className={styles.text}>{current.text}</span>
        <span className={styles.linkText}>{current.linkText}</span>
      </div>
    </div>
  );
}
