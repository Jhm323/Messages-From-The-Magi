/**
 * GreetingCardModal
 * Collects name + birthdate + personal message → renders a printable greeting card
 * with the recipient's birth card image, affirmation, and message.
 */

import { getBirthCard } from "../api/cardQueries.js";

const MODAL_ID = "modal-greeting";

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal" style="max-width:640px;">
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
        <label class="form-label" for="${MODAL_ID}-date">Recipient's Birthdate</label>
        <input class="form-input" id="${MODAL_ID}-date" type="date" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-occasion">Occasion</label>
        <input class="form-input" id="${MODAL_ID}-occasion" type="text" placeholder="e.g. Birthday, New Year, Just Because…">
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
<div class="greeting-card card-display card-display--${suitClass(card.suit)} animate-fade-up" id="${MODAL_ID}-printable">
  <div style="margin-bottom:1.5rem;">
    <div class="greeting-card__from">A card for</div>
    <div class="greeting-card__recipient">${name}</div>
    ${occasion ? `<div style="font-family:var(--font-heading);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">on the occasion of their ${occasion}</div>` : ""}
  </div>

  <div class="card-image-wrap" style="max-width:200px;margin:0 auto 1.5rem;">
    <img src="${card.imagePath}" alt="${card.name}" loading="lazy">
  </div>

  <div style="font-family:var(--font-heading);font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-dawn);margin-bottom:0.25rem;">Your Birth Card</div>
  <div class="card-name" style="color:var(--color-gold);font-size:1.2rem;margin-bottom:0.25rem;">${card.name}</div>
  <div style="font-size:1.4rem;margin-bottom:1rem;">${card.suitSymbol}</div>

  <div class="card-keywords">
    ${card.keywords.slice(0,3).map(k => `<span class="card-keyword-tag">${k}</span>`).join("")}
  </div>

  <div class="card-affirmation" style="margin:1rem 0;">
    "${card.affirmation}"
  </div>

  ${message ? `
  <div class="divider--glyph">✦</div>
  <div class="greeting-card__message" style="margin:1rem 0;">"${message}"</div>
  ` : ""}

  ${from ? `
  <div style="font-family:var(--font-heading);font-size:0.78rem;letter-spacing:0.1em;color:var(--color-dawn);margin-top:1rem;">
    With love, ${from}
  </div>
  ` : ""}

  <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--color-gold-muted);font-family:var(--font-heading);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">
    Messages from the Magi · Cards of Destiny
  </div>
</div>`;
}

function ensureModal() {
  if (document.getElementById(MODAL_ID)) return;
  document.body.insertAdjacentHTML("beforeend", buildHTML());

  const overlay = document.getElementById(MODAL_ID);
  const errEl   = document.getElementById(`${MODAL_ID}-error`);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.dataset.close !== undefined) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
  });

  document.getElementById(`${MODAL_ID}-submit`).addEventListener("click", () => {
    const name     = document.getElementById(`${MODAL_ID}-name`).value.trim();
    const date     = document.getElementById(`${MODAL_ID}-date`).value;
    const occasion = document.getElementById(`${MODAL_ID}-occasion`).value.trim();
    const message  = document.getElementById(`${MODAL_ID}-message`).value.trim();
    const from     = document.getElementById(`${MODAL_ID}-from`).value.trim();

    errEl.style.display = "none";

    if (!name) { showError("Please enter the recipient's name."); return; }
    if (!date) { showError("Please enter the recipient's birthdate."); return; }

    const result = getBirthCard(date);
    if (!result || !result.card) {
      showError("Could not calculate the birth card. Please check the date.");
      return;
    }

    const output = document.getElementById(`${MODAL_ID}-card-output`);
    output.innerHTML = renderGreetingCard({ name, occasion, message, from, card: result.card });

    document.getElementById(`${MODAL_ID}-step-form`).style.display   = "none";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "block";
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
    document.getElementById(`${MODAL_ID}-step-form`).style.display   = "block";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "none";
  }
}

function close() {
  const el = document.getElementById(MODAL_ID);
  if (el) el.classList.remove("is-open");
}

export function openGreetingCardModal() {
  ensureModal();
  document.getElementById(MODAL_ID).classList.add("is-open");
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
