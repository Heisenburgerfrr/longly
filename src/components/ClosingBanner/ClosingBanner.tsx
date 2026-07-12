"use client";

import React from "react";
import styles from "./ClosingBanner.module.scss";

export default function ClosingBanner() {
  const handleCtaClick = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.closingBanner}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to maximize your URLs?</h2>
        <p className={styles.subtitle}>
          Stop holding back. Convert your standard links into beautiful
          paragraphs of reversible prose and experience the joy of stateless
          data expansion today.
        </p>
        <button
          type="button"
          className={styles.button}
          onClick={handleCtaClick}
        >
          Start Elongating Free
        </button>
      </div>
    </section>
  );
}
