/**
 * Messages from the Magi — Utility Helpers
 * Shared formatting and helper functions used across components.
 */

// ─── Date Utilities ───────────────────────────────────────────────────────────

/**
 * Format a JS Date or ISO string for display.
 * @param {Date|string} date
 * @param {Object} opts  — Intl.DateTimeFormat options
 */
export function formatDate(date, opts = { month: "long", day: "numeric", year: "numeric" }) {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return "";
  return d.toLocaleDateString("en-US", opts);
}

/**
 * Convert a browser <input type="date"> value ("YYYY-MM-DD")
 * to a user-facing display string ("January 15, 1990").
 */
export function displayDate(isoString) {
  if (!isoString) return "";
  // Parse without timezone shift
  const [y, m, d] = isoString.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ─── Numerology Utilities ─────────────────────────────────────────────────────

/**
 * Reduce any integer to a single digit (1–9).
 * Used for secondary numerological displays.
 */
export function reduceToSingleDigit(n) {
  let current = Math.abs(n);
  while (current > 9) {
    current = String(current).split("").reduce((a, d) => a + Number(d), 0);
  }
  return current;
}

/**
 * Return a human-readable breakdown of a birth date calculation.
 * e.g. "3 (March) + 15 (day) + 19 (1990 → 1+9+9+0) = 37"
 */
export function formatBirthCalculation(month, day, year) {
  const yearDigits  = String(year).split("").join("+");
  const yearSum     = String(year).split("").reduce((a, d) => a + Number(d), 0);
  return `${month} + ${day} + ${yearDigits} (${yearSum}) = ${month + day + yearSum}`;
}

// ─── String Utilities ─────────────────────────────────────────────────────────

/** Title-case a string: "ace of hearts" → "Ace of Hearts" */
export function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Truncate a string to maxLen characters, appending "…" */
export function truncate(str, maxLen = 120) {
  if (!str || str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + "…";
}

/**
 * Convert a location name to its alphanumeric value (A=1…Z=26).
 * Spaces and non-alpha characters are ignored.
 * Exported here for UI display purposes (also used internally in cardQueries).
 */
export function locationNameValue(name) {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((acc, ch) => acc + (ch.charCodeAt(0) - 64), 0);
}

// ─── DOM Utilities ────────────────────────────────────────────────────────────

/** Return a CSS variable value from :root */
export function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Animate an element with a one-shot CSS animation class */
export function animateOnce(el, className, durationMs = 600) {
  el.classList.add(className);
  setTimeout(() => el.classList.remove(className), durationMs);
}

/** Scroll an element into view smoothly */
export function scrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Card Display Helpers ─────────────────────────────────────────────────────

/** Return the CSS color variable name for a suit */
export function suitColorVar(suit) {
  const map = {
    Hearts:   "--suit-hearts",
    Clubs:    "--suit-clubs",
    Diamonds: "--suit-diamonds",
    Spades:   "--suit-spades",
    Joker:    "--suit-joker",
  };
  return map[suit] || "--color-gold";
}

/** Return a short ordinal label for a card rank */
export function rankLabel(rank) {
  const labels = {
    Ace: "A", Jack: "J", Queen: "Q", King: "K", Joker: "★",
  };
  return labels[rank] ?? rank;
}

/**
 * Generate a shareable URL for a specific card.
 * Used when/if deep-linking is added to the card browser.
 */
export function cardShareUrl(cardId) {
  const base = window.location.origin;
  return `${base}/cards.html?card=${cardId}`;
}
