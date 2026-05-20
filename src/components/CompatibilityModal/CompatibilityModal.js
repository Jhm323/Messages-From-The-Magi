/**
 * CompatibilityModal — Reveal the card governing two people's connection.
 */

import "./CompatibilityModal.css";
import { mountModal, openModal } from "../ui/Modal/Modal.js";
import "../ui/Button/Button.js";
import "../ui/Form/Form.js";
import { getCompatibilityCard } from "../../api/cardQueries.js";
import { renderCardResult } from "../CardResult/CardResult.js";
import { buildBirthdateSelects } from "../../utils/helpers.js";
import { getUser, isLoggedIn } from "../../auth/AuthStore.js";
import { saveReading } from "../../auth/SavedReadings.js";
import {
  resetSaveBtn,
  markSaved,
  showError,
  hideError,
  prefillUserData,
} from "../ui/Modal/modalHelpers.js";

const MODAL_ID = "modal-compatibility";

let _pending = null;

function buildHTML() {
  return `
<div class="modal-overlay" id="${MODAL_ID}" role="dialog" aria-modal="true" aria-labelledby="${MODAL_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${MODAL_ID}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${MODAL_ID}-step-form">
      <p class="modal__intro">
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

      <div id="${MODAL_ID}-error" role="alert" class="modal__error"></div>

      <button class="btn btn--primary btn--full modal__submit" id="${MODAL_ID}-submit">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${MODAL_ID}-step-result" style="display:none;">
      <div id="${MODAL_ID}-result-container"></div>
      <button class="btn btn--ghost btn--full modal__again-btn" id="${MODAL_ID}-again">
        ← Try Another Reading
      </button>
      <button class="btn btn--ghost modal__save-btn" id="${MODAL_ID}-save">
        ♦ Save Reading
      </button>
      <div id="${MODAL_ID}-save-msg" class="modal__save-msg"></div>
    </div>
  </div>
</div>`;
}

function ensureModal() {
  const overlay = mountModal(MODAL_ID, buildHTML());
  if (!overlay) return;

  document
    .getElementById(`${MODAL_ID}-submit`)
    .addEventListener("click", () => {
      const name1 =
        document.getElementById(`${MODAL_ID}-name1`).value.trim() || "Person 1";
      const month1 = document.getElementById(`${MODAL_ID}-month1`).value;
      const day1 = document.getElementById(`${MODAL_ID}-day1`).value;
      const name2 =
        document.getElementById(`${MODAL_ID}-name2`).value.trim() || "Person 2";
      const month2 = document.getElementById(`${MODAL_ID}-month2`).value;
      const day2 = document.getElementById(`${MODAL_ID}-day2`).value;

      hideError(MODAL_ID);

      if (!month1 || !day1 || !month2 || !day2) {
        showError(MODAL_ID, "Please select both birthdates to continue.");
        return;
      }

      const result = getCompatibilityCard(
        `${month1}/${day1}`,
        `${month2}/${day2}`,
      );
      if (!result || !result.card) {
        showError(
          MODAL_ID,
          "Something went wrong. Please check the dates and try again.",
        );
        return;
      }

      document.getElementById(`${MODAL_ID}-result-container`).innerHTML =
        renderCardResult(result.card, {
          eyebrow: `${name1} & ${name2}`,
          subheading: "Your Compatibility Card",
          showAffirmation: true,
          showAction: true,
          showDescription: true,
          extra: `<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${result.card.id} · Numerological value: ${result.reducedValue}
      </p>`,
        });

      _pending = { card: result.card, eyebrow: `${name1} & ${name2}` };
      resetSaveBtn(MODAL_ID);

      document.getElementById(`${MODAL_ID}-step-form`).style.display = "none";
      document.getElementById(`${MODAL_ID}-step-result`).style.display =
        "block";
    });

  document.getElementById(`${MODAL_ID}-again`).addEventListener("click", () => {
    _pending = null;
    document.getElementById(`${MODAL_ID}-step-form`).style.display = "block";
    document.getElementById(`${MODAL_ID}-step-result`).style.display = "none";
  });

  document.getElementById(`${MODAL_ID}-save`).addEventListener("click", () => {
    const msgEl = document.getElementById(`${MODAL_ID}-save-msg`);
    if (!isLoggedIn()) {
      msgEl.textContent = "Sign in to save your readings.";
      msgEl.style.color = "var(--color-gold-muted)";
      return;
    }
    if (!_pending) return;
    saveReading({
      type: "compatibility",
      label: "Compatibility Reading",
      eyebrow: _pending.eyebrow,
      cardId: _pending.card.id,
      cardName: _pending.card.name,
      cardSuit: _pending.card.suit,
      cardSuitSymbol: _pending.card.suitSymbol,
    });
    markSaved(MODAL_ID);
  });
}

export function openCompatibilityModal() {
  ensureModal();
  openModal(MODAL_ID);
  if (isLoggedIn())
    prefillUserData(MODAL_ID, getUser(), {
      name: `${MODAL_ID}-name1`,
      month: `${MODAL_ID}-month1`,
      day: `${MODAL_ID}-day1`,
    });
  setTimeout(() => document.getElementById(`${MODAL_ID}-name1`)?.focus(), 100);
}
