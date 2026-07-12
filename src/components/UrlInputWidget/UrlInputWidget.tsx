"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { encode, decodeAuto } from "@/utils/longener";
import ThemeSwitcher, {
  Verbosity,
} from "@/components/ThemeSwitcher/ThemeSwitcher";
import styles from "./UrlInputWidget.module.scss";

export const MAX_URL_LENGTH = 200;

export default function UrlInputWidget() {
  const [activeTab, setActiveTab] = useState<"elongate" | "resolve">(
    "elongate",
  );
  const [verbosity, setVerbosity] = useState<Verbosity>("medium");
  const [mounted, setMounted] = useState(false);

  // Elongate states
  const [inputUrl, setInputUrl] = useState("");
  const [elongateError, setElongateError] = useState<string | null>(null);
  const [elongateLoading, setElongateLoading] = useState(false);
  const [encodedSlug, setEncodedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState(false);

  // Resolve states
  const [inputResolve, setInputResolve] = useState("");
  const [resolveError, setResolveError] = useState<string | null>(null);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [copiedResolved, setCopiedResolved] = useState(false);

  // Get current hostname origin for slug linking
  const [origin, setOrigin] = useState("https://longly.co");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Handle URL change for elongating
  const handleElongateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputUrl(val);

    if (val.length > MAX_URL_LENGTH) {
      setElongateError(
        `Maximum limit is ${MAX_URL_LENGTH} characters. This is a premium product, not a storage dump.`,
      );
    } else {
      setElongateError(null);
    }
  };

  // Submit URL to elongate
  const handleElongateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setElongateError("A destination URL is required.");
      return;
    }

    if (trimmed.length > MAX_URL_LENGTH) {
      setElongateError(
        `Target URL exceeds the absolute limit of ${MAX_URL_LENGTH} characters.`,
      );
      return;
    }

    // Basic structure check (standard protocol prefix checks)
    let testUrl = trimmed;
    if (!/^https?:\/\//i.test(testUrl)) {
      if (testUrl.startsWith("//")) {
        testUrl = "https:" + testUrl;
      } else {
        testUrl = "https://" + testUrl;
      }
    }

    try {
      const parsed = new URL(testUrl);
      if (!parsed.hostname || !parsed.hostname.includes(".")) {
        throw new Error();
      }
      setElongateError(null);
      setElongateLoading(true);
      setEncodedSlug(null);

      // Simulate premium computational effort for satirical value
      setTimeout(() => {
        try {
          const slug = encode(testUrl, verbosity);
          setEncodedSlug(slug);
        } catch {
          setElongateError(
            "Failed to encode URL. An unexpected encoder crash occurred.",
          );
        } finally {
          setElongateLoading(false);
        }
      }, 750);
    } catch {
      setElongateError("Please supply a valid, well-formed destination URL.");
    }
  };

  // Submit Code to resolve
  const handleResolveSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputResolve.trim();
    if (!trimmed) {
      setResolveError("Please supply an elongated link or code.");
      return;
    }

    setResolveLoading(true);
    setResolveError(null);
    setResolvedUrl(null);

    // Simulate premium computational effort for satirical value
    setTimeout(() => {
      try {
        let code = trimmed;
        if (code.includes("/")) {
          const parts = code.split("/");
          code = parts[parts.length - 1] || parts[parts.length - 2];
        }

        const result = decodeAuto(code);
        if ("error" in result && result.error) {
          setResolveError(result.error);
        } else if (result.url) {
          setResolvedUrl(result.url);
        } else {
          setResolveError("An unexpected error occurred during resolution.");
        }
      } catch {
        setResolveError("Failed to process the input. The link is malformed.");
      } finally {
        setResolveLoading(false);
      }
    }, 750);
  };

  // Copy encoded slug
  const handleCopySlug = async () => {
    if (!encodedSlug) return;
    const fullUrl = `${origin}/${encodedSlug}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedSlug(true);
      setTimeout(() => setCopiedSlug(false), 2000);
    } catch {
      console.error("Failed to copy URL");
    }
  };

  // Copy resolved destination
  const handleCopyResolved = async () => {
    if (!resolvedUrl) return;
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopiedResolved(true);
      setTimeout(() => setCopiedResolved(false), 2000);
    } catch {
      console.error("Failed to copy URL");
    }
  };

  return (
    <div className={styles.widgetCard}>
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "elongate" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("elongate");
            setResolvedUrl(null);
            setResolveError(null);
          }}
        >
          Longen a URL
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === "resolve" ? styles.active : ""}`}
          onClick={() => {
            setActiveTab("resolve");
            setEncodedSlug(null);
            setElongateError(null);
          }}
        >
          Decode a Longened URL
        </button>
      </div>

      {activeTab === "elongate" ? (
        /* ELONGATE PANEL */
        <form
          onSubmit={handleElongateSubmit}
          className={styles.form}
          noValidate
        >
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="destination-url">
              Destination URL
            </label>
            <input
              id="destination-url"
              type="url"
              value={inputUrl}
              onChange={handleElongateChange}
              placeholder="Paste a URL. We'll make it worse."
              className={`${styles.input} ${elongateError ? styles.inputError : ""}`}
              disabled={elongateLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          {/* Verbosity Segmented Selector */}
          <div className={styles.verbosityContainer}>
            <span className={styles.inputLabel}>Elongation Verbosity</span>
            <ThemeSwitcher selected={verbosity} onChange={setVerbosity} />
          </div>

          <div className={styles.metaRow}>
            {elongateError ? (
              <span className={styles.errorMessage} role="alert">
                {elongateError}
              </span>
            ) : (
              <span className={styles.helpText}>
                Every character will be meticulously elongated.
              </span>
            )}
            <span
              className={`${styles.charCount} ${inputUrl.length > MAX_URL_LENGTH ? styles.overLimit : ""}`}
            >
              {inputUrl.length} / {MAX_URL_LENGTH}
            </span>
          </div>

          <button
            type="submit"
            className={styles.ctaButton}
            disabled={
              !mounted ||
              elongateLoading ||
              !!elongateError ||
              inputUrl.trim().length === 0
            }
          >
            {elongateLoading ? "Designing..." : "Longen it"}
          </button>

          {/* Result State */}
          {encodedSlug && (
            <div className={styles.resultContainer}>
              <span className={styles.resultTitle}>Elongated Artifact</span>
              <textarea
                className={styles.resultTextArea}
                value={`${origin}/${encodedSlug}`}
                readOnly
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <div className={styles.resultActionRow}>
                <button
                  type="button"
                  onClick={handleCopySlug}
                  className={`${styles.copyButton} ${copiedSlug ? styles.copied : ""}`}
                >
                  {copiedSlug ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* RESOLVE PANEL */
        <form onSubmit={handleResolveSubmit} className={styles.form} noValidate>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="elongated-url">
              Elongated Link or Code
            </label>
            <input
              id="elongated-url"
              type="text"
              value={inputResolve}
              onChange={(e) => {
                setInputResolve(e.target.value);
                setResolveError(null);
              }}
              placeholder="Paste elongated URL or words (e.g. solid-hammer-pulse...)"
              className={`${styles.input} ${resolveError ? styles.inputError : ""}`}
              disabled={resolveLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          <div className={styles.metaRow}>
            {resolveError ? (
              <span className={styles.errorMessage} role="alert">
                {resolveError}
              </span>
            ) : (
              <span className={styles.helpText}>
                Our high-dimensional parser will attempt recovery.
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.ctaButton}
            disabled={
              !mounted || resolveLoading || inputResolve.trim().length === 0
            }
          >
            {resolveLoading ? "Reconstructing..." : "Resolve"}
          </button>

          {/* Result State */}
          {resolvedUrl && (
            <div className={styles.resultContainer}>
              <span className={styles.resultTitle}>Resolved Destination</span>
              <div className={styles.resultBox}>
                <div className={styles.resultLinkBox}>
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.resultUrlLink}
                  >
                    {resolvedUrl}
                  </a>
                </div>
                <div className={styles.resultActionRow}>
                  <button
                    type="button"
                    onClick={handleCopyResolved}
                    className={`${styles.copyButton} ${copiedResolved ? styles.copied : ""}`}
                  >
                    {copiedResolved ? "Copied!" : "Copy Link"}
                  </button>
                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitButton}
                  >
                    Visit Site
                  </a>
                </div>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
