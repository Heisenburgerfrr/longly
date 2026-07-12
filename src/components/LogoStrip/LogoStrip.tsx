"use client";

import React from "react";
import styles from "./LogoStrip.module.scss";

export default function LogoStrip() {
  return (
    <section className={styles.logoStrip}>
      <div className={styles.container}>
        <span className={styles.label}>As absurdly over-engineered as:</span>
        <div className={styles.logoRow}>
          {/* Vim */}
          <div className={styles.logoItem}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2L2 22h20L12 2zm-1 5h2v6h-2V7zm0 8h2v2h-2v-2z" />
            </svg>
            <span>VIM.EXE</span>
          </div>

          {/* Notepad */}
          <div className={styles.logoItem}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
            </svg>
            <span>Notepad.exe</span>
          </div>

          {/* Floppy Disk */}
          <div className={styles.logoItem}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>
            <span>FloppyDisk Co.</span>
          </div>

          {/* Carrier Pigeon */}
          <div className={styles.logoItem}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span>PigeonNet</span>
          </div>
        </div>
      </div>
    </section>
  );
}
