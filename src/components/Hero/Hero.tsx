"use client";

import React from "react";
import InteractiveAreaWrapper from "@/components/InteractiveAreaWrapper/InteractiveAreaWrapper";
import styles from "./Hero.module.scss";

export default function Hero() {
  const handlePrimaryClick = () => {
    const inputEl = document.querySelector(
      'input[type="url"], input[type="text"]',
    ) as HTMLInputElement;
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSecondaryClick = () => {
    const featuresEl = document.getElementById("features-cards");
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className={styles.hero}>
      <div className={styles.ambientGlow} />
      <div className={styles.content}>
        <h1 className={styles.headline}>
          Absurdly long URLs.
          <span className={styles.subHeadline}>
            Engineered for zero efficiency.
          </span>
        </h1>
        <p className={styles.description}>
          Why shorten when you can elongate? We convert standard links into
          beautifully descriptive, fully reversible, human-readable prose.
          Deadpan execution, maximum length.
        </p>

        <div className={styles.ctaGroup}>
          <button
            type="button"
            className={styles.primaryCta}
            onClick={handlePrimaryClick}
          >
            Longen it
          </button>
          <button
            type="button"
            className={styles.secondaryCta}
            onClick={handleSecondaryClick}
          >
            See how it works
          </button>
        </div>

        <div className={styles.widgetContainer}>
          <InteractiveAreaWrapper />
        </div>
      </div>
    </section>
  );
}
