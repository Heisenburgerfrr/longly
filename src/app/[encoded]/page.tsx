import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { decodeAuto } from "@/utils/longener";
import { formatUrl } from "@/utils/formatUrl";
import styles from "./redirect.module.scss";

interface PageProps {
  params: Promise<{ encoded: string }>;
}

// Simple in-memory IP rate limiting cache
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_THRESHOLD = 30; // Max requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > record.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  record.count += 1;
  return record.count > RATE_LIMIT_THRESHOLD;
}

export default async function RedirectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const encodedSlug = resolvedParams.encoded;

  // Read client IP for rate limiting
  const headersList = await headers();
  const clientIp =
    headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

  if (checkRateLimit(clientIp)) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            LONGLY
          </Link>
        </header>
        <main className={styles.main}>
          <div className={styles.errorCard}>
            <div className={styles.errorIcon}>⏳</div>
            <h1 className={styles.errorTitle}>Slow down.</h1>
            <p className={styles.errorMessage}>
              Too many translation requests. Please take a moment to appreciate
              the absolute inefficiency before trying again.
            </p>
            <Link href="/" className={styles.homeButton}>
              Back to Safety
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Attempt to decode the slug
  const result = decodeAuto(encodedSlug);

  if ("error" in result || !result.url) {
    const errorMsg = result.error || "The link payload could not be decoded.";
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            LONGLY
          </Link>
        </header>
        <main className={styles.main}>
          <div className={styles.errorCard}>
            <div className={styles.errorIcon}>⚠️</div>
            <h1 className={styles.errorTitle}>Unresolved link.</h1>
            <p className={styles.errorMessage}>
              {errorMsg}
              <br />
              <span
                style={{
                  display: "block",
                  marginTop: "12px",
                  opacity: 0.7,
                  fontSize: "0.85em",
                }}
              >
                This link has a typo. Even ATM machines wouldn&apos;t accept it.
              </span>
            </p>
            <Link href="/" className={styles.homeButton}>
              Return Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Instant direct redirect (307 Temporary Redirect)
  redirect(formatUrl(result.url));
}
export const runtime = "nodejs";
