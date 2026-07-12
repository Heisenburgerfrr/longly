"use client";

import React from "react";
import styles from "./FeatureCards.module.scss";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  linkText: string;
}

const FEATURES: Feature[] = [
  {
    id: "reversible",
    title: "Reversible Encoding",
    description:
      "Convert any URL into a fully reversible sequence of real dictionary words. Zero databases or servers required.",
    bullets: [
      "No storage database required",
      "Guaranteed 100% routing uptime",
      "Stateless decoding functionality",
      "Completely private link payloads",
    ],
    linkText: "Elongate a link",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
      </svg>
    ),
  },
  {
    id: "typo",
    title: "Typo Detection",
    description:
      "Our high-entropy parser checks the CRC32 checksums of incoming links instantly, intercepting errors before redirecting.",
    bullets: [
      "32-bit CRC payload check",
      "Instant typo interception",
      "Avoids dead or broken hops",
      "Descriptive parsing errors",
    ],
    linkText: "Test a broken link",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    id: "verbosity",
    title: "Custom Verbosity",
    description:
      "Adapt the encoding density. Go absurdly wordy for long prose, or use the semi-efficient dictionary for lighter lines.",
    bullets: [
      "Small (4-bit), Medium (8-bit) scales",
      "Premium 11-bit large dictionary",
      "Configurable paragraph densities",
      "Complete aesthetic length control",
    ],
    linkText: "Configure dictionary",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
      </svg>
    ),
  },
];

export default function FeatureCards() {
  const handleFeatureClick = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="features-cards" className={styles.featureSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.preHeading}>Advanced Features</span>
          <h2 className={styles.heading}>Stateless URL Reconstruction</h2>
          <p className={styles.description}>
            We don&apos;t store your URLs. We encode them directly into the link
            text itself. Here is how we ensure maximum size and flawless
            recovery.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <article key={feature.id} className={styles.card}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>

              <ul className={styles.bulletList}>
                {feature.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.bulletItem}>
                    {bullet}
                  </li>
                ))}
              </ul>

              <span
                className={styles.learnMoreLink}
                onClick={handleFeatureClick}
              >
                {feature.linkText} <span className={styles.arrow}>→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
