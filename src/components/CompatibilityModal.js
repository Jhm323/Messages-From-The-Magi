/**
 * CompatibilityModal — Reveal the card governing two people's connection.
 */

import { mountModal, openModal } from './ui/Modal/Modal.js';
import './ui/Button/Button.js';
import './ui/Form/Form.js';
import { getCompatibilityCard } from '../api/cardQueries.js';
import { renderCardResult }      from './CardResult/CardResult.js';
import { buildBirthdateSelects } from '../utils/helpers.js';

const MODAL_ID = 'modal-compatibility';

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${MODAL_ID}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter both birthdates to reveal the card that governs your connection.
      </p>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-name1">Your Name</label>
        <input class="form-input" id="${MODAL_ID}-name1" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${buildBirthdateSelects(`${MODAL_ID}-month1`, `${MODAL_ID}-day1`)}
      </div>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${MODAL_ID}-name2">Partner's Name</label>
        <input class="form-input" id="${MODAL_ID}-name2" type="text" placeholder="Their name" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Partner's Birthdate</label>
        ${buildBirthdateSelects(`${MODAL_ID}-month2`, `${MODAL_ID}-day2`)}
      </div>

      <div id="${MODAL_ID}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${MODAL_ID}-submit" style="width:100%;margin-top:0.5rem;">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${MODAL_ID}-step-result" style="display:none;">
      <div id="${MODAL_ID}-result-container"></div>
      <button class="btn btn--ghost" id="${MODAL_ID}-again" style="width:100%;margin-top:1.5rem;">
        ← Try Another Reading
      </button>
    </div>
  </div>
</div>`;
}

function ensureModal() {
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  const errEl = document.getElementById(`${MODAL_ID}-error`);

  document.getElementById(`${MODAL_ID}-submit`).addEventListener('click', () => {
    const name1   = document.getElementById(`${MODAL_ID}-name1`).value.trim() || 'Person 1';
    const month1  = document.getElementById(`${MODAL_ID}-month1`).value;
    const day1    = document.getElementById(`${MODAL_ID}-day1`).value;
    const name2   = document.getElementById(`${MODAL_ID}-name2`).value.trim() || 'Person 2';
    const month2  = document.getElementById(`${MODAL_ID}-month2`).value;
    const day2    = document.getElementById(`${MODAL_ID}-day2`).value;

    errEl.style.display = 'none';

    if (!month1 || !day1 || !month2 || !day2) {
      errEl.textContent   = 'Please select both birthdates to continue.';
      errEl.style.display = 'block';
      return;
    }

    const result = getCompatibilityCard(`${month1}/${day1}`, `${month2}/${day2}`);
    if (!result || !result.card) {
      errEl.textContent   = 'Something went wrong. Please check the dates and try again.';
      errEl.style.display = 'block';
      return;
    }

    document.getElementById(`${MODAL_ID}-result-container`).innerHTML = renderCardResult(result.card, {
      eyebrow:         `${name1} & ${name2}`,
      subheading:      'Your Compatibility Card',
      showAffirmation: true,
      showAction:      true,
      showDescription: true,
      extra: `<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${result.card.id} · Numerological value: ${result.reducedValue}
      </p>`,
    });

    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'none';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'block';
  });

  document.getElementById(`${MODAL_ID}-again`).addEventListener('click', () => {
    document.getElementById(`${MODAL_ID}-step-form`).style.display   = 'block';
    document.getElementById(`${MODAL_ID}-step-result`).style.display = 'none';
  });
}

export function openCompatibilityModal() {
  ensureModal();
  openModal(MODAL_ID);
  setTimeout(() => document.getElementById(`${MODAL_ID}-name1`)?.focus(), 100);
}
