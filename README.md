# Messages from the Magi

---

## Overview

**Messages from the Magi** is a digital oracle platform built on Sharon Jeffers' mystic science of the cards — a numerological system that maps identity, timing, and consciousness onto a standard 52-card deck. This repository contains the full frontend and the beginning of the backend infrastructure.

---

## Quick Start

```bash
# Install frontend dependencies
npm install

# Start frontend dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start backend API server
cd server && npm install && npm run dev
```

Requires **Node.js 20+**.

---

## Repository Structure

```
Messages-From-The-Magi/
│
├── public/                         ← HTML pages (one per route)
│   ├── index.html                  ← Home
│   ├── readings.html               ← Readings menu
│   ├── explore.html                ← Explore the system
│   ├── oracle.html                 ← Pull-a-card oracle
│   ├── videos.html                 ← Video content library
│   ├── join.html                   ← Membership tiers
│   ├── shop.html                   ← Shop
│   ├── about.html                  ← About Sharon + contact
│   ├── account.html                ← User profile
│   └── images/
│       ├── bg-*.png                ← Page background images
│       ├── cards/                  ← 53 card images
│       └── util/                   ← Card back images
│
├── src/
│   ├── styles/
│   │   └── main.css                ← Design system (tokens, base, shared components)
│   │
│   ├── pages/                      ← One directory per page
│   │   ├── Home/                   home.js + home.css
│   │   ├── Readings/               readings.js + readings.css
│   │   ├── Explore/                explore.js + explore.css
│   │   ├── Oracle/                 oracle.js
│   │   ├── Videos/                 videos.js + videos.css
│   │   ├── Join/                   join.js + join.css
│   │   ├── Shop/                   shop.js + shop.css
│   │   ├── About/                  about.js + about.css
│   │   └── Account/                account.js + account.css
│   │
│   ├── components/                 ← Shared UI components (JS + CSS co-located)
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Cosmos/                 ← Starfield canvas animation
│   │   ├── PageAnimations/         ← Scroll-triggered reveal animations
│   │   ├── PageBackground/         ← Full-viewport background image component
│   │   ├── CardResult/             ← Shared card display
│   │   ├── Cart/
│   │   ├── AuthModals/
│   │   ├── GreetingCard/
│   │   └── ui/                     ← Button, Form, Modal, LoadingSpinner, SelectionChip
│   │
│   ├── api/
│   │   └── cardQueries.js          ← All card lookup + calculation functions
│   │
│   ├── auth/
│   │   ├── AuthStore.js
│   │   ├── SavedReadings.js
│   │   └── requireAuth.js
│   │
│   ├── cart/
│   │   └── CartStore.js
│   │
│   └── db/
│       └── cards.js                ← Client-side card database (53 cards)
│
├── server/                         ← Express API backend
│   ├── index.js                    ← Entry point
│   └── routes/                     ← API route handlers
│
├── vite.config.js
├── vercel.json
└── package.json
```

---

## Page Conventions

Every page follows the same structure:

- **HTML** — `public/[page].html` — `body` carries a `[page]-page` class, animation delay vars are the only inline styles
- **CSS** — `src/pages/[Page]/[page].css` — imported in the JS; contains the background rule + BEM component classes
- **JS** — `src/pages/[Page]/[page].js` — imports CSS, initializes header, footer, cosmos, animations

**Background pattern (every page):**
```css
html:has(.[page]-page) {
  background-image: url("/images/bg-[page].png");
  background-position: center;
  background-size: cover;
}

.[page]-page {
  background: transparent !important;
}
```

---

## Card Database

**`src/db/cards.js`** — client-side source of truth for all 53 cards.

### Card Object Shape

```js
{
  id:             1,
  name:           "Ace of Hearts",
  suit:           "Hearts",               // Hearts | Clubs | Diamonds | Spades | Joker
  rank:           "Ace",
  numericalValue: 1,                      // Joker = 0
  imagePath:      "/images/cards/01_ace_of_hearts.jpg",
  suitSymbol:     "♥",
  suitElement:    "Water",
  suitKeywords:   ["emotion", "love", "intuition"],
  keywords:       ["new love", "emotional beginnings"],
  affirmation:    "...",                  // ← Sharon's content
  action:         "...",                  // ← Sharon's content
  description:    "...",                  // ← Sharon's content
}
```

### Card Numbering

| Range | Suit     |
|-------|----------|
| 1–13  | Hearts   |
| 14–26 | Clubs    |
| 27–39 | Diamonds |
| 40–52 | Spades   |
| 53    | Joker    |

---

## Query API (`src/api/cardQueries.js`)

```js
// Lookup
getCardByNumber(n)
getCardByRankAndSuit(rank, suit)
getCardsBySuit(suit)
getAllCards()

// Calculations
getBirthCard(dateString)           // → { card, reducedValue, rawSum, steps }
getCompatibilityCard(d1, d2)       // → { card, reducedValue }
getLocationCard(date, locationName)
getYearCard(dateString, year)

// Oracle
pullRandomCard()                   // Random card 1–52
getCardOfTheDay()                  // Deterministic daily card — same for all users
```

### Numerology Algorithm

1. Sum components (month + day + digit-sum of year)
2. If result > 52: sum the digits
3. Repeat until 1–52
4. Look up card at that number

---

## Current Status

| Page / Feature | Status |
|---|---|
| All 9 pages — HTML, CSS, JS | ✅ Complete |
| Design system (`main.css`) | ✅ Complete |
| Page backgrounds per route | ✅ Complete |
| BEM component structure per page | ✅ Complete |
| Header + footer components | ✅ Complete |
| Cosmos starfield animation | ✅ Complete |
| Scroll-triggered animations | ✅ Complete |
| Birth card modal | ✅ Complete |
| Compatibility modal | ✅ Complete |
| Greeting card modal | ✅ Complete |
| Location reading modal | ✅ Complete |
| Pull-a-card oracle | ✅ Complete |
| Card database (53 cards) | ✅ Scaffolded — awaiting Sharon's content |
| Shop grid + cart | ✅ Complete |
| User auth (Clerk) | 🔧 Wired — needs server-side route protection |
| PostgreSQL backend | 🔲 Not provisioned |
| REST API | 🔲 Not built |

---

## Build Roadmap

**Priority order — ship in sequence:**

1. **Finish auth** — protect routes server-side via Clerk session verification
2. **Provision PostgreSQL** — create `users` and `cards` tables
3. **Build admin tool** — start entering Sharon's card data
4. **`/api/birthcard` endpoint** — test in Postman
5. **Wire birth card frontend** — first real end-to-end feature
6. **`/api/daily` and `/api/compatibility`** — test + wire frontend
7. **`/api/user/profile`** — save birth date persistently
8. **YouTube table** — wire video content section
9. **Greeting card** — server-side image generation
10. **Stripe checkout + webhook** — wire course access
11. **Store** — Shopify Buy Button or Stripe cart
12. **Staging environment** — full end-to-end test
13. **Launch**

---

## Design System

All tokens in `src/styles/main.css`:

```css
--color-void         /* Deep background */
--color-gold         /* Primary accent */
--font-display       /* Cinzel Decorative — display titles */
--font-heading       /* Cinzel — subheadings, labels */
--font-body          /* EB Garamond — body text */
--suit-hearts        #D65A5A
--suit-clubs         #52B788
--suit-diamonds      #5B9BD5
--suit-spades        #A47FD0
```

---

## IP & Licensing

All card interpretations, affirmations, and written content are the proprietary intellectual property of Sharon Jeffers. This repository is private and unlicensed for external distribution.
