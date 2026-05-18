/**
 * BirthCardModal — Calculate and display a user's Birth Card.
 */

import { mountModal, openModal } from './ui/Modal/Modal.js';
import './ui/Button/Button.js';
import './ui/Form/Form.js';
import { getBirthCard } from '../api/cardQueries.js';
import { renderCardResult } from './CardResult/CardResult.js';
import { buildBirthdateSelects } from '../utils/helpers.js';
import { getUser, isLoggedIn } from '../auth/AuthStore.js';
import { saveReading } from '../auth/SavedReadings.js';
import { resetSaveBtn, markSaved, showError, hideError, prefillUserData } from './ui/Modal/modalHelpers.js';

const MODAL_ID = 'modal-birthcard';

// Holds the last revealed card so the save button can reference it
let _pending = null;

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Your Birth Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${MODAL_ID}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Your Birth Card is the energetic signature you were born with — the card that reflects
        your soul's nature, your gifts, and your path in this life.
      </p>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-name">Your Name</label>
        <input class="form-input" id="${MODAL_ID}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${buildBirthdateSelects(`${MODAL_ID}-month`, `${MODAL_ID}-day`)}
      </div>

      <div id="${MODAL_ID}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${MODAL_ID}-submit" style="width:100%;">
        ✦ Reveal My Birth Card
      </button>
    </div>

    <div id="${MODAL_ID}-step-result" style="display:none;">
      <div id="${MODAL_ID}-result-container"></div>
      <div style="margin-top:1.5rem;display:flex;gap:1rem;">
        <button class="btn btn--ghost" id="${MODAL_ID}-again" style="flex:1;">← New Reading</button>
        <button class="btn btn--secondary" id="${MODAL_ID}-learn" style="flex:1;" disabled>Expand Reading ✦</button>
      </div>
      <button class="btn btn--ghost" id="${MODAL_ID}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${MODAL_ID}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
      <p style="color:var(--color-mist);font-size:0.78rem;text-align:center;margin-top:0.25rem;">
        Expanded readings available in Seeker tier
      </p>
    </div>
  </div>
</div>`;
}

function ensureModal() {
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  document.getElementById(`${MODAL_ID}-submit`).addEventListener('click', () => {
    const name  = document.getElementById(`${MODAL_ID}-name`).value.trim() || 'Seeker';
    const month = document.getElementById(`${MODAL_ID}-month`).value;
    const day   = document.getElementById(`${MODAL_ID}-day`).value;

    hideError(MODAL_ID);
    if (!month || !day) { showError(MODAL_ID, 'Please select your birth month and day.'); return; }

    const result = getBirthCard(`${month}/${day}`);
    if (!result || !result.card) {
      showError(MODAL_ID, 'Could not calculate your birth card. Please check the date.');
      return;
    }

    document.getElementById(`${MODAL_ID}-result-container`).innerHTML = renderCardResult(result.card, {
      eyebrow:         name,
      subheading:      'Your Birth Card',
      showAffirmation: true,
      showAction:      true,
      showDescription: true,
    });

    // Store for save button
    _pending = { card: result.card, eyebrow: name };
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
      type:           'birth-card',
      label:          'Birth Card Reading',
      eyebrow:        _pending.eyebrow,
      cardId:         _pending.card.id,
      cardName:       _pending.card.name,
      cardSuit:       _pending.card.suit,
      cardSuitSymbol: _pending.card.suitSymbol,
    });
    markSaved(MODAL_ID);
  });
}

export function openBirthCardModal() {
  ensureModal();
  openModal(MODAL_ID);
  if (isLoggedIn()) prefillUserData(MODAL_ID, getUser());
  setTimeout(() => document.getElementById(`${MODAL_ID}-name`)?.focus(), 100);
}
