import {
  WORDLIST_SMALL,
  WORDLIST_MEDIUM,
  WORDLIST_LARGE,
} from "../lib/wordlist";
import { crc32, Buffer as SafeBuffer } from "./crc32";

const WORDLISTS = {
  small: WORDLIST_SMALL,
  medium: WORDLIST_MEDIUM,
  large: WORDLIST_LARGE,
};

/**
 * Encodes a URL into an absurdly long hyphen-separated list of dictionary words.
 *
 * 1. UTF-8 encode URL
 * 2. Prepend marker byte (0x01)
 * 3. Append 4-byte CRC32 checksum
 * 4. Convert full buffer to BigInt
 * 5. Convert to base-N (where N is wordlist length)
 * 6. Map digits to words from selected wordlist
 */
export function encode(
  url: string,
  wordlistKey: "small" | "medium" | "large",
): string {
  if (!url || url.trim() === "") {
    throw new Error("URL cannot be empty");
  }

  // 1. UTF-8 encode the URL.
  const urlBytes = new TextEncoder().encode(url.trim());

  // 2. Prepend a single non-zero marker byte (0x01) to preserve leading zero bytes.
  const marker = new Uint8Array([0x01]);

  // 3. Append a 4-byte CRC32 checksum of the payload (urlBytes).
  const checksum = crc32(urlBytes);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fullBuffer = (SafeBuffer as any).concat([marker, urlBytes, checksum]);

  // 4. Convert the full byte buffer to a BigInt.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hex = (SafeBuffer as any).from(fullBuffer).toString("hex");
  const num = BigInt("0x" + hex);

  // 5. Convert that BigInt to base-N via repeated division/modulo.
  const wordlist = WORDLISTS[wordlistKey];
  const N = BigInt(wordlist.length);
  let temp = num;
  const digits: number[] = [];

  while (temp > BigInt(0)) {
    const digit = Number(temp % N);
    digits.push(digit);
    temp = temp / N;
  }

  // 6. Map each base-N digit to a word.
  const words = digits.map((d) => wordlist[d]);

  // 7. Join with -
  return words.join("-");
}

/**
 * Decodes an elongated word string back to the original URL.
 *
 * 1. Split on -
 * 2. Look up index in selected wordlist
 * 3. Reconstruct BigInt
 * 4. Convert to byte buffer (padding hex if needed)
 * 5. Extract marker, payload, and checksum
 * 6. Validate CRC32
 * 7. UTF-8 decode
 */
export function decode(
  encoded: string,
  wordlistKey: "small" | "medium" | "large",
): { url: string | null; error?: string } {
  const cleanInput = encoded ? encoded.trim() : "";
  if (!cleanInput) {
    return { url: null, error: "Link is empty" };
  }

  const wordlist = WORDLISTS[wordlistKey];
  // Reverse lookup map for O(1) searches
  const lookupMap = new Map<string, number>();
  for (let i = 0; i < wordlist.length; i++) {
    lookupMap.set(wordlist[i], i);
  }

  const words = cleanInput.split("-");
  const digits: number[] = [];

  // Look up index of each word
  for (const word of words) {
    const cleanWord = word.trim().toLowerCase();
    const index = lookupMap.get(cleanWord);
    if (index === undefined) {
      return {
        url: null,
        error: `Unknown word: "${word}" — link is corrupted`,
      };
    }
    digits.push(index);
  }

  // Reconstruct BigInt
  const N = BigInt(wordlist.length);
  let num = BigInt(0);
  for (let i = digits.length - 1; i >= 0; i--) {
    num = num * N + BigInt(digits[i]);
  }

  // Convert BigInt to hex and parse to byte buffer
  let hex = num.toString(16);
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fullBuffer = (SafeBuffer as any).from(hex, "hex");

  // Validate minimum length (1 marker byte + 4 checksum bytes)
  if (fullBuffer.length < 5) {
    return { url: null, error: "Link is too short to be valid" };
  }

  const marker = fullBuffer[0];
  if (marker !== 0x01) {
    return { url: null, error: "Invalid link signature or format" };
  }

  // Strip marker and split payload from trailing 4-byte checksum
  const payload = fullBuffer.slice(1, -4);
  const receivedChecksum = fullBuffer.slice(-4);

  // Recompute CRC32 over the payload (without the marker) and verify
  const computedChecksum = crc32(payload);
  let mismatch = false;
  for (let i = 0; i < 4; i++) {
    if (computedChecksum[i] !== receivedChecksum[i]) {
      mismatch = true;
      break;
    }
  }

  if (mismatch) {
    return { url: null, error: "Checksum mismatch — typo or tampering" };
  }

  // Decode to URL
  try {
    const url = new TextDecoder().decode(payload);
    return { url };
  } catch {
    return { url: null, error: "Failed to decode UTF-8 URL payload" };
  }
}

/**
 * Automatically decodes an elongated string without knowing the wordlist beforehand.
 * Evaluates the word lists and checks the CRC32 checksum.
 */
export function decodeAuto(encoded: string): {
  url: string | null;
  error?: string;
} {
  const cleanInput = encoded ? encoded.trim() : "";
  if (!cleanInput) {
    return { url: null, error: "Link is empty" };
  }

  const words = cleanInput.split("-").map((w) => w.trim().toLowerCase());

  // Check which wordlists contain ALL words in the input
  const inSmall = words.every((w) => WORDLIST_SMALL.includes(w));
  const inMedium = words.every((w) => WORDLIST_MEDIUM.includes(w));
  const inLarge = words.every((w) => WORDLIST_LARGE.includes(w));

  // Try decoding with lists where all words matched
  if (inSmall) {
    const res = decode(cleanInput, "small");
    if (!res.error) return res;
  }
  if (inMedium) {
    const res = decode(cleanInput, "medium");
    if (!res.error) return res;
  }
  if (inLarge) {
    const res = decode(cleanInput, "large");
    if (!res.error) return res;
  }

  // If we couldn't decode, check if there are unknown words across ALL wordlists
  for (const word of words) {
    const isKnown =
      WORDLIST_SMALL.includes(word) ||
      WORDLIST_MEDIUM.includes(word) ||
      WORDLIST_LARGE.includes(word);
    if (!isKnown) {
      return {
        url: null,
        error: `Unknown word: "${word}" — even our premium dictionaries disown it.`,
      };
    }
  }

  return {
    url: null,
    error: "Checksum mismatch — this link has a typo or was tampered with.",
  };
}
