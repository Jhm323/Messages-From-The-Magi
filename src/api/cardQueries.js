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
 * Calculation queries (Cards of Destiny numerology)
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
 * Reduce a number to the range 1–52 (Cards of Destiny numerology).
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

/** Parse "MM/DD/YYYY", "YYYY-MM-DD", or "MMDDYYYY" → { month, day, year } */
function parseDate(dateString) {
  if (!dateString || typeof dateString !== "string") return null;
  const s = dateString.trim();

  // ISO: YYYY-MM-DD
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return { year: +m[1], month: +m[2], day: +m[3] };

  // US: MM/DD/YYYY or M/D/YYYY
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return { year: +m[3], month: +m[1], day: +m[2] };

  // Compact: MMDDYYYY
  m = s.match(/^(\d{2})(\d{2})(\d{4})$/);
  if (m) return { year: +m[3], month: +m[1], day: +m[2] };

  return null;
}

/** Convert a location name to its alphanumeric value (A=1…Z=26) */
function locationNameValue(name) {
  return name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((acc, ch) => acc + (ch.charCodeAt(0) - 64), 0);
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
  return CARDS.find(
    (c) => c.rank.toLowerCase() === r.toLowerCase() &&
           c.suit.toLowerCase() === s.toLowerCase()
  ) || null;
}

/**
 * Get all cards for a given suit.
 * @param {string} suit "Hearts"|"Clubs"|"Diamonds"|"Spades"|"Joker"
 */
export function getCardsBySuit(suit) {
  if (!suit) return [];
  return CARDS.filter(
    (c) => c.suit.toLowerCase() === suit.toLowerCase()
  );
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
// CARDS OF DESTINY CALCULATION QUERIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BIRTH CARD
 * Direct lookup by month + day using the Cards of Destiny calendar table.
 *
 * Each month starts at a fixed card (Jan=52/K♠, Feb=50/J♠ … Dec=30/4♦),
 * counting down by 1 for each subsequent day.
 * Formula: cardId = 53 − 2×(month−1) − day
 * Exception: December 31 = Joker (id 53).
 *
 * @param {string} dateString  "MM/DD/YYYY" | "YYYY-MM-DD"
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
 * Sum the two birth date totals, reduce to 1–52.
 *
 * @param {string} dateString1
 * @param {string} dateString2
 * @returns {{ card, reducedValue, steps, person1Sum, person2Sum } | null}
 */
export function getCompatibilityCard(dateString1, dateString2) {
  const p1 = parseDate(dateString1);
  const p2 = parseDate(dateString2);
  if (!p1 || !p2) {
    console.warn("getCompatibilityCard: one or both dates invalid");
    return null;
  }

  const sum1 = p1.month + p1.day + digitSum(p1.year);
  const sum2 = p2.month + p2.day + digitSum(p2.year);
  const rawSum = sum1 + sum2;
  const { value, steps } = reduceToCardNumber(rawSum);
  const card = getCardByNumber(value);

  return { card, reducedValue: value, rawSum, person1Sum: sum1, person2Sum: sum2, steps };
}

/**
 * LOCATION CARD
 * Birth card numerical value + alphanumeric value of location name → reduce to 1–52.
 *
 * Letter values: A=1, B=2 … Z=26 (spaces and punctuation ignored).
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
 * Replace birth year with the queried year, reduce to 1–52.
 *
 * @param {string} dateString  birth date
 * @param {number} year        the year to query (defaults to current year)
 * @returns {{ card, reducedValue, steps } | null}
 */
export function getYearCard(dateString, year = new Date().getFullYear()) {
  const parsed = parseDate(dateString);
  if (!parsed) return null;

  const { month, day } = parsed;
  const yearDigitSum = digitSum(year);
  const rawSum = month + day + yearDigitSum;
  const { value, steps } = reduceToCardNumber(rawSum);
  const card = getCardByNumber(value);

  return { card, reducedValue: value, rawSum, steps: [month, day, yearDigitSum, ...steps] };
}

/**
 * PULL RANDOM CARD (Oracle Feature)
 * Returns a random card from 1–52 (Joker excluded per system rules).
 *
 * @returns {card}
 */
export function pullRandomCard() {
  const id = Math.floor(Math.random() * 52) + 1;
  return getCardByNumber(id);
}

/**
 * CARD OF THE DAY
 * Deterministic pull based on today's date — same card all day for all users.
 * @returns {card}
 */
export function getCardOfTheDay() {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const id = (seed % 52) + 1;
  return getCardByNumber(id);
}
