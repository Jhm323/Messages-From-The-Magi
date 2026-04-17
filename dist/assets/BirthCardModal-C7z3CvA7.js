import{c as e,d as t,s as n,u as r}from"./PageAnimations-B3zyfM8q.js";import{n as i,t as a}from"./CardResult-BxKRgbki.js";import{r as o}from"./SavedReadings-1dH3-Zbr.js";function s(e,t){return`<div style="display:flex;gap:0.75rem;">
    <select class="form-input" id="${e}" required>
      <option value="">Month</option>${[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`].map((e,t)=>`<option value="${t+1}">${e}</option>`).join(``)}
    </select>
    <select class="form-input" id="${t}" required>
      <option value="">Day</option>${Array.from({length:31},(e,t)=>`<option value="${t+1}">${t+1}</option>`).join(``)}
    </select>
  </div>`}var c=`modal-birthcard`,l=null;function u(){return`
<div class="modal-overlay" id="${c}" role="dialog" aria-modal="true" aria-labelledby="${c}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${c}-title">Your Birth Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${c}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Your Birth Card is the energetic signature you were born with — the card that reflects
        your soul's nature, your gifts, and your path in this life.
      </p>

      <div class="form-group">
        <label class="form-label" for="${c}-name">Your Name</label>
        <input class="form-input" id="${c}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${s(`${c}-month`,`${c}-day`)}
      </div>

      <div id="${c}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${c}-submit" style="width:100%;">
        ✦ Reveal My Birth Card
      </button>
    </div>

    <div id="${c}-step-result" style="display:none;">
      <div id="${c}-result-container"></div>
      <div style="margin-top:1.5rem;display:flex;gap:1rem;">
        <button class="btn btn--ghost" id="${c}-again" style="flex:1;">← New Reading</button>
        <button class="btn btn--secondary" id="${c}-learn" style="flex:1;" disabled>Expand Reading ✦</button>
      </div>
      <button class="btn btn--ghost" id="${c}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${c}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
      <p style="color:var(--color-mist);font-size:0.78rem;text-align:center;margin-top:0.25rem;">
        Expanded readings available in Seeker tier
      </p>
    </div>
  </div>
</div>`}function d(){if(!n(c,u()))return;let e=document.getElementById(`${c}-error`);document.getElementById(`${c}-submit`).addEventListener(`click`,()=>{let t=document.getElementById(`${c}-name`).value.trim()||`Seeker`,n=document.getElementById(`${c}-month`).value,o=document.getElementById(`${c}-day`).value;if(e.style.display=`none`,!n||!o){r(`Please select your birth month and day.`);return}let s=i(`${n}/${o}`);if(!s||!s.card){r(`Could not calculate your birth card. Please check the date.`);return}document.getElementById(`${c}-result-container`).innerHTML=a(s.card,{eyebrow:t,subheading:`Your Birth Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),l={card:s.card,eyebrow:t},f(),document.getElementById(`${c}-step-form`).style.display=`none`,document.getElementById(`${c}-step-result`).style.display=`block`}),document.getElementById(`${c}-again`).addEventListener(`click`,()=>{l=null,document.getElementById(`${c}-step-form`).style.display=`block`,document.getElementById(`${c}-step-result`).style.display=`none`}),document.getElementById(`${c}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${c}-save-msg`);if(!t()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}l&&(o({type:`birth-card`,label:`Birth Card Reading`,eyebrow:l.eyebrow,cardId:l.card.id,cardName:l.card.name,cardSuit:l.card.suit,cardSuitSymbol:l.card.suitSymbol}),p())});function r(t){e.textContent=t,e.style.display=`block`}}function f(){let e=document.getElementById(`${c}-save`),t=document.getElementById(`${c}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function p(){let e=document.getElementById(`${c}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function m(){if(!t())return;let e=r(),n=document.getElementById(`${c}-name`);if(n&&(n.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${c}-month`),i=document.getElementById(`${c}-day`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function h(){d(),e(c),m(),setTimeout(()=>document.getElementById(`${c}-name`)?.focus(),100)}export{s as n,h as t};