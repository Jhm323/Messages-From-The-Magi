/**
 * PullCard — "Pull a Card" oracle feature.
 * Renders an animated card draw directly in the page (no modal).
 *
 * Usage:
 *   import { initPullCard } from './PullCard.js';
 *   initPullCard('#pull-card-mount');
 */

import { pullRandomCard, getCardBack } from "../api/cardQueries.js";
import { renderCardResult }             from "./CardResult.js";

export function initPullCard(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;

  mount.innerHTML = buildShell();

  const drawBtn    = mount.querySelector("[data-draw]");
  const resultZone = mount.querySelector("[data-result]");
  const backImg    = mount.querySelector("[data-card-back]");

  drawBtn.addEventListener("click", draw);

  function draw() {
    // Animate card back first
    drawBtn.disabled = true;
    drawBtn.textContent = "✦ Drawing…";
    backImg.classList.add("animate-pulse-gold");

    setTimeout(() => {
      const card = pullRandomCard();

      resultZone.innerHTML = renderCardResult(card, {
        eyebrow:         "The Cards Speak",
        subheading:      "Your Oracle Card",
        showAffirmation: true,
        showAction:      true,
        showDescription: true,
      });

      backImg.style.display  = "none";
      resultZone.style.display = "block";

      drawBtn.textContent = "✦ Pull Another Card";
      drawBtn.disabled    = false;

      // Reset for next draw
      drawBtn.removeEventListener("click", draw);
      drawBtn.addEventListener("click", redraw);

      function redraw() {
        resultZone.style.display = "none";
        backImg.style.display    = "flex";
        backImg.classList.remove("animate-pulse-gold");
        setTimeout(draw, 120);
      }
    }, 900);
  }
}

function buildShell() {
  const back = getCardBack();

  return `
<div style="text-align:center;">
  <h3 style="font-family:var(--font-display);color:var(--color-gold);font-size:1.4rem;margin-bottom:0.5rem;">
    Pull a Card
  </h3>
  <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto;">
    Still your mind. Take a breath. Ask your question — then let the cards speak.
  </p>

  <div data-card-back
    style="width:200px;height:300px;margin:0 auto 1.5rem;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--color-gold-muted);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:box-shadow 0.3s;"
    onclick="this.closest('[data-pull-root]')?.querySelector('[data-draw]')?.click()">
    <img src="${back.imagePath}" alt="Card back" style="width:100%;height:100%;object-fit:cover;">
  </div>

  <button class="btn btn--primary" data-draw>
    ✦ Pull a Card
  </button>

  <div data-result style="display:none;margin-top:2rem;"></div>
</div>`;
}
