"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "./UrlForm.module.scss";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const MAX_URL_LENGTH = 200;

export default function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);

    if (val.length > MAX_URL_LENGTH) {
      setError(
        `Maximum limit is ${MAX_URL_LENGTH} characters. This is a premium product, not a storage dump.`,
      );
    } else {
      setError(null);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) {
      setError("A destination URL is required.");
      return;
    }

    if (trimmed.length > MAX_URL_LENGTH) {
      setError(
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
      setError(null);
      onSubmit(testUrl);
    } catch {
      setError("Please supply a valid, well-formed destination URL.");
    }
  };

  const isButtonDisabled =
    !mounted || isLoading || !!error || url.trim().length === 0;

  return (
    <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="url"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter destination URL..."
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            disabled={isLoading}
            aria-label="Destination URL"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isButtonDisabled}
        >
          {isLoading ? "Designing..." : "Generate"}
        </button>
      </div>

      <div className={styles.metaRow}>
        {error ? (
          <span className={styles.errorMessage} role="alert">
            {error}
          </span>
        ) : (
          <span className={styles.helpText}>
            Every character will be meticulously elongated.
          </span>
        )}
        <span
          className={`${styles.charCount} ${url.length > MAX_URL_LENGTH ? styles.overLimit : ""}`}
        >
          {url.length} / {MAX_URL_LENGTH}
        </span>
      </div>
    </form>
  );
}
