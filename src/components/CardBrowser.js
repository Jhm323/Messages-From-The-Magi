/**
 * CardBrowser
 * Renders a full, filterable gallery of all 53 cards.
 * Clicking a card opens it in a detail modal.
 *
 * Usage:
 *   import { initCardBrowser } from './CardBrowser.js';
 *   initCardBrowser('#card-browser-mount');
 */

import { getAllCards, getCardsBySuit } from "../api/cardQueries.js";
import { renderCardResult }             from "./CardResult/CardResult.js";
import './ui/Button/Button.js';
import './ui/Form/Form.js';

const DETAIL_MODAL_ID = "modal-card-detail";

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function ensureDetailModal() {
  if (document.getElementById(DETAIL_MODAL_ID)) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal-overlay" id="${DETAIL_MODAL_ID}" role="dialog" aria-modal="true">
      <div class="modal" style="max-width:600px;">
        <div class="modal__header" style="margin-bottom:1rem;">
          <span></span>
          <button class="modal__close" data-close aria-label="Close">✕</button>
        </div>
        <div id="${DETAIL_MODAL_ID}-body"></div>
      </div>
    </div>
  `);

  const overlay = document.getElementById(DETAIL_MODAL_ID);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.dataset.close !== undefined) {
      overlay.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("is-open");
  });
}

function openCardDetail(card) {
  ensureDetailModal();
  document.getElementById(`${DETAIL_MODAL_ID}-body`).innerHTML =
    renderCardResult(card, {
      showAffirmation: true,
      showAction:      true,
      showDescription: true,
    });
  document.getElementById(DETAIL_MODAL_ID).classList.add("is-open");
}

// ─── Card Thumbnail ───────────────────────────────────────────────────────────
function cardThumb(card) {
  const suitCls = card.suit.toLowerCase();
  return `
<button
  class="card-thumb card-display card-display--${suitCls}"
  data-card-id="${card.id}"
  aria-label="View ${card.name}"
  style="cursor:pointer;border:none;text-align:center;padding:1.25rem 1rem;width:100%;">

  <div class="card-image-wrap" style="max-width:140px;margin:0 auto 0.75rem;aspect-ratio:3/4;">
    <img src="${card.imagePath}" alt="${card.name}" loading="lazy">
  </div>

  <div class="card-suit-symbol" style="font-size:1.1rem;margin-bottom:0.2rem;">
    ${card.suitSymbol}
  </div>
  <div class="card-name" style="font-size:0.85rem;">${card.name}</div>
  <div class="card-number-badge" style="font-size:0.65rem;">#${card.id}</div>
</button>`;
}

// ─── Browser Shell ────────────────────────────────────────────────────────────
function buildBrowser() {
  const suits = ["All", "Hearts", "Clubs", "Diamonds", "Spades", "Joker"];
  const allCards = getAllCards();

  const filterBar = `
<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:2rem;align-items:center;">
  <span style="font-family:var(--font-heading);font-size:0.72rem;letter-spacing:0.12em;
    text-transform:uppercase;color:var(--color-dawn);margin-right:0.5rem;">Filter:</span>
  ${suits.map(s => `
    <button
      class="btn btn--ghost card-filter-btn"
      data-suit="${s}"
      style="padding:0.4rem 0.9rem;font-size:0.75rem;${s === 'All' ? 'border-color:var(--color-gold);color:var(--color-gold);' : ''}">
      ${s === 'Hearts' ? '♥' : s === 'Clubs' ? '♣' : s === 'Diamonds' ? '♦' : s === 'Spades' ? '♠' : s === 'Joker' ? '★' : ''}
      ${s}
    </button>`).join("")}

  <input
    id="card-search"
    class="form-input"
    type="search"
    placeholder="Search cards…"
    style="margin-left:auto;max-width:200px;padding:0.4rem 0.85rem;font-size:0.85rem;">
</div>`;

  const grid = `
<div id="card-browser-grid" style="
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:1rem;">
  ${allCards.map(cardThumb).join("")}
</div>`;

  const noResults = `
<div id="card-browser-empty" style="display:none;text-align:center;padding:3rem;color:var(--color-mist);">
  <div style="font-size:2rem;margin-bottom:0.5rem;">♦</div>
  No cards match your search.
</div>`;

  return filterBar + grid + noResults;
}

// ─── Init ─────────────────────────────────────────────────────────────────────
export function initCardBrowser(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = buildBrowser();

  const grid       = mount.querySelector("#card-browser-grid");
  const emptyState = mount.querySelector("#card-browser-empty");
  const searchInput = mount.querySelector("#card-search");
  const filterBtns  = mount.querySelectorAll(".card-filter-btn");

  let currentSuit   = "All";
  let currentSearch = "";

  // Click on card → open detail
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-card-id]");
    if (!btn) return;
    const id   = parseInt(btn.dataset.cardId, 10);
    const card = getAllCards().find(c => c.id === id);
    if (card) openCardDetail(card);
  });

  // Suit filter
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.style.borderColor = "";
        b.style.color       = "";
      });
      btn.style.borderColor = "var(--color-gold)";
      btn.style.color       = "var(--color-gold)";
      currentSuit = btn.dataset.suit;
      applyFilters();
    });
  });

  // Search
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value.trim().toLowerCase();
    applyFilters();
  });

  function applyFilters() {
    const thumbs  = grid.querySelectorAll(".card-thumb");
    let visible   = 0;
    const allCards = getAllCards();

    thumbs.forEach(thumb => {
      const id   = parseInt(thumb.dataset.cardId, 10);
      const card = allCards.find(c => c.id === id);
      if (!card) return;

      const suitMatch   = currentSuit === "All" || card.suit === currentSuit;
      const searchMatch = !currentSearch ||
        card.name.toLowerCase().includes(currentSearch) ||
        card.suit.toLowerCase().includes(currentSearch) ||
        card.rank.toLowerCase().includes(currentSearch) ||
        card.keywords.some(k => k.toLowerCase().includes(currentSearch));

      const show = suitMatch && searchMatch;
      thumb.style.display = show ? "" : "none";
      if (show) visible++;
    });

    emptyState.style.display = visible === 0 ? "block" : "none";
  }
}
