# Claude Code — Project Instructions

## Project Overview

Messages from the Magi is a digital oracle platform built on Sharon Jeffers' mystic science of the cards. Stack: Vite frontend (vanilla JS, BEM CSS), Express backend, PostgreSQL, Clerk auth, Stripe payments, deployed on Vercel (frontend) and Railway (backend).

---

## Code Style

### Comments

- Do not use decorative ASCII divider comments such as `// ─────────────────`, `/* ── Section Name ──────────── */`, or any variation using `─` or repeated dashes as visual separators
- Use plain comments (`// State`, `/* Header */`) or no comment at all
- JSDoc blocks (`/** ... */`) on exported functions are encouraged
- Do not leave commented-out dead code in files — delete it

### CSS

- Follow BEM naming throughout: `block__element--modifier`
- All font sizes must be written in px — never rem, em, or unitless values
- All spacing values (padding, margin, gap) must be written in px — never rem or em
- BEM naming is mandatory for all classes: `block__element--modifier` — no exceptions, no utility classes outside of `main.css`
- Never write a CSS rule that could be expressed as a BEM modifier as a one-off override instead
- When in doubt, follow MDN and the BEM official methodology as the authoritative references
- Do not write inline `style="..."` attributes in JS or HTML — use BEM classes and CSS instead
- All design tokens (colors, fonts, radii, spacing) must use CSS variables from `src/styles/main.css`
- Do not hardcode color values, font names, or size values inline
- CSS for a component lives in its co-located CSS file, not in `main.css`
- Shared utility classes belong in `main.css`
- When adding a CSS modifier (e.g. `--compact`, `--featured`), add it to the component's own CSS file

### JavaScript

- Do not duplicate functions across files — extract shared logic to a utility module
- Do not call `localStorage.getItem` repeatedly in a single module — cache in memory on load (see `AuthStore.js` as the pattern)
- Use `Set` for listener collections, not arrays (consistent with `AuthStore.js`)
- All stores follow the singleton pattern established in `AuthStore.js` and `CartStore.js`
- Do not call `dotenv.config()` in any file other than `server/index.js`
- Do not leave unused exported functions in place — delete them

### HTML

- Do not use inline `style="..."` attributes except for CSS custom property values passed as animation delay vars (e.g. `style="--hi:0"`) — these are intentional
- Animation delay vars (`--hi`, `--ri`, `--pi`) on HTML elements are the only permitted inline styles

---

## Architecture

### File Structure

- One page = one directory under `src/pages/[Page]/` containing `[page].js` and `[page].css`
- Page HTML lives in `public/[page].html`
- Shared components live in `src/components/` with JS and CSS co-located
- Shared utility functions live in `src/utils/helpers.js`
- Card lookup and calculation functions live in `src/api/cardQueries.js` — do not duplicate these elsewhere
- Auth logic lives in `src/auth/`
- Cart logic lives in `src/cart/`

### Components

- Modals use the `mountModal` / `openModal` / `closeModal` pattern from `src/components/ui/Modal/Modal.js`
- Shared modal utilities (resetSaveBtn, markSaved, showError, prefillUserData) live in `src/components/ui/Modal/modalHelpers.js`
- Do not re-implement these per modal — import from `modalHelpers.js`

### Asset Paths

- Card images: `/assets/cards/`
- Card back images: `/assets/util/`
- Background images: `/images/bg-[page].png`
- Do not use `/images/cards/` or `/images/util/` — these are incorrect paths

### Backend

- Server entry point is `server/index.js` — this is where `dotenv.config()` is called
- API routes go in `server/routes/`
- Middleware goes in `server/middleware/`
- All protected routes use the Clerk auth middleware from `server/middleware/auth.js`
- Database pool is in `server/db/index.js` — do not create additional pool instances

---

## Conventions

### Naming

- Page entry point files are named `[page].js` and live at `src/pages/[Page]/[page].js`
- There is no global `app.js` — the home page entry is `src/pages/Home/home.js`
- Modal IDs follow the pattern `modal-[feature]` (e.g. `modal-birthcard`, `modal-compatibility`)
- Element IDs within modals follow `${MODAL_ID}-[element]` (e.g. `modal-birthcard-submit`)

### Card Data

- The authoritative card database is `src/db/cards.js`
- The authoritative calculation functions are in `src/api/cardQueries.js`
- `locationNameValue` is defined and exported only in `cardQueries.js` — do not redefine it in helpers
- The Joker (card 53) is excluded from all numerological calculations
- `pullRandomCard()` pulls from 1–52 only — never include 53

### Saved Readings

- Readings are saved via `saveReading()` from `src/auth/SavedReadings.js`
- All reading types except Pull-a-Card oracle saves are saved to the user's account
- Reading types: `'birth-card'` | `'compatibility'` | `'geolocation'` | `'greeting-card'`

---

## What Not To Build

- Do not add Stripe or payment logic until the backend API and PostgreSQL are fully provisioned
- Do not add YouTube embed logic until the Substack and Big Cartel tasks are complete
- Do not add new pages without a corresponding entry in `vite.config.js` and `public/[page].html`
- Do not install new npm packages without flagging it first — keep dependencies minimal
