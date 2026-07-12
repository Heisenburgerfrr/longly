"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { decodeAuto } from "@/utils/longener";
import styles from "./ResolveForm.module.scss";

interface ResolveFormProps {
  onResolve: (url: string | null, error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function ResolveForm({
  onResolve,
  isLoading,
  setIsLoading,
}: ResolveFormProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please supply an elongated link or code.");
      return;
    }

    setIsLoading(true);
    setError(null);
    onResolve(null, null);

    // Simulate premium computational effort for satirical value
    setTimeout(() => {
      try {
        // Extract the code if they pasted a full URL
        let code = trimmed;
        if (code.includes("/")) {
          const parts = code.split("/");
          code = parts[parts.length - 1] || parts[parts.length - 2];
        }

        const result = decodeAuto(code);
        if ("error" in result && result.error) {
          setError(result.error);
          onResolve(null, result.error);
        } else if (result.url) {
          onResolve(result.url, null);
        } else {
          setError("An unexpected error occurred during resolution.");
          onResolve(null, "An unexpected error occurred during resolution.");
        }
      } catch {
        setError("Failed to process the input. The link is malformed.");
        onResolve(null, "Failed to process the input. The link is malformed.");
      } finally {
        setIsLoading(false);
      }
    }, 750);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form} noValidate>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Paste elongated URL or words (e.g. solid-hammer-pulse...)"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            disabled={isLoading}
            aria-label="Elongated link or words"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={!mounted || isLoading || input.trim().length === 0}
        >
          {isLoading ? "Reconstructing..." : "Resolve"}
        </button>
      </div>

      <div className={styles.metaRow}>
        {error ? (
          <span className={styles.errorMessage} role="alert">
            {error}
          </span>
        ) : (
          <span className={styles.helpText}>
            Our high-dimensional parser will attempt recovery.
          </span>
        )}
      </div>
    </form>
  );
}
