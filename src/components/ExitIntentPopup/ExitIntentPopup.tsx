"use client";

import React, { useState, useEffect } from "react";
import styles from "./ExitIntentPopup.module.scss";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in the current session
    const isDismissed = sessionStorage.getItem("longly_exit_popup_dismissed");
    if (isDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor exits the top viewport boundary (clientY < 15)
      if (e.clientY < 15) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("longly_exit_popup_dismissed", "true");
  };

  const handleClaimOffer = () => {
    handleDismiss();
    // Scroll to hero input to try it out
    const heroEl = document.getElementById("hero-section");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleDismiss}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleDismiss}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* Warning Icon */}
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>

        <h3 className={styles.title}>
          Wait! Don&apos;t go back to short links.
        </h3>
        <p className={styles.description}>
          Standard URLs are boring and space-efficient. Stay with us and upgrade
          to our
          <strong> Free Forever Elongated Plan</strong>. You get 0MB of
          databases and 100% database-free routing forever.
        </p>

        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleClaimOffer}
        >
          Elongate a Link Now
        </button>

        <button
          type="button"
          className={styles.declineButton}
          onClick={handleDismiss}
        >
          No thanks, I prefer tiny URLs
        </button>
      </div>
    </div>
  );
}
