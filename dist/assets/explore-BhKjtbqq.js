import{n as e,t}from"./Footer-CbsBbr6j.js";import{n,t as r}from"./CardResult-DYHwvmdl.js";import"./SelectionChip-CB9M93dA.js";var i=`modal-card-detail`;function a(){if(document.getElementById(i))return;document.body.insertAdjacentHTML(`beforeend`,`
    <div class="modal-overlay" id="${i}" role="dialog" aria-modal="true">
      <div class="modal" style="max-width:600px;">
        <div class="modal__header" style="margin-bottom:1rem;">
          <span></span>
          <button class="modal__close" data-close aria-label="Close">✕</button>
        </div>
        <div id="${i}-body"></div>
      </div>
    </div>
  `);let e=document.getElementById(i);e.addEventListener(`click`,t=>{(t.target===e||t.target.dataset.close!==void 0)&&e.classList.remove(`is-open`)}),document.addEventListener(`keydown`,t=>{t.key===`Escape`&&e.classList.remove(`is-open`)})}function o(e){a(),document.getElementById(`${i}-body`).innerHTML=r(e,{showAffirmation:!0,showAction:!0,showDescription:!0}),document.getElementById(i).classList.add(`is-open`)}function s(e){return`
<button
  class="card-thumb card-display card-display--${e.suit.toLowerCase()}"
  data-card-id="${e.id}"
  aria-label="View ${e.name}"
  style="cursor:pointer;border:none;text-align:center;padding:1.25rem 1rem;width:100%;">

  <div class="card-image-wrap" style="max-width:140px;margin:0 auto 0.75rem;aspect-ratio:3/4;">
    <img src="${e.imagePath}" alt="${e.name}" loading="lazy">
  </div>

  <div class="card-suit-symbol" style="font-size:1.1rem;margin-bottom:0.2rem;">
    ${e.suitSymbol}
  </div>
  <div class="card-name" style="font-size:0.85rem;">${e.name}</div>
  <div class="card-number-badge" style="font-size:0.65rem;">#${e.id}</div>
</button>`}function c(){let e=[`All`,`Hearts`,`Clubs`,`Diamonds`,`Spades`,`Joker`],t=n(),r={All:``,Hearts:`♥`,Clubs:`♣`,Diamonds:`♦`,Spades:`♠`,Joker:`★`};return`
<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:2rem;align-items:center;">
  <div class="chip-group" id="card-filter-chips">
    ${e.map(e=>`
      <button class="chip${e===`All`?` is-active`:``}" data-suit="${e}" data-value="${e}">
        ${r[e]?`<span class="chip__icon">${r[e]}</span>`:``}${e}
      </button>`).join(``)}
  </div>
  <input
    id="card-search"
    class="form-input"
    type="search"
    placeholder="Search cards…"
    style="margin-left:auto;max-width:200px;padding:0.4rem 0.85rem;font-size:0.85rem;">
</div>
<div id="card-browser-grid" style="
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:1rem;">
  ${t.map(s).join(``)}
</div>
<div id="card-browser-empty" style="display:none;text-align:center;padding:3rem;color:var(--color-mist);">
  <div style="font-size:2rem;margin-bottom:0.5rem;">♦</div>
  No cards match your search.
</div>`}function l(e){let t=document.querySelector(e);if(!t)return;t.innerHTML=c();let r=t.querySelector(`#card-browser-grid`),i=t.querySelector(`#card-browser-empty`),a=t.querySelector(`#card-search`),s=t.querySelectorAll(`.chip[data-suit]`),l=`All`,u=``;r.addEventListener(`click`,e=>{let t=e.target.closest(`[data-card-id]`);if(!t)return;let r=parseInt(t.dataset.cardId,10),i=n().find(e=>e.id===r);i&&o(i)}),s.forEach(e=>{e.addEventListener(`click`,()=>{s.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),l=e.dataset.suit,d()})}),a.addEventListener(`input`,e=>{u=e.target.value.trim().toLowerCase(),d()});function d(){let e=r.querySelectorAll(`.card-thumb`),t=0,a=n();e.forEach(e=>{let n=parseInt(e.dataset.cardId,10),r=a.find(e=>e.id===n);if(!r)return;let i=l===`All`||r.suit===l,o=!u||r.name.toLowerCase().includes(u)||r.suit.toLowerCase().includes(u)||r.rank.toLowerCase().includes(u)||r.keywords.some(e=>e.toLowerCase().includes(u)),s=i&&o;e.style.display=s?``:`none`,s&&t++}),i.style.display=t===0?`block`:`none`}}e(`#site-header-mount`,{activePath:`/explore.html`}),t(`#site-footer-mount`),l(`#card-browser-mount`),document.body.classList.replace(`js-loading`,`js-ready`);