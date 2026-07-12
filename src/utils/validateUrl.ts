import { formatUrl } from "./formatUrl";

/**
 * Validates whether a given string is a structurally sound web URL.
 * Automatically formats the URL first (e.g. prepending protocol if missing).
 */
export function validateUrl(url: string): boolean {
  if (!url) return false;

  const formatted = formatUrl(url);

  try {
    const parsed = new URL(formatted);

    // Ensure the protocol is http: or https:
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return false;
    }

    // Ensure the hostname is valid and has at least a TLD-like structure
    // (except localhost, which is valid for debugging/tests)
    const host = parsed.hostname;
    if (!host) {
      return false;
    }

    if (host === "localhost") {
      return true;
    }

    // Must contain a dot and not end with a dot
    return host.includes(".") && !host.endsWith(".");
  } catch {
    return false;
  }
}
