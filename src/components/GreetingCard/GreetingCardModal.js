/**
 * GreetingCardModal
 * Collects name + birthdate + personal message → renders a printable greeting card
 * with the recipient's birth card image, affirmation, and message.
 */

import "./GreetingCardModal.css";
import { mountModal, openModal } from "../ui/Modal/Modal.js";
import '../ui/Button/Button.js';
import '../ui/Form/Form.js';
import '../ui/SelectionChip/SelectionChip.js';
import { getBirthCard } from "../../api/cardQueries.js";
import { buildBirthdateSelects } from "../../utils/helpers.js";
import { getUser, isLoggedIn }   from "../../auth/AuthStore.js";

const MODAL_ID = "modal-greeting";

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal modal--fullscreen">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Create a Greeting Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${MODAL_ID}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter the recipient's details to generate a personalized card drawn from their birth card energy.
      </p>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-name">Recipient's Name</label>
        <input class="form-input" id="${MODAL_ID}-name" type="text" placeholder="e.g. Sarah" required>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient's Birthdate</label>
        ${buildBirthdateSelects(`${MODAL_ID}-month`, `${MODAL_ID}-day`)}
      </div>
      <div class="form-group">
        <label class="form-label">Occasion</label>
        <div class="chip-group" id="${MODAL_ID}-occasion-chips" style="margin-bottom:0.6rem;">
          <button class="chip" data-value="Birthday">🎂 Birthday</button>
          <button class="chip" data-value="Anniversary">♥ Anniversary</button>
          <button class="chip" data-value="New Year">✦ New Year</button>
          <button class="chip" data-value="Celebration">★ Celebration</button>
          <button class="chip" data-value="Just Because">Just Because</button>
        </div>
        <input class="form-input" id="${MODAL_ID}-occasion" type="text" placeholder="or type your own…">
      </div>
      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-message">Your Personal Message</label>
        <textarea class="form-input" id="${MODAL_ID}-message" rows="3"
          placeholder="Write your message here…"
          style="resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-from">From</label>
        <input class="form-input" id="${MODAL_ID}-from" type="text" placeholder="Your name">
      </div>

      <div id="${MODAL_ID}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${MODAL_ID}-submit" style="width:100%;">
        ✦ Generate Card
      </button>
    </div>

    <!-- STEP 2: Card Display -->
    <div id="${MODAL_ID}-step-result" style="display:none;">
      <div id="${MODAL_ID}-card-output"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--secondary" id="${MODAL_ID}-print" style="flex:1;">
          🖨 Print Card
        </button>
        <button class="btn btn--ghost" id="${MODAL_ID}-again" style="flex:1;">
          ← New Card
        </button>
      </div>
      <p style="color:var(--color-mist);font-size:0.78rem;text-align:center;margin-top:0.75rem;">
        Email integration coming soon (Tier 2)
      </p>
    </div>
  </div>
</div>`;
}

function suitClass(suit) {
  return suit.toLowerCase();
}

function renderGreetingCard({ name, occasion, message, from, card }) {
  return `
<div class="greeting-reveal-wrapper">

  <!-- Cover: Mystic Oracle card shows first, then melts away -->
  <div class="greeting-cover" id="${MODAL_ID}-cover">
    <img src="/images/util/card_back.jpg" alt="The Mystic Oracle" class="greeting-cover__img">
  </div>

  <!-- Content: fades in after cover melts -->
  <div class="greeting-content" id="${MODAL_ID}-content">
    <div class="greeting-card card-display card-display--${suitClass(card.suit)}" id="${MODAL_ID}-printable">

      <div style="margin-bottom:0.75rem;">
        <div class="greeting-card__from">A card for</div>
        <div class="greeting-card__recipient" style="font-size:1.6rem;margin-bottom:0.25rem;">${name}</div>
        ${occasion ? `<div style="font-family:var(--font-heading);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">on the occasion of their ${occasion}</div>` : ""}
      </div>

      <div style="font-family:var(--font-heading);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-dawn);margin-bottom:0.2rem;">Your Birth Card</div>
      <div class="card-name" style="color:var(--color-gold);font-size:1.4rem;margin-bottom:0.2rem;">${card.name}</div>
      <div style="font-size:1.4rem;margin-bottom:0.5rem;">${card.suitSymbol}</div>

      <div class="card-keywords" style="margin-bottom:0.5rem;">
        ${card.keywords.map((k) => `<span class="card-keyword-tag">${k}</span>`).join("")}
      </div>

      <div class="card-affirmation" style="margin:0.5rem 0;font-size:1rem;padding:0.75rem 1rem;">
        "${card.affirmation}"
      </div>

      <div class="card-description" style="font-size:0.95rem;margin:0.5rem 0;line-height:1.7;text-align:center;color:var(--color-light);">
        ${card.description}
      </div>

      <div class="card-action-prompt" style="margin:0.5rem 0;">
        <strong>✦ Your Practice</strong>
        ${card.action}
      </div>

      ${
        message
          ? `
      <div class="divider--glyph" style="margin:0.75rem 0;">✦</div>
      <div class="greeting-card__message" style="margin:0.5rem 0;font-size:1.05rem;">"${message}"</div>
      `
          : ""
      }

      ${
        from
          ? `
      <div style="font-family:var(--font-heading);font-size:0.85rem;letter-spacing:0.1em;color:var(--color-dawn);margin-top:0.5rem;">
        With love, ${from}
      </div>
      `
          : ""
      }

      <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--color-gold-muted);font-family:var(--font-heading);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">
        Messages from the Magi
      </div>

    </div>

    <button class="greeting-replay-btn" id="${MODAL_ID}-replay" style="margin-top:1rem;">↺ Replay</button>
  </div>

</div>`;
}

function ensureModal() {
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  const errEl = document.getElementById(`${MODAL_ID}-error`);

  // Occasion chips → populate text input
  const occasionInput = document.getElementById(`${MODAL_ID}-occasion`);
  const occasionChips = overlay.querySelectorAll(`#${MODAL_ID}-occasion-chips .chip`);
  occasionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      occasionChips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      occasionInput.value = chip.dataset.value;
    });
  });
  occasionInput.addEventListener('input', () => {
    occasionChips.forEach(c => c.classList.remove('is-active'));
  });

  document
    .getElementById(`${MODAL_ID}-submit`)
    .addEventListener("click", () => {
      const name     = document.getElementById(`${MODAL_ID}-name`).value.trim();
      const month    = document.getElementById(`${MODAL_ID}-month`).value;
      const day      = document.getElementById(`${MODAL_ID}-day`).value;
      const occasion = document.getElementById(`${MODAL_ID}-occasion`).value.trim();
      const message  = document.getElementById(`${MODAL_ID}-message`).value.trim();
      const from     = document.getElementById(`${MODAL_ID}-from`).value.trim();

      errEl.style.display = "none";

      if (!name) {
        showError("Please enter the recipient's name.");
        return;
      }
      if (!month || !day) {
        showError("Please select the recipient's birth month and day.");
        return;
      }

      const result = getBirthCard(`${month}/${day}`);
      if (!result || !result.card) {
        showError("Could not calculate the birth card. Please check the date.");
        return;
      }

      const output = document.getElementById(`${MODAL_ID}-card-output`);
      output.innerHTML = renderGreetingCard({
        name,
        occasion,
        message,
        from,
        card: result.card,
      });

      // Wire up replay button after rendering
      document
        .getElementById(`${MODAL_ID}-replay`)
        .addEventListener("click", () => {
          const cover = document.getElementById(`${MODAL_ID}-cover`);
          const content = document.getElementById(`${MODAL_ID}-content`);
          // Reset animations by removing, forcing reflow, re-adding
          cover.style.animation = "none";
          content.style.animation = "none";
          content.style.opacity = "0";
          // Force reflow
          void cover.offsetWidth;
          cover.style.animation = "";
          content.style.animation = "";
        });

      document.getElementById(`${MODAL_ID}-step-form`).style.display = "none";
      document.getElementById(`${MODAL_ID}-step-result`).style.display =
        "block";
    });

  document.getElementById(`${MODAL_ID}-again`).addEventListener("click", reset);

  document.getElementById(`${MODAL_ID}-print`).addEventListener("click", () => {
    window.print();
  });

  function showError(msg) {
    errEl.textContent = msg;
    errEl.style.display = "block";
  }

  function reset() {
    document.getElementById(`${MODAL_ID}-step-form`).style.display = "block";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "none";
  }
}

function prefillUserData() {
  if (!isLoggedIn()) return;
  const user = getUser();
  // "From" is the logged-in user; recipient name/date are intentionally left blank
  const fromEl = document.getElementById(`${MODAL_ID}-from`);
  if (fromEl) fromEl.value = user.name ?? '';
}

export function openGreetingCardModal() {
  ensureModal();
  openModal(MODAL_ID);
  prefillUserData();
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
