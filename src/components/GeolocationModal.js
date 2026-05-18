/**
 * GeolocationModal — Reveal the card governing a person + location.
 */

import { mountModal, openModal } from './ui/Modal/Modal.js';
import './ui/Button/Button.js';
import './ui/Form/Form.js';
import { getLocationCard } from '../api/cardQueries.js';
import { renderCardResult } from './CardResult/CardResult.js';
import { buildBirthdateSelects } from '../utils/helpers.js';
import { getUser, isLoggedIn }   from '../auth/AuthStore.js';
import { saveReading }           from '../auth/SavedReadings.js';
import { resetSaveBtn, markSaved, showError, hideError, prefillUserData } from './ui/Modal/modalHelpers.js';

const MODAL_ID = 'modal-geolocation';

let _pending = null;

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
        <label class="form-label">Your Birthdate</label>
        ${buildBirthdateSelects(`${MODAL_ID}-month`, `${MODAL_ID}-day`)}
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
      <button class="btn btn--ghost" id="${MODAL_ID}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${MODAL_ID}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`;
}

function ensureModal() {
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  document.getElementById(`${MODAL_ID}-submit`).addEventListener('click', () => {
    const name     = document.getElementById(`${MODAL_ID}-name`).value.trim() || 'Seeker';
    const month    = document.getElementById(`${MODAL_ID}-month`).value;
    const day      = document.getElementById(`${MODAL_ID}-day`).value;
    const location = document.getElementById(`${MODAL_ID}-location`).value.trim();

    hideError(MODAL_ID);

    if (!month || !day) { showError(MODAL_ID, 'Please select your birth month and day.'); return; }
    if (!location)      { showError(MODAL_ID, 'Please enter a location name.'); return; }

    const result = getLocationCard(`${month}/${day}`, location);
    if (!result || !result.card) {
      showError(MODAL_ID, 'Could not calculate the location card. Please check your inputs.');
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

    _pending = { card: result.card, eyebrow: `${name} · ${location}`, location };
    resetSaveBtn(MODAL_ID);

    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'none';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'block';
  });

  document.getElementById(`${MODAL_ID}-again`).addEventListener('click', () => {
    _pending = null;
    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'block';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'none';
  });

  document.getElementById(`${MODAL_ID}-save`).addEventListener('click', () => {
    const msgEl = document.getElementById(`${MODAL_ID}-save-msg`);
    if (!isLoggedIn()) {
      msgEl.textContent = 'Sign in to save your readings.';
      msgEl.style.color = 'var(--color-gold-muted)';
      return;
    }
    if (!_pending) return;
    saveReading({
      type:           'geolocation',
      label:          'Location Reading',
      eyebrow:        _pending.eyebrow,
      cardId:         _pending.card.id,
      cardName:       _pending.card.name,
      cardSuit:       _pending.card.suit,
      cardSuitSymbol: _pending.card.suitSymbol,
    });
    markSaved(MODAL_ID);
  });
}

export function openGeolocationModal() {
  ensureModal();
  openModal(MODAL_ID);
  if (isLoggedIn()) prefillUserData(MODAL_ID, getUser());
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
