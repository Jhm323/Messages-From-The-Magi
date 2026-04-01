/**
 * GeolocationModal
 * Calculates the card that governs the relationship between
 * a person and a specific location.
 *
 * Algorithm:
 *   1. Calculate birth card value from birthdate (month + day + digitSum(year))
 *   2. Calculate location value: sum of letter positions (A=1…Z=26), spaces ignored
 *   3. Add both values → reduce to 1–52 → query card
 */

import { getLocationCard } from "../api/cardQueries.js";
import { renderCardResult } from "./CardResult.js";

const MODAL_ID = "modal-geolocation";

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${MODAL_ID}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Every place carries an energetic signature. This reading reveals how a specific location
        interacts with your personal cards — ideal for travel, relocation, or understanding why
        certain places feel the way they do.
      </p>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-name">Your Name</label>
        <input class="form-input" id="${MODAL_ID}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-date">Your Birthdate</label>
        <input class="form-input" id="${MODAL_ID}-date" type="date" required>
      </div>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-location">Location</label>
        <input class="form-input" id="${MODAL_ID}-location" type="text"
          placeholder="e.g. New York, Paris, Sedona, Tokyo…"
          autocomplete="off" required>
        <span class="form-hint">City, country, or any place name</span>
      </div>

      <div id="${MODAL_ID}-error" role="alert"
        style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${MODAL_ID}-submit" style="width:100%;">
        ✦ Reveal My Location Card
      </button>
    </div>

    <!-- STEP 2: Result -->
    <div id="${MODAL_ID}-step-result" style="display:none;">
      <div id="${MODAL_ID}-result-container"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--ghost" id="${MODAL_ID}-again" style="flex:1;">
          ← Try Another Location
        </button>
      </div>
    </div>
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

  document.getElementById(`${MODAL_ID}-submit`).addEventListener("click", handleSubmit);
  document.getElementById(`${MODAL_ID}-again`).addEventListener("click", reset);

  function handleSubmit() {
    const name     = document.getElementById(`${MODAL_ID}-name`).value.trim() || "Seeker";
    const date     = document.getElementById(`${MODAL_ID}-date`).value;
    const location = document.getElementById(`${MODAL_ID}-location`).value.trim();

    errEl.style.display = "none";

    if (!date)     { showError("Please enter your birthdate."); return; }
    if (!location) { showError("Please enter a location name."); return; }

    const result = getLocationCard(date, location);
    if (!result || !result.card) {
      showError("Could not calculate the location card. Please check your inputs.");
      return;
    }

    const container = document.getElementById(`${MODAL_ID}-result-container`);
    container.innerHTML = renderCardResult(result.card, {
      eyebrow:         `${name} · ${location}`,
      subheading:      "Your Location Card",
      showAffirmation: true,
      showAction:      true,
      showDescription: true,
      extra: `
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${result.birthValue} + Location value ${result.locationValue}
          = Card #${result.reducedValue}
        </div>`,
    });

    document.getElementById(`${MODAL_ID}-step-form`).style.display   = "none";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "block";
  }

  function reset() {
    document.getElementById(`${MODAL_ID}-step-form`).style.display   = "block";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "none";
  }

  function showError(msg) {
    errEl.textContent   = msg;
    errEl.style.display = "block";
  }
}

function close() {
  document.getElementById(MODAL_ID)?.classList.remove("is-open");
}

export function openGeolocationModal() {
  ensureModal();
  document.getElementById(MODAL_ID).classList.add("is-open");
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
