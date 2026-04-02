# Messages from the Magi
### MVP Repository

---

## Overview

This is the MVP codebase for **Messages from the Magi**, a digital platform built on Sharon's oracle system — a mystic numerological science that uses a standard 52-card deck (+ Joker) as a map of identity, timing, and consciousness.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build
```

Requires **Node.js 18+**.

---

## Repository Structure

```
magi-app/
├── public/
│   ├── index.html              ← Main homepage (MVP)
│   ├── cards.html              ← Full card browser / gallery
│   └── images/
│       ├── cards/              ← 53 card images (named by card number + slug)
│       │   ├── 01_ace_of_hearts.jpg
│       │   ├── 02_2_of_hearts.jpg
│       │   │   … (04–52)
│       │   └── 53_joker.jpg
│       └── util/
│           ├── card_back.jpg       ← Card back (used in oracle pull animation)
│           └── card_back_alt.jpg   ← Alternate card back angle
│
└── src/
    ├── app.js                  ← Entry point — wires all components to the page
    ├── db/
    │   └── cards.js            ← PRIMARY DATABASE — all 53 cards
    ├── api/
    │   └── cardQueries.js      ← All query functions (birth card, compatibility, etc.)
    ├── components/
    │   ├── CardResult.js       ← Shared card rendering helper
    │   ├── BirthCardModal.js   ← Birth card reading modal
    │   ├── CompatibilityModal.js ← Compatibility reading modal
    │   ├── GreetingCardModal.js  ← Greeting card generator modal
    │   ├── GeolocationModal.js   ← Location card reading modal
    │   ├── PullCard.js           ← Oracle "pull a card" feature
    │   └── CardBrowser.js        ← Filterable card gallery
    ├── utils/
    │   └── helpers.js          ← Date, string, DOM, display utilities
    └── styles/
        └── main.css ← Full design system (tokens, components, animations)
```

---

## The Card Database

**`src/db/cards.js`** is the source of truth for all card data.

### Card Object Shape

```js
{
  id:             1,                          // Canonical number 1–53
  name:           "Ace of Hearts",            // Display name
  suit:           "Hearts",                   // Hearts | Clubs | Diamonds | Spades | Joker
  rank:           "Ace",                      // Ace | 2…10 | Jack | Queen | King | Joker
  numericalValue: 1,                          // Used in all calculations (Joker = 0)
  imagePath:      "/images/cards/01_ace_of_hearts.jpg",
  suitSymbol:     "♥",
  suitElement:    "Water",
  suitColor:      "#C0392B",
  suitKeywords:   ["emotion", "love", "intuition", ...],
  keywords:       ["new love", "emotional beginnings", ...],  // Card-level keywords
  affirmation:    "I open my heart to the love...",           // ← REPLACE WITH SHARON'S
  action:         "Write a letter to yourself...",            // ← REPLACE WITH SHARON'S
  description:    "The Ace of Hearts is the seed...",         // ← REPLACE WITH SHARON'S
}
```

### Card Numbering (1–53)

| Range | Suit     | Cards              |
|-------|----------|--------------------|
| 1–13  | Hearts   | Ace through King   |
| 14–26 | Clubs    | Ace through King   |
| 27–39 | Diamonds | Ace through King   |
| 40–52 | Spades   | Ace through King   |
| 53    | Joker    | (excluded from numerology) |

---

## Updating Sharon's Content

Every card in `src/db/cards.js` has three fields awaiting Sharon's voice:

```js
affirmation:  "...",   // The card's affirmation statement
action:       "...",   // A suggested practice or exercise
description:  "...",   // The full card reading / interpretation
```

**To update a card:**
1. Open `src/db/cards.js`
2. Find the card by number (e.g., `card(1, "Ace", "Hearts", ...)`)
3. Replace the placeholder strings with Sharon's content
4. Save — the dev server auto-reloads

**No other files need to change** when updating card content.

---

## Query API

All frontend features call functions from `src/api/cardQueries.js`:

```js
// Lookup
getCardByNumber(n)            // Card 1–52 by id
getCardById(n)                // Card 1–53 by id (includes Joker)
getCardByRankAndSuit(r, s)    // e.g. ("Ace", "Hearts")
getCardsBySuit(suit)          // All cards for one suit
getAllCards()                  // Full 53-card array
getCardBack()                  // { imagePath } for card back image

// Calculations
getBirthCard(dateString)       // → { card, reducedValue, rawSum, steps }
getCompatibilityCard(d1, d2)   // → { card, reducedValue, person1Sum, person2Sum }
getLocationCard(date, name)    // → { card, reducedValue, birthValue, locationValue }
getYearCard(dateString, year)  // → { card, reducedValue }

// Oracle
pullRandomCard()               // Random card 1–52 (Joker excluded)
getCardOfTheDay()              // Deterministic daily card (same for all users each day)
```

### Numerology Algorithm

All calculations follow the same pattern:

1. Sum the components (month + day + digit sum of year)
2. If result > 52: sum the digits again
3. Repeat until result is in range 1–52
4. Query the card at that number

**Birth Card example:**
```
Born: March 15, 1990
Month: 3
Day: 15
Year digits: 1+9+9+0 = 19
Total: 3 + 15 + 19 = 37 → Card #37 (Jack of Diamonds)
```

**Compatibility example:**
```
Person 1 sum: 37
Person 2 sum: 29
Combined: 37 + 29 = 66 → 6+6 = 12 → Card #12 (Queen of Hearts)
```

---

## MVP Features (Phase 1)

| Feature | File | Status |
|---------|------|--------|
| Homepage | `public/index.html` | ✅ Complete |
| Card of the Day | `src/app.js` | ✅ Complete |
| Birth Card modal | `BirthCardModal.js` | ✅ Complete |
| Compatibility modal | `CompatibilityModal.js` | ✅ Complete |
| Greeting Card generator | `GreetingCardModal.js` | ✅ Complete |
| Location Reading modal | `GeolocationModal.js` | ✅ Complete |
| Pull-a-Card oracle | `PullCard.js` | ✅ Complete |
| Card browser / gallery | `CardBrowser.js` + `cards.html` | ✅ Complete |
| Design system | `main.css` | ✅ Complete |
| Card database (53 cards) | `src/db/cards.js` | ✅ Scaffolded — needs Sharon's content |

---

## Phase 2 Roadmap

- [ ] User auth + profile (save readings)
- [ ] Expanded birth card readings (Seeker tier)
- [ ] Composite / relationship card readings
- [ ] Monthly recorded readings by Sharon
- [ ] Email/print greeting card delivery
- [ ] 13 Card Life Path (Magi tier)
- [ ] Spirit Card readings
- [ ] Yearly Card readings
- [ ] Location compatibility (two people + one place)
- [ ] AI-assisted readings (based on Sharon's structured content)
- [ ] Booking integration for live sessions

---

## Design System

All visual tokens live in `src/styles/main.css` as CSS custom properties:

```css
--color-void         Deep background
--color-gold         Primary accent gold
--color-gold-bright  Hover gold
--font-display       Cinzel Decorative (titles)
--font-heading       Cinzel (subheadings, labels)
--font-body          EB Garamond (body text)
--suit-hearts        #D65A5A
--suit-clubs         #52B788
--suit-diamonds      #5B9BD5
--suit-spades        #A47FD0
--suit-joker         #C9A84C
```

---

## Notes for Developers

- The project uses **ES modules** throughout — no bundler required for development (Vite serves them natively)
- Card images are referenced by root-relative paths (`/images/cards/...`) — Vite's `root: 'public'` setting handles this correctly
- All modal components are **self-mounting** — they inject their HTML on first call and are reused on subsequent calls
- The `renderCardResult()` helper in `CardResult.js` is the single source of truth for card display HTML — update it once and all features inherit the change
- `getCardOfTheDay()` is **deterministic** (date-seeded) — same card for all users on the same day, no backend required
- The `pullRandomCard()` oracle uses `Math.random()` — swap for a seeded RNG if reproducible oracle draws are needed in future

---

## IP & Licensing

All card interpretations, affirmations, and textual content are the proprietary intellectual property of Sharon. This codebase is private and unlicensed for external distribution. See the proposal document for partnership terms.

---

*Built with care for Messages from the Magi.*
