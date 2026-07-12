"use client";

import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const handleScrollToHero = () => {
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToFeatures = () => {
    const featuresEl = document.getElementById("features-cards");
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1 */}
          <div className={styles.column}>
            <span className={styles.colTitle}>Product</span>
            <ul className={styles.linksList}>
              <li className={styles.link} onClick={handleScrollToHero}>
                Elongator
              </li>
              <li className={styles.link} onClick={handleScrollToHero}>
                Resolver
              </li>
              <li className={styles.link} onClick={handleScrollToFeatures}>
                Segmented Dicts
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className={styles.column}>
            <span className={styles.colTitle}>Features</span>
            <ul className={styles.linksList}>
              <li className={styles.link} onClick={handleScrollToFeatures}>
                Stateless Mode
              </li>
              <li className={styles.link} onClick={handleScrollToFeatures}>
                CRC32 Checksum
              </li>
              <li className={styles.link} onClick={handleScrollToFeatures}>
                Typo Interception
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className={styles.column}>
            <span className={styles.colTitle}>Resources</span>
            <ul className={styles.linksList}>
              <li className={styles.link}>Documentation</li>
              <li className={styles.link}>Developer API</li>
              <li className={styles.link}>Absurd Examples</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className={styles.column}>
            <span className={styles.colTitle}>Legal</span>
            <ul className={styles.linksList}>
              <li className={styles.link}>Privacy Policy</li>
              <li className={styles.link}>Terms of Service</li>
              <li className={styles.link}>Cookie Settings</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.copyright}>
            Longly &copy; {new Date().getFullYear()}. Crafted with extreme
            discipline. Stateless &amp; Carbon Neutral.
          </span>

          <div className={styles.badges}>
            <span className={styles.badge}>SOC-0 CERTIFIED</span>
            <span className={styles.badge}>GDPR INCOMPLIANT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
