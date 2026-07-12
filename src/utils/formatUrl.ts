/**
 * Sanitizes and formats a URL string, ensuring it has a proper HTTP/HTTPS protocol prefix.
 * If no protocol is present, it defaults to prepending "https://".
 */
export function formatUrl(url: string): string {
  let cleaned = url.trim();
  if (!cleaned) return "";

  // Check if it already starts with http:// or https://
  if (!/^https?:\/\//i.test(cleaned)) {
    // If it starts with //, prepend https:
    if (cleaned.startsWith("//")) {
      cleaned = "https:" + cleaned;
    } else {
      cleaned = "https://" + cleaned;
    }
  }

  return cleaned;
}
