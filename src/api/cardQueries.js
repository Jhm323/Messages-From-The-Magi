/**
 * Messages from the Magi — Card Query API
 *
 * All functions the frontend (and future server) consume.
 * Input validation included on every public function.
 *
 * Core queries
 *   getCardByNumber(n)            → card with id === n (1–52); joker excluded
 *   getCardById(n)                → card with id === n (1–53); joker included
 *   getCardByRankAndSuit(r, s)    → card matching rank + suit strings
 *   getCardsBySuit(suit)          → all cards for one suit
 *   getAllCards()                  → full array (53 entries)
 *   getCardBack()                  → { imagePath } for card back image
 *
 * Calculation queries
 *   getBirthCard(dateString)       → { card, reducedValue, steps }
 *   getCompatibilityCard(d1, d2)   → { card, reducedValue, steps }
 *   getLocationCard(birthDate, locationName) → { card, reducedValue, steps }
 *   getYearCard(dateString, year)  → { card, reducedValue }
 *   pullRandomCard()               → random card (1–52, joker excluded)
 *
 * All calculation functions reduce digit sums until ≤ 52.
 * Joker (53) is excluded from numerological calculations.
 */

import { CARDS, CARD_BACK_PATH } from "../db/cards.js";

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Sum all digits in a number string or integer */
function digitSum(n) {
  return String(Math.abs(n))
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
}

/**
 * Reduce a number to the range 1–52.
 * Joker (53) is excluded — we never land on 53 via calculation.
 * Returns { value, steps } where steps logs each reduction.
 */
function reduceToCardNumber(n) {
  const steps = [n];
  let current = n;

  // If already in range, done
  if (current >= 1 && current <= 52) return { value: current, steps };

  // Repeatedly sum digits until in range
  while (current > 52 || current < 1) {
    current = digitSum(current);
    steps.push(current);
    // Guard against infinite loop (shouldn't happen with valid input)
    if (steps.length > 20) break;
  }

  // Edge case: digit sum collapsed to 0
  if (current === 0) current = 52;

  return { value: current, steps };
}

/** Parse "MM/DD", "MM/DD/YYYY", or "YYYY-MM-DD" → { month, day } */
function parseDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const s = dateString.trim();

  // MM/DD (no year — primary format)
  let m = s.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (m) return { month: +m[1], day: +m[2] };

  // ISO: YYYY-MM-DD
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return { month: +m[2], day: +m[3] };

  // US with year: MM/DD/YYYY (legacy fallback)
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return { month: +m[1], day: +m[2] };

  return null;
}

/**
 * Convert a location name to its alphanumeric value.
 * Input is normalized to title case first (first letter of each word capitalized,
 * remaining letters lowercase) so user input is always calculated consistently.
 * lowercase a–z = 1–26, uppercase A–Z = 27–52.
 * Non-letter characters are ignored.
 */
function locationNameValue(name) {
  const titleCased = name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return titleCased
    .replace(/[^a-zA-Z]/g, "")
    .split("")
    .reduce((acc, ch) => {
      const code = ch.charCodeAt(0);
      return acc + (code >= 97 ? code - 96 : code - 38); // a-z: 1-26, A-Z: 27-52
    }, 0);
}

/** Normalize a location name to title case for consistent display and calculation. */
export function normalizeLocationName(name) {
  if (!name || typeof name !== "string") return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE LOOKUP QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get a card by its canonical number (1–52, numerology range).
 * Returns null for 53 (Joker) — use getCardById for that.
 */
export function getCardByNumber(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 52) {
    console.warn(`getCardByNumber: expected integer 1–52, got ${n}`);
    return null;
  }
  return CARDS.find((c) => c.id === n) || null;
}

/**
 * Get a card by id (1–53, includes Joker).
 */
export function getCardById(n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 53) {
    console.warn(`getCardById: expected integer 1–53, got ${n}`);
    return null;
  }
  return CARDS.find((c) => c.id === n) || null;
}

/**
 * Get a card by rank and suit strings.
 * @param {string} rank  "Ace" | "2"…"10" | "Jack" | "Queen" | "King" | "Joker"
 * @param {string} suit  "Hearts" | "Clubs" | "Diamonds" | "Spades" | "Joker"
 */
export function getCardByRankAndSuit(rank, suit) {
  if (!rank || !suit) return null;
  const r = rank.trim();
  const s = suit.trim();
  return (
    CARDS.find(
      (c) =>
        c.rank.toLowerCase() === r.toLowerCase() &&
        c.suit.toLowerCase() === s.toLowerCase(),
    ) || null
  );
}

/**
 * Get all cards for a given suit.
 * @param {string} suit "Hearts"|"Clubs"|"Diamonds"|"Spades"|"Joker"
 */
export function getCardsBySuit(suit) {
  if (!suit) return [];
  return CARDS.filter((c) => c.suit.toLowerCase() === suit.toLowerCase());
}

/** Return the full 53-card array. */
export function getAllCards() {
  return [...CARDS];
}

/** Return { imagePath } for the card back. */
export function getCardBack() {
  return { imagePath: CARD_BACK_PATH };
}

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATION QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BIRTH CARD
 * Direct lookup by month + day using the calendar table.
 *
 * Each month starts at a fixed card (Jan=52/K♠, Feb=50/J♠ … Dec=30/4♦),
 * counting down by 1 for each subsequent day.
 * Formula: cardId = 53 − 2×(month−1) − day
 * Exception: December 31 = Joker (id 53).
 *
 * @param {string} dateString  "MM/DD" | "YYYY-MM-DD"
 * @returns {{ card, reducedValue } | null}
 */
export function getBirthCard(dateString) {
  const parsed = parseDate(dateString);
  if (!parsed) {
    console.warn("getBirthCard: invalid date string", dateString);
    return null;
  }

  const { month, day } = parsed;

  // December 31 is the Joker — outside the numerological range
  if (month === 12 && day === 31) {
    return { card: getCardById(53), reducedValue: 53 };
  }

  const cardId = 53 - 2 * (month - 1) - day;

  if (cardId < 1 || cardId > 52) {
    console.warn("getBirthCard: date out of calendar range", dateString);
    return null;
  }

  const card = getCardByNumber(cardId);
  return { card, reducedValue: cardId };
}

/**
 * COMPATIBILITY CARD
 * Sum the two birth card IDs. If sum ≤ 52, that is the card.
 * If sum > 52, subtract 52 once to get the card ID.
 *
 * Example: card 26 + card 22 = 48 → 9 of Spades
 * Example: card 26 + card 51 = 77 → 77 - 52 = 25 → Queen of Clubs
 *
 * @param {string} dateString1
 * @param {string} dateString2
 * @returns {{ card, reducedValue, person1Card, person2Card, rawSum } | null}
 */
export function getCompatibilityCard(dateString1, dateString2) {
  const b1 = getBirthCard(dateString1);
  const b2 = getBirthCard(dateString2);
  if (!b1 || !b2) {
    console.warn("getCompatibilityCard: one or both dates invalid");
    return null;
  }

  const rawSum = b1.reducedValue + b2.reducedValue;
  const cardId = rawSum > 52 ? rawSum - 52 : rawSum;
  const card = getCardByNumber(cardId);

  return {
    card,
    reducedValue: cardId,
    person1Card: b1.card,
    person2Card: b2.card,
    rawSum,
  };
}

/**
 * LOCATION CARD
 * Birth card numerical value + alphanumeric value of location name → reduce to 1–52.
 *
 * Letter values: a–z = 1–26, A–Z = 27–52. Input is normalized to title case.
 *
 * @param {string} dateString    birth date
 * @param {string} locationName  e.g. "New York"
 * @returns {{ card, reducedValue, birthValue, locationValue, steps } | null}
 */
export function getLocationCard(dateString, locationName) {
  const birthResult = getBirthCard(dateString);
  if (!birthResult) return null;
  if (!locationName || typeof locationName !== "string") {
    console.warn("getLocationCard: locationName required");
    return null;
  }

  const locationValue = locationNameValue(locationName);
  const rawSum = birthResult.reducedValue + locationValue;
  const { value, steps } = reduceToCardNumber(rawSum);
  const card = getCardByNumber(value);

  return {
    card,
    reducedValue: value,
    birthValue: birthResult.reducedValue,
    locationValue,
    locationName,
    steps,
  };
}

/**
 * YEAR CARD
 * In the calendar lookup system, the card is determined by month + day only —
 * the year does not change the card. Returns the same result as getBirthCard.
 *
 * @param {string} dateString  birth date
 * @returns {{ card, reducedValue } | null}
 */
export function getYearCard(dateString) {
  return getBirthCard(dateString);
}

/**
 * PULL RANDOM CARD (Oracle Feature)
 * Returns a random card from 1–53.
 *
 * @returns {card}
 */
export function pullRandomCard() {
  const id = Math.floor(Math.random() * 53) + 1;
  return getCardByNumber(id);
}

/**
 * CARD OF THE DAY
 * Returns the card for today's month and day using the same calendar lookup as birth cards.
 * Same card for everyone on the same date.
 * @returns {card}
 */
export function getCardOfTheDay() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // December 31 is the Joker
  if (month === 12 && day === 31) return getCardById(53);

  const cardId = 53 - 2 * (month - 1) - day;
  return getCardByNumber(cardId);
}
