"use client";

import React from "react";
import styles from "./Testimonial.module.scss";

export default function Testimonial() {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.quoteCard}>
          <div className={styles.quoteIcon}>“</div>
          <blockquote className={styles.quoteText}>
            I sent my VP of Engineering a 1,400-word encoded URL for our
            quarterly deployment report. He spent 45 minutes verifying the
            checksums manually. We haven&apos;t spoken since, which has greatly
            increased my daily focus and coding productivity.
          </blockquote>

          <div className={styles.profile}>
            <div className={styles.avatar}>AC</div>
            <div className={styles.meta}>
              <span className={styles.name}>Alistair Carbon</span>
              <span className={styles.title}>
                Principal Lead Architect, Stateless Corp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
