"use client";

import React, { useState } from "react";
import ThemeSwitcher, {
  Verbosity,
} from "@/components/ThemeSwitcher/ThemeSwitcher";
import UrlForm from "@/components/UrlForm/UrlForm";
import UrlDisplay from "@/components/UrlDisplay/UrlDisplay";
import ResolveForm from "@/components/ResolveForm/ResolveForm";
import { encode } from "@/utils/longener";
import styles from "./InteractiveArea.module.scss";

export default function InteractiveArea() {
  const [verbosity, setVerbosity] = useState<Verbosity>("medium");
  const [activeTab, setActiveTab] = useState<"elongate" | "resolve">(
    "elongate",
  );

  // Elongate states
  const [encodedSlug, setEncodedSlug] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Resolve states
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [resolving, setResolving] = useState(false);
  const [copiedResolved, setCopiedResolved] = useState(false);

  const handleSubmit = (url: string) => {
    setLoading(true);
    setEncodedSlug(null);

    // Simulate premium computational effort for satirical value
    setTimeout(() => {
      try {
        const slug = encode(url, verbosity);
        setEncodedSlug(slug);
        setOriginalUrl(url);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 750);
  };

  const handleResolve = (url: string | null) => {
    setResolvedUrl(url);
  };

  const handleCopyResolved = async () => {
    if (!resolvedUrl) return;
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopiedResolved(true);
      setTimeout(() => setCopiedResolved(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <div className={styles.interactiveArea}>
      <div className={styles.tabsContainer}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "elongate" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("elongate");
            setResolvedUrl(null);
          }}
        >
          Elongate URL
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "resolve" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("resolve");
            setEncodedSlug(null);
          }}
        >
          Resolve Link
        </button>
      </div>

      {activeTab === "elongate" ? (
        <>
          <ThemeSwitcher selected={verbosity} onChange={setVerbosity} />
          <UrlForm onSubmit={handleSubmit} isLoading={loading} />

          {encodedSlug && (
            <div className={styles.resultContainer}>
              <UrlDisplay encodedSlug={encodedSlug} originalUrl={originalUrl} />
            </div>
          )}
        </>
      ) : (
        <>
          <ResolveForm
            onResolve={handleResolve}
            isLoading={resolving}
            setIsLoading={setResolving}
          />

          {resolvedUrl && (
            <div className={styles.resultContainer}>
              <div className={styles.resolvedCard}>
                <span className={styles.resolvedLabel}>
                  RESOLVED DESTINATION
                </span>
                <div className={styles.resolvedUrlContainer}>
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resolvedLink}
                  >
                    {resolvedUrl}
                  </a>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={handleCopyResolved}
                    className={styles.actionButton}
                  >
                    {copiedResolved ? "Copied" : "Copy Link"}
                  </button>
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionButtonPrimary}
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
