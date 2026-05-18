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
 * Convert a "MM/DD" or "YYYY-MM-DD" value to a display string ("January 15").
 */
export function displayDate(dateString) {
  if (!dateString) return "";
  let month, day;
  if (dateString.includes("-")) {
    // ISO: YYYY-MM-DD
    const [, m, d] = dateString.split("-").map(Number);
    month = m; day = d;
  } else {
    [month, day] = dateString.split("/").map(Number);
  }
  return new Date(2000, month - 1, day).toLocaleDateString("en-US", { month: "long", day: "numeric" });
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
 * e.g. "3 (March) + 15 (day) = 18"
 */
export function formatBirthCalculation(month, day) {
  return `${month} + ${day} = ${month + day}`;
}

/**
 * Build HTML for a paired month + day select, replacing a year-inclusive date input.
 * @param {string} monthId  id attribute for the month <select>
 * @param {string} dayId    id attribute for the day <select>
 */
export function buildBirthdateSelects(monthId, dayId) {
  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];
  const monthOpts = monthNames.map((name, i) =>
    `<option value="${i + 1}">${name}</option>`).join('');
  const dayOpts = Array.from({ length: 31 }, (_, i) =>
    `<option value="${i + 1}">${i + 1}</option>`).join('');
  return `<div style="display:flex;gap:0.75rem;">
    <select class="form-input" id="${monthId}" required>
      <option value="">Month</option>${monthOpts}
    </select>
    <select class="form-input" id="${dayId}" required>
      <option value="">Day</option>${dayOpts}
    </select>
  </div>`;
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
