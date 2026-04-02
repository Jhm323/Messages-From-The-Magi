/**
 * GeolocationModal — Reveal the card governing a person + location.
 */

import { mountModal, openModal } from './ui/Modal.js';
import { getLocationCard } from '../api/cardQueries.js';
import { renderCardResult } from './CardResult.js';

const MODAL_ID = 'modal-geolocation';

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

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
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  const errEl = document.getElementById(`${MODAL_ID}-error`);

  document.getElementById(`${MODAL_ID}-submit`).addEventListener('click', () => {
    const name     = document.getElementById(`${MODAL_ID}-name`).value.trim() || 'Seeker';
    const date     = document.getElementById(`${MODAL_ID}-date`).value;
    const location = document.getElementById(`${MODAL_ID}-location`).value.trim();

    errEl.style.display = 'none';

    if (!date)     { showError('Please enter your birthdate.'); return; }
    if (!location) { showError('Please enter a location name.'); return; }

    const result = getLocationCard(date, location);
    if (!result || !result.card) {
      showError('Could not calculate the location card. Please check your inputs.');
      return;
    }

    document.getElementById(`${MODAL_ID}-result-container`).innerHTML = renderCardResult(result.card, {
      eyebrow:         `${name} · ${location}`,
      subheading:      'Your Location Card',
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

    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'none';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'block';
  });

  document.getElementById(`${MODAL_ID}-again`).addEventListener('click', () => {
    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'block';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'none';
  });

  function showError(msg) {
    errEl.textContent   = msg;
    errEl.style.display = 'block';
  }
}

export function openGeolocationModal() {
  ensureModal();
  openModal(MODAL_ID);
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
