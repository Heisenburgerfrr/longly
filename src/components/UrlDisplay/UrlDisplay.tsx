"use client";

import React, { useState, useEffect } from "react";
import styles from "./UrlDisplay.module.scss";

interface UrlDisplayProps {
  encodedSlug: string;
  originalUrl: string;
}

export default function UrlDisplay({
  encodedSlug,
  originalUrl,
}: UrlDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://longly.co");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOrigin(window.location.origin);
    }
  }, []);

  const fullUrl = `${origin}/${encodedSlug}`;
  const originalLength = originalUrl.length || 1;
  const increasePercentage = Math.max(
    0,
    Math.round(((fullUrl.length - originalLength) / originalLength) * 100),
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  const words = encodedSlug.split("-");

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <span className={styles.title}>ELONGATED ARTIFACT</span>
        <span className={styles.stats}>
          {fullUrl.length} chars ({increasePercentage}% less efficient)
        </span>
      </div>

      <div className={styles.displayPanel}>
        <div className={styles.urlContent}>
          <span className={styles.hostPrefix}>
            {origin.replace(/^https?:\/\//, "")}/
          </span>
          <div className={styles.wordsWrapper}>
            {words.map((word, index) => {
              const delay = `${index * 20}ms`;
              return (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span
                      className={styles.hyphen}
                      style={{ "--delay": delay } as React.CSSProperties}
                    >
                      -
                    </span>
                  )}
                  <span
                    className={styles.word}
                    style={{ "--delay": delay } as React.CSSProperties}
                  >
                    {word}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
          aria-label="Copy URL to clipboard"
        >
          {copied ? (
            <span className={styles.copiedText}>Copied</span>
          ) : (
            <span className={styles.copyText}>Copy</span>
          )}
        </button>
      </div>
    </div>
  );
}
