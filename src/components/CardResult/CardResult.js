import './CardResult.css';

/**
 * CardResult — shared HTML renderer for card reading results.
 * Used by all modals and feature components.
 *
 * @param {Object} card   — card object from the database
 * @param {Object} opts   — rendering options
 * @returns {string}      — HTML string to inject
 */
export function renderCardResult(card, opts = {}) {
  const {
    eyebrow        = "",
    subheading     = "Your Card",
    showAffirmation = true,
    showAction      = true,
    showDescription = true,
    showKeywords    = true,
    extra           = "",
    compact         = false,
  } = opts;

  const suitClass = card.suit.toLowerCase();

  return `
<div class="reading-result card-display card-display--${suitClass} animate-card-reveal">

  ${eyebrow ? `<div class="reading-result__eyebrow">${eyebrow}</div>` : ""}

  <div class="card-suit-symbol">${card.suitSymbol}</div>

  <div style="font-family:var(--font-heading);font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-dawn);margin-bottom:0.25rem;">
    ${subheading}
  </div>

  <div class="reading-result__card-name">${card.name}</div>
  <div class="reading-result__number">Card ${card.id} · ${card.suitElement} · Value ${card.numericalValue}</div>

  <div class="card-image-wrap animate-card-reveal" style="max-width:${compact ? '160px' : '220px'};margin:0 auto 1.5rem;">
    <img src="${card.imagePath}" alt="${card.name}" loading="lazy">
  </div>

  ${showKeywords && card.keywords.length ? `
  <div class="card-keywords">
    ${card.keywords.map(k => `<span class="card-keyword-tag">${k}</span>`).join("")}
  </div>
  ` : ""}

  ${showAffirmation ? `
  <div class="card-affirmation">"${card.affirmation}"</div>
  ` : ""}

  ${showDescription ? `
  <div class="card-description">${card.description}</div>
  ` : ""}

  ${showAction ? `
  <div class="card-action-prompt">
    <strong>✦ Your Practice</strong>
    ${card.action}
  </div>
  ` : ""}

  ${extra}
</div>`;
}
