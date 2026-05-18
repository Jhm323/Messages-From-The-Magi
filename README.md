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

Frontend requires **Node.js 20+**. Server requires **Node.js 18+**.

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
│   └── assets/
│       ├── cards/                  ← 53 card images (01_ace_of_hearts.jpg … 53_joker.jpg)
│       ├── util/                   ← Card back images (card_back.jpg, card_back_alt.jpg)
│       └── star.svg
│
├── src/
│   ├── styles/
│   │   └── main.css                ← Design system (tokens, base, shared components)
│   │
│   ├── pages/                      ← One directory per page
│   │   ├── Home/                   home.js + home.css
│   │   ├── Readings/               readings.js + readings.css
│   │   ├── Explore/                explore.js + explore.css
│   │   ├── Oracle/                 oracle.js + oracle.css
│   │   ├── Videos/                 videos.js + videos.css
│   │   ├── Join/                   join.js + join.css
│   │   ├── Shop/                   shop.js + shop.css
│   │   ├── About/                  about.js + about.css
│   │   └── Account/                account.js + account.css
│   │
│   ├── components/                 ← Shared UI components
│   │   ├── Header/                 Header.js + Header.css
│   │   ├── Footer/                 Footer.js + Footer.css
│   │   ├── PageAnimations/         Scroll-triggered reveal animations
│   │   ├── AuthModals/             AuthModals.js + AuthModals.css
│   │   ├── CardResult/             Shared card display component
│   │   ├── Cart/                   Cart.js + Cart.css
│   │   ├── GreetingCard/           GreetingCardModal.js + GreetingCardModal.css
│   │   ├── BirthCardModal.js       ← Birth card reading modal
│   │   ├── CompatibilityModal.js   ← Compatibility reading modal
│   │   ├── GeolocationModal.js     ← Location reading modal
│   │   ├── PullCard.js             ← Pull-a-card oracle component
│   │   ├── CardBrowser.js          ← Full card deck browser
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
│   ├── db/
│   │   └── cards.js                ← Client-side card database (53 cards)
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   └── app.js                      ← App entry point
│
├── server/                         ← Express API backend (deployed on Railway)
│   ├── index.js                    ← Entry point (port 4000)
│   ├── railway.json                ← Railway deployment config
│   ├── .env.example
│   ├── db/
│   │   ├── index.js                ← pg pool setup
│   │   └── schema.sql              ← PostgreSQL schema (users, cards, card_meanings, birth_card_rules)
│   ├── middleware/
│   │   ├── auth.js                 ← Clerk session verification
│   │   └── rateLimit.js            ← express-rate-limit config
│   └── routes/
│       └── health.js               ← GET /health (DB connectivity check)
│
├── scripts/
│   └── rotate-cards.mjs            ← One-time utility: batch-rotated card images using sharp
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
- **JS** — `src/pages/[Page]/[page].js` — imports CSS, initializes header, footer, animations

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
  imagePath:      "/assets/cards/01_ace_of_hearts.jpg",
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
| ----- | -------- |
| 1–13  | Hearts   |
| 14–26 | Clubs    |
| 27–39 | Diamonds |
| 40–52 | Spades   |
| 53    | Joker    |

---

## Query API (`src/api/cardQueries.js`)

```js
// Lookup
getCardByNumber(n);
getCardByRankAndSuit(rank, suit);
getCardsBySuit(suit);
getAllCards();

// Calculations
getBirthCard(dateString); // → { card, reducedValue, rawSum, steps }
getCompatibilityCard(d1, d2); // → { card, reducedValue }
getLocationCard(date, locationName);
getYearCard(dateString, year);

// Oracle
pullRandomCard(); // Random card 1–52
getCardOfTheDay(); // Deterministic daily card — same for all users
```

### Numerology Algorithm

1. Sum components (month + day + digit-sum of year)
2. If result > 52: sum the digits
3. Repeat until 1–52
4. Look up card at that number

---

## Backend (`server/`)

The Express server runs on port 4000 and is deployed via **Railway** (`railway.json`). Current middleware stack: Helmet, CORS, express-rate-limit, Clerk auth verification.

### Database Schema (`server/db/schema.sql`)

Four tables:

- **`users`** — Clerk user ID (text PK), email, birth_date, subscription_tier
- **`cards`** — id, name, number, suit, symbol, image_url
- **`card_meanings`** — per-card meanings scoped to context (`birth` | `daily` | `compatibility` | `spread`)
- **`birth_card_rules`** — month + day range → card lookup table

### Live Routes

| Method | Path    | Description                       |
| ------ | ------- | --------------------------------- |
| GET    | /health | DB connectivity check + timestamp |

All other API routes are not yet built.

---

## Current Status

| Page / Feature                               | Status                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------- |
| All 9 pages — HTML, CSS, JS                  | ✅ Complete                                                                             |
| Design system (`main.css`)                   | ✅ Complete                                                                             |
| Page backgrounds per route                   | ✅ Complete                                                                             |
| BEM component structure per page             | ✅ Complete                                                                             |
| Header + footer components                   | ✅ Complete                                                                             |
| Scroll-triggered animations                  | ✅ Complete                                                                             |
| Birth card modal                             | ✅ Complete                                                                             |
| Compatibility modal                          | ✅ Complete                                                                             |
| Greeting card modal                          | ✅ Complete                                                                             |
| Location reading modal                       | ✅ Complete                                                                             |
| Pull-a-card oracle                           | ✅ Complete                                                                             |
| Card browser                                 | ✅ Complete                                                                             |
| Card database (53 cards)                     | ✅ Scaffolded — awaiting Sharon's content                                               |
| Shop grid + cart                             | ✅ Complete                                                                             |
| Server — health route, middleware, DB schema | ✅ Complete                                                                             |
| User auth (Clerk)                            | 🔧 Wired frontend — server-side verification middleware exists but routes not protected |
| PostgreSQL backend                           | 🔲 Schema written, not provisioned                                                      |
| REST API routes                              | 🔲 Not built (only /health exists)                                                      |

---

## Build Roadmap

**Priority order — ship in sequence:**

1. **Provision PostgreSQL** — deploy schema, wire `server/db/index.js` to real DB
2. **Protect routes server-side** — apply Clerk middleware to auth-required endpoints
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

Copyright © 2025 Sharon Jeffers. All rights reserved.

This repository is source-available for review and collaboration purposes only. It is not open source. You may not copy, modify, distribute, or use any portion of this codebase for commercial or non-commercial purposes without prior written permission.

All card interpretations, affirmations, descriptions, and written content are the exclusive intellectual property of Sharon Jeffers and are protected under applicable copyright law.
