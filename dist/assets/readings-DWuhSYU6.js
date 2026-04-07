import{a as e,c as t,l as n,n as r,o as i,t as a}from"./Footer-Dt2lRjst.js";import{o,r as s,s as c,t as l}from"./CardResult-ICDmN0RT.js";import{n as u,t as d}from"./BirthCardModal-UcJzIp8K.js";import{r as f}from"./SavedReadings-1dH3-Zbr.js";import"./SelectionChip-CB9M93dA.js";var p=`modal-compatibility`,m=null;function h(){return`
<div class="modal-overlay" id="${p}" role="dialog" aria-modal="true" aria-labelledby="${p}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${p}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${p}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter both birthdates to reveal the card that governs your connection.
      </p>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${p}-name1">Your Name</label>
        <input class="form-input" id="${p}-name1" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${u(`${p}-month1`,`${p}-day1`)}
      </div>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${p}-name2">Partner's Name</label>
        <input class="form-input" id="${p}-name2" type="text" placeholder="Their name" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Partner's Birthdate</label>
        ${u(`${p}-month2`,`${p}-day2`)}
      </div>

      <div id="${p}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${p}-submit" style="width:100%;margin-top:0.5rem;">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${p}-step-result" style="display:none;">
      <div id="${p}-result-container"></div>
      <button class="btn btn--ghost" id="${p}-again" style="width:100%;margin-top:1.5rem;">
        ← Try Another Reading
      </button>
      <button class="btn btn--ghost" id="${p}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${p}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function g(){if(!e(p,h()))return;let t=document.getElementById(`${p}-error`);document.getElementById(`${p}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${p}-name1`).value.trim()||`Person 1`,n=document.getElementById(`${p}-month1`).value,r=document.getElementById(`${p}-day1`).value,i=document.getElementById(`${p}-name2`).value.trim()||`Person 2`,a=document.getElementById(`${p}-month2`).value,s=document.getElementById(`${p}-day2`).value;if(t.style.display=`none`,!n||!r||!a||!s){t.textContent=`Please select both birthdates to continue.`,t.style.display=`block`;return}let c=o(`${n}/${r}`,`${a}/${s}`);if(!c||!c.card){t.textContent=`Something went wrong. Please check the dates and try again.`,t.style.display=`block`;return}document.getElementById(`${p}-result-container`).innerHTML=l(c.card,{eyebrow:`${e} & ${i}`,subheading:`Your Compatibility Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${c.card.id} · Numerological value: ${c.reducedValue}
      </p>`}),m={card:c.card,eyebrow:`${e} & ${i}`},_(),document.getElementById(`${p}-step-form`).style.display=`none`,document.getElementById(`${p}-step-result`).style.display=`block`}),document.getElementById(`${p}-again`).addEventListener(`click`,()=>{m=null,document.getElementById(`${p}-step-form`).style.display=`block`,document.getElementById(`${p}-step-result`).style.display=`none`}),document.getElementById(`${p}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${p}-save-msg`);if(!n()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}m&&(f({type:`compatibility`,label:`Compatibility Reading`,eyebrow:m.eyebrow,cardId:m.card.id,cardName:m.card.name,cardSuit:m.card.suit,cardSuitSymbol:m.card.suitSymbol}),v())})}function _(){let e=document.getElementById(`${p}-save`),t=document.getElementById(`${p}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function v(){let e=document.getElementById(`${p}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function y(){if(!n())return;let e=t(),r=document.getElementById(`${p}-name1`);if(r&&(r.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${p}-month1`),i=document.getElementById(`${p}-day1`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function b(){g(),i(p),y(),setTimeout(()=>document.getElementById(`${p}-name1`)?.focus(),100)}var x=`modal-geolocation`,S=null;function C(){return`
<div class="modal-overlay" id="${x}" role="dialog" aria-modal="true" aria-labelledby="${x}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${x}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${x}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Every place carries an energetic signature. This reading reveals how a specific location
        interacts with your personal cards — ideal for travel, relocation, or understanding why
        certain places feel the way they do.
      </p>

      <div class="form-group">
        <label class="form-label" for="${x}-name">Your Name</label>
        <input class="form-input" id="${x}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>

      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${u(`${x}-month`,`${x}-day`)}
      </div>

      <div class="form-group">
        <label class="form-label" for="${x}-location">Location</label>
        <input class="form-input" id="${x}-location" type="text"
          placeholder="e.g. New York, Paris, Sedona, Tokyo…"
          autocomplete="off" required>
        <span class="form-hint">City, country, or any place name</span>
      </div>

      <div id="${x}-error" role="alert"
        style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${x}-submit" style="width:100%;">
        ✦ Reveal My Location Card
      </button>
    </div>

    <div id="${x}-step-result" style="display:none;">
      <div id="${x}-result-container"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--ghost" id="${x}-again" style="flex:1;">
          ← Try Another Location
        </button>
      </div>
      <button class="btn btn--ghost" id="${x}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${x}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function w(){if(!e(x,C()))return;let t=document.getElementById(`${x}-error`);document.getElementById(`${x}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${x}-name`).value.trim()||`Seeker`,n=document.getElementById(`${x}-month`).value,i=document.getElementById(`${x}-day`).value,a=document.getElementById(`${x}-location`).value.trim();if(t.style.display=`none`,!n||!i){r(`Please select your birth month and day.`);return}if(!a){r(`Please enter a location name.`);return}let o=c(`${n}/${i}`,a);if(!o||!o.card){r(`Could not calculate the location card. Please check your inputs.`);return}document.getElementById(`${x}-result-container`).innerHTML=l(o.card,{eyebrow:`${e} · ${a}`,subheading:`Your Location Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${o.birthValue} + Location value ${o.locationValue}
          = Card #${o.reducedValue}
        </div>`}),S={card:o.card,eyebrow:`${e} · ${a}`,location:a},T(),document.getElementById(`${x}-step-form`).style.display=`none`,document.getElementById(`${x}-step-result`).style.display=`block`}),document.getElementById(`${x}-again`).addEventListener(`click`,()=>{S=null,document.getElementById(`${x}-step-form`).style.display=`block`,document.getElementById(`${x}-step-result`).style.display=`none`}),document.getElementById(`${x}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${x}-save-msg`);if(!n()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}S&&(f({type:`geolocation`,label:`Location Reading`,eyebrow:S.eyebrow,cardId:S.card.id,cardName:S.card.name,cardSuit:S.card.suit,cardSuitSymbol:S.card.suitSymbol}),E())});function r(e){t.textContent=e,t.style.display=`block`}}function T(){let e=document.getElementById(`${x}-save`),t=document.getElementById(`${x}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function E(){let e=document.getElementById(`${x}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function D(){if(!n())return;let e=t(),r=document.getElementById(`${x}-name`);if(r&&(r.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${x}-month`),i=document.getElementById(`${x}-day`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function O(){w(),i(x),D(),setTimeout(()=>document.getElementById(`${x}-name`)?.focus(),100)}var k=`modal-greeting`,A=null;function j(){return`
<div class="modal-overlay" id="${k}" role="dialog" aria-modal="true" aria-labelledby="${k}-title">
  <div class="modal modal--fullscreen">
    <div class="modal__header">
      <h2 class="modal__title" id="${k}-title">Create a Greeting Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${k}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter the recipient's details to generate a personalized card drawn from their birth card energy.
      </p>

      <div class="form-group">
        <label class="form-label" for="${k}-name">Recipient's Name</label>
        <input class="form-input" id="${k}-name" type="text" placeholder="e.g. Sarah" required>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient's Birthdate</label>
        ${u(`${k}-month`,`${k}-day`)}
      </div>
      <div class="form-group">
        <label class="form-label">Occasion</label>
        <div class="chip-group" id="${k}-occasion-chips" style="margin-bottom:0.6rem;">
          <button class="chip" data-value="Birthday">🎂 Birthday</button>
          <button class="chip" data-value="Anniversary">♥ Anniversary</button>
          <button class="chip" data-value="New Year">✦ New Year</button>
          <button class="chip" data-value="Celebration">★ Celebration</button>
          <button class="chip" data-value="Just Because">Just Because</button>
        </div>
        <input class="form-input" id="${k}-occasion" type="text" placeholder="or type your own…">
      </div>
      <div class="form-group">
        <label class="form-label" for="${k}-message">Your Personal Message</label>
        <textarea class="form-input" id="${k}-message" rows="3"
          placeholder="Write your message here…"
          style="resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="${k}-from">From</label>
        <input class="form-input" id="${k}-from" type="text" placeholder="Your name">
      </div>

      <div id="${k}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${k}-submit" style="width:100%;">
        ✦ Generate Card
      </button>
    </div>

    <!-- STEP 2: Card Display -->
    <div id="${k}-step-result" style="display:none;">
      <div id="${k}-card-output"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--secondary" id="${k}-print" style="flex:1;">
          🖨 Print Card
        </button>
        <button class="btn btn--ghost" id="${k}-again" style="flex:1;">
          ← New Card
        </button>
      </div>
      <button class="btn btn--ghost" id="${k}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${k}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
      <p style="color:var(--color-mist);font-size:0.78rem;text-align:center;margin-top:0.25rem;">
        Email integration coming soon (Tier 2)
      </p>
    </div>
  </div>
</div>`}function M(e){return e.toLowerCase()}function N({name:e,occasion:t,message:n,from:r,card:i}){return`
<div class="greeting-reveal-wrapper">

  <!-- Cover: Mystic Oracle card shows first, then melts away -->
  <div class="greeting-cover" id="${k}-cover">
    <img src="/images/util/card_back.jpg" alt="The Mystic Oracle" class="greeting-cover__img">
  </div>

  <!-- Content: fades in after cover melts -->
  <div class="greeting-content" id="${k}-content">
    <div class="greeting-card card-display card-display--${M(i.suit)}" id="${k}-printable">

      <div style="margin-bottom:0.75rem;">
        <div class="greeting-card__from">A card for</div>
        <div class="greeting-card__recipient" style="font-size:1.6rem;margin-bottom:0.25rem;">${e}</div>
        ${t?`<div style="font-family:var(--font-heading);font-size:0.8rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">on the occasion of their ${t}</div>`:``}
      </div>

      <div style="font-family:var(--font-heading);font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-dawn);margin-bottom:0.2rem;">Your Birth Card</div>
      <div class="card-name" style="color:var(--color-gold);font-size:1.4rem;margin-bottom:0.2rem;">${i.name}</div>
      <div style="font-size:1.4rem;margin-bottom:0.5rem;">${i.suitSymbol}</div>

      <div class="card-keywords" style="margin-bottom:0.5rem;">
        ${i.keywords.map(e=>`<span class="card-keyword-tag">${e}</span>`).join(``)}
      </div>

      <div class="card-affirmation" style="margin:0.5rem 0;font-size:1rem;padding:0.75rem 1rem;">
        "${i.affirmation}"
      </div>

      <div class="card-description" style="font-size:0.95rem;margin:0.5rem 0;line-height:1.7;text-align:center;color:var(--color-light);">
        ${i.description}
      </div>

      <div class="card-action-prompt" style="margin:0.5rem 0;">
        <strong>✦ Your Practice</strong>
        ${i.action}
      </div>

      ${n?`
      <div class="divider--glyph" style="margin:0.75rem 0;">✦</div>
      <div class="greeting-card__message" style="margin:0.5rem 0;font-size:1.05rem;">"${n}"</div>
      `:``}

      ${r?`
      <div style="font-family:var(--font-heading);font-size:0.85rem;letter-spacing:0.1em;color:var(--color-dawn);margin-top:0.5rem;">
        With love, ${r}
      </div>
      `:``}

      <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid var(--color-gold-muted);font-family:var(--font-heading);font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-gold-muted);">
        Messages from the Magi
      </div>

    </div>

    <button class="greeting-replay-btn" id="${k}-replay" style="margin-top:1rem;">↺ Replay</button>
  </div>

</div>`}function P(){let t=e(k,j());if(!t)return;let r=document.getElementById(`${k}-error`),i=document.getElementById(`${k}-occasion`),a=t.querySelectorAll(`#${k}-occasion-chips .chip`);a.forEach(e=>{e.addEventListener(`click`,()=>{a.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),i.value=e.dataset.value})}),i.addEventListener(`input`,()=>{a.forEach(e=>e.classList.remove(`is-active`))}),document.getElementById(`${k}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${k}-name`).value.trim(),t=document.getElementById(`${k}-month`).value,n=document.getElementById(`${k}-day`).value,i=document.getElementById(`${k}-occasion`).value.trim(),a=document.getElementById(`${k}-message`).value.trim(),c=document.getElementById(`${k}-from`).value.trim();if(r.style.display=`none`,!e){o(`Please enter the recipient's name.`);return}if(!t||!n){o(`Please select the recipient's birth month and day.`);return}let l=s(`${t}/${n}`);if(!l||!l.card){o(`Could not calculate the birth card. Please check the date.`);return}let u=document.getElementById(`${k}-card-output`);u.innerHTML=N({name:e,occasion:i,message:a,from:c,card:l.card}),document.getElementById(`${k}-replay`).addEventListener(`click`,()=>{let e=document.getElementById(`${k}-cover`),t=document.getElementById(`${k}-content`);e.style.animation=`none`,t.style.animation=`none`,t.style.opacity=`0`,e.offsetWidth,e.style.animation=``,t.style.animation=``}),A={card:l.card,eyebrow:e},F(),document.getElementById(`${k}-step-form`).style.display=`none`,document.getElementById(`${k}-step-result`).style.display=`block`}),document.getElementById(`${k}-again`).addEventListener(`click`,()=>{A=null,c()}),document.getElementById(`${k}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${k}-save-msg`);if(!n()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}A&&(f({type:`greeting-card`,label:`Greeting Card`,eyebrow:A.eyebrow,cardId:A.card.id,cardName:A.card.name,cardSuit:A.card.suit,cardSuitSymbol:A.card.suitSymbol}),I())}),document.getElementById(`${k}-print`).addEventListener(`click`,()=>{window.print()});function o(e){r.textContent=e,r.style.display=`block`}function c(){document.getElementById(`${k}-step-form`).style.display=`block`,document.getElementById(`${k}-step-result`).style.display=`none`}}function F(){let e=document.getElementById(`${k}-save`),t=document.getElementById(`${k}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function I(){let e=document.getElementById(`${k}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function L(){if(!n())return;let e=t(),r=document.getElementById(`${k}-from`);r&&(r.value=e.name??``)}function R(){P(),i(k),L(),setTimeout(()=>document.getElementById(`${k}-name`)?.focus(),100)}r(`#site-header-mount`,{activePath:`/readings.html`}),a(`#site-footer-mount`),document.body.classList.replace(`js-loading`,`js-ready`);var z={"birth-card":d,compatibility:b,geolocation:O,"greeting-card":R};document.querySelectorAll(`[data-feature]`).forEach(e=>{e.style.cursor=`pointer`,e.addEventListener(`click`,()=>{let t=z[e.dataset.feature];t&&t()})});var B=new URLSearchParams(location.search).get(`open`);B&&z[B]&&z[B]();