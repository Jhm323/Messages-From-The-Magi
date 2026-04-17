import{a as e,c as t,d as n,i as r,n as i,o as a,r as o,s,t as c,u as l}from"./PageAnimations-B3zyfM8q.js";import{a as u,n as d,o as f,t as p}from"./CardResult-BxKRgbki.js";import{n as m,t as h}from"./BirthCardModal-C7z3CvA7.js";import{r as g}from"./SavedReadings-1dH3-Zbr.js";import"./SelectionChip-CB9M93dA.js";var _=`modal-compatibility`,v=null;function y(){return`
<div class="modal-overlay" id="${_}" role="dialog" aria-modal="true" aria-labelledby="${_}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${_}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${_}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter both birthdates to reveal the card that governs your connection.
      </p>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${_}-name1">Your Name</label>
        <input class="form-input" id="${_}-name1" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${m(`${_}-month1`,`${_}-day1`)}
      </div>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${_}-name2">Partner's Name</label>
        <input class="form-input" id="${_}-name2" type="text" placeholder="Their name" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Partner's Birthdate</label>
        ${m(`${_}-month2`,`${_}-day2`)}
      </div>

      <div id="${_}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${_}-submit" style="width:100%;margin-top:0.5rem;">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${_}-step-result" style="display:none;">
      <div id="${_}-result-container"></div>
      <button class="btn btn--ghost" id="${_}-again" style="width:100%;margin-top:1.5rem;">
        ← Try Another Reading
      </button>
      <button class="btn btn--ghost" id="${_}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${_}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function b(){if(!s(_,y()))return;let e=document.getElementById(`${_}-error`);document.getElementById(`${_}-submit`).addEventListener(`click`,()=>{let t=document.getElementById(`${_}-name1`).value.trim()||`Person 1`,n=document.getElementById(`${_}-month1`).value,r=document.getElementById(`${_}-day1`).value,i=document.getElementById(`${_}-name2`).value.trim()||`Person 2`,a=document.getElementById(`${_}-month2`).value,o=document.getElementById(`${_}-day2`).value;if(e.style.display=`none`,!n||!r||!a||!o){e.textContent=`Please select both birthdates to continue.`,e.style.display=`block`;return}let s=u(`${n}/${r}`,`${a}/${o}`);if(!s||!s.card){e.textContent=`Something went wrong. Please check the dates and try again.`,e.style.display=`block`;return}document.getElementById(`${_}-result-container`).innerHTML=p(s.card,{eyebrow:`${t} & ${i}`,subheading:`Your Compatibility Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${s.card.id} · Numerological value: ${s.reducedValue}
      </p>`}),v={card:s.card,eyebrow:`${t} & ${i}`},x(),document.getElementById(`${_}-step-form`).style.display=`none`,document.getElementById(`${_}-step-result`).style.display=`block`}),document.getElementById(`${_}-again`).addEventListener(`click`,()=>{v=null,document.getElementById(`${_}-step-form`).style.display=`block`,document.getElementById(`${_}-step-result`).style.display=`none`}),document.getElementById(`${_}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${_}-save-msg`);if(!n()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}v&&(g({type:`compatibility`,label:`Compatibility Reading`,eyebrow:v.eyebrow,cardId:v.card.id,cardName:v.card.name,cardSuit:v.card.suit,cardSuitSymbol:v.card.suitSymbol}),S())})}function x(){let e=document.getElementById(`${_}-save`),t=document.getElementById(`${_}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function S(){let e=document.getElementById(`${_}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function C(){if(!n())return;let e=l(),t=document.getElementById(`${_}-name1`);if(t&&(t.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${_}-month1`),i=document.getElementById(`${_}-day1`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function w(){b(),t(_),C(),setTimeout(()=>document.getElementById(`${_}-name1`)?.focus(),100)}var T=`modal-geolocation`,E=null;function D(){return`
<div class="modal-overlay" id="${T}" role="dialog" aria-modal="true" aria-labelledby="${T}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${T}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${T}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Every place carries an energetic signature. This reading reveals how a specific location
        interacts with your personal cards — ideal for travel, relocation, or understanding why
        certain places feel the way they do.
      </p>

      <div class="form-group">
        <label class="form-label" for="${T}-name">Your Name</label>
        <input class="form-input" id="${T}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>

      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${m(`${T}-month`,`${T}-day`)}
      </div>

      <div class="form-group">
        <label class="form-label" for="${T}-location">Location</label>
        <input class="form-input" id="${T}-location" type="text"
          placeholder="e.g. New York, Paris, Sedona, Tokyo…"
          autocomplete="off" required>
        <span class="form-hint">City, country, or any place name</span>
      </div>

      <div id="${T}-error" role="alert"
        style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${T}-submit" style="width:100%;">
        ✦ Reveal My Location Card
      </button>
    </div>

    <div id="${T}-step-result" style="display:none;">
      <div id="${T}-result-container"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--ghost" id="${T}-again" style="flex:1;">
          ← Try Another Location
        </button>
      </div>
      <button class="btn btn--ghost" id="${T}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${T}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function O(){if(!s(T,D()))return;let e=document.getElementById(`${T}-error`);document.getElementById(`${T}-submit`).addEventListener(`click`,()=>{let n=document.getElementById(`${T}-name`).value.trim()||`Seeker`,r=document.getElementById(`${T}-month`).value,i=document.getElementById(`${T}-day`).value,a=document.getElementById(`${T}-location`).value.trim();if(e.style.display=`none`,!r||!i){t(`Please select your birth month and day.`);return}if(!a){t(`Please enter a location name.`);return}let o=f(`${r}/${i}`,a);if(!o||!o.card){t(`Could not calculate the location card. Please check your inputs.`);return}document.getElementById(`${T}-result-container`).innerHTML=p(o.card,{eyebrow:`${n} · ${a}`,subheading:`Your Location Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${o.birthValue} + Location value ${o.locationValue}
          = Card #${o.reducedValue}
        </div>`}),E={card:o.card,eyebrow:`${n} · ${a}`,location:a},k(),document.getElementById(`${T}-step-form`).style.display=`none`,document.getElementById(`${T}-step-result`).style.display=`block`}),document.getElementById(`${T}-again`).addEventListener(`click`,()=>{E=null,document.getElementById(`${T}-step-form`).style.display=`block`,document.getElementById(`${T}-step-result`).style.display=`none`}),document.getElementById(`${T}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${T}-save-msg`);if(!n()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}E&&(g({type:`geolocation`,label:`Location Reading`,eyebrow:E.eyebrow,cardId:E.card.id,cardName:E.card.name,cardSuit:E.card.suit,cardSuitSymbol:E.card.suitSymbol}),A())});function t(t){e.textContent=t,e.style.display=`block`}}function k(){let e=document.getElementById(`${T}-save`),t=document.getElementById(`${T}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function A(){let e=document.getElementById(`${T}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function j(){if(!n())return;let e=l(),t=document.getElementById(`${T}-name`);if(t&&(t.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${T}-month`),i=document.getElementById(`${T}-day`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function M(){O(),t(T),j(),setTimeout(()=>document.getElementById(`${T}-name`)?.focus(),100)}var N={email:{id:`greeting-card-email`,name:`Send Greeting Card via Email`,type:`Digital Delivery`,icon:`✉`,price:499,description:`Your personalized Magi greeting card delivered to the recipient's inbox.`},print:{id:`greeting-card-print`,name:`Printable Greeting Card PDF`,type:`Digital Download`,icon:`🖨`,price:299,description:`A beautifully formatted PDF of your personalized Magi greeting card, ready to print.`}},P=`modal-greeting`;function F(){return`
<div class="modal-overlay" id="${P}" role="dialog" aria-modal="true" aria-labelledby="${P}-title">
  <div class="modal modal--fullscreen">
    <div class="modal__header">
      <h2 class="modal__title" id="${P}-title">Create a Greeting Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${P}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter the recipient's details to generate a personalized card drawn from their birth card energy.
      </p>

      <div class="form-group">
        <label class="form-label" for="${P}-name">Recipient's Name</label>
        <input class="form-input" id="${P}-name" type="text" placeholder="e.g. Sarah" required>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient's Birthdate</label>
        ${m(`${P}-month`,`${P}-day`)}
      </div>
      <div class="form-group">
        <label class="form-label">Occasion</label>
        <div class="chip-group" id="${P}-occasion-chips" style="margin-bottom:0.6rem;">
          <button class="chip" data-value="Birthday">🎂 Birthday</button>
          <button class="chip" data-value="Anniversary">♥ Anniversary</button>
          <button class="chip" data-value="New Year">✦ New Year</button>
          <button class="chip" data-value="Celebration">★ Celebration</button>
          <button class="chip" data-value="Just Because">Just Because</button>
        </div>
        <input class="form-input" id="${P}-occasion" type="text" placeholder="or type your own…">
      </div>
      <div class="form-group">
        <label class="form-label" for="${P}-message">Your Personal Message</label>
        <textarea class="form-input" id="${P}-message" rows="3"
          placeholder="Write your message here…"
          style="resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="${P}-from">From</label>
        <input class="form-input" id="${P}-from" type="text" placeholder="Your name">
      </div>

      <div id="${P}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${P}-submit" style="width:100%;">
        ✦ Generate Card
      </button>
    </div>

    <!-- STEP 2: Card Display -->
    <div id="${P}-step-result" style="display:none;">
      <div id="${P}-card-output"></div>

      <div class="greeting-actions">
        <div style="display:flex;gap:1rem;">
          <button class="btn btn--primary" id="${P}-buy-email" style="flex:1;">
            ✉ Send via Email
          </button>
          <button class="btn btn--secondary" id="${P}-buy-print" style="flex:1;">
            🖨 Print PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`}function I(e){return e.toLowerCase()}function L({name:e,occasion:t,message:n,from:r,card:i}){return`
<div class="greeting-reveal-wrapper">

  <!-- Cover: Mystic Oracle card shows first, then melts away -->
  <div class="greeting-cover" id="${P}-cover">
    <img src="/images/util/card_back.jpg" alt="The Mystic Oracle" class="greeting-cover__img">
  </div>

  <!-- Content: fades in after cover melts -->
  <div class="greeting-content" id="${P}-content">
    <div class="greeting-card card-display card-display--${I(i.suit)}" id="${P}-printable">

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

    <button class="greeting-replay-btn" id="${P}-replay" style="margin-top:1rem;">↺ Replay</button>
  </div>

</div>`}function R(){let t=s(P,F());if(!t)return;let n=document.getElementById(`${P}-error`),r=document.getElementById(`${P}-occasion`),i=t.querySelectorAll(`#${P}-occasion-chips .chip`);i.forEach(e=>{e.addEventListener(`click`,()=>{i.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),r.value=e.dataset.value})}),r.addEventListener(`input`,()=>{i.forEach(e=>e.classList.remove(`is-active`))}),document.getElementById(`${P}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${P}-name`).value.trim(),t=document.getElementById(`${P}-month`).value,r=document.getElementById(`${P}-day`).value,i=document.getElementById(`${P}-occasion`).value.trim(),a=document.getElementById(`${P}-message`).value.trim(),s=document.getElementById(`${P}-from`).value.trim();if(n.style.display=`none`,!e){o(`Please enter the recipient's name.`);return}if(!t||!r){o(`Please select the recipient's birth month and day.`);return}let c=d(`${t}/${r}`);if(!c||!c.card){o(`Could not calculate the birth card. Please check the date.`);return}let l=document.getElementById(`${P}-card-output`);l.innerHTML=L({name:e,occasion:i,message:a,from:s,card:c.card}),document.getElementById(`${P}-replay`).addEventListener(`click`,()=>{let e=document.getElementById(`${P}-cover`),t=document.getElementById(`${P}-content`);e.style.animation=`none`,t.style.animation=`none`,t.style.opacity=`0`,e.offsetWidth,e.style.animation=``,t.style.animation=``}),c.card,document.getElementById(`${P}-step-form`).style.display=`none`,document.getElementById(`${P}-step-result`).style.display=`flex`}),document.getElementById(`${P}-buy-email`).addEventListener(`click`,()=>{a(N.email),e()}),document.getElementById(`${P}-buy-print`).addEventListener(`click`,()=>{a(N.print),e()});function o(e){n.textContent=e,n.style.display=`block`}}function z(){if(!n())return;let e=l(),t=document.getElementById(`${P}-from`);t&&(t.value=e.name??``)}function B(){R(),t(P),z(),setTimeout(()=>document.getElementById(`${P}-name`)?.focus(),100)}i(),c(),r(`#site-header-mount`,{activePath:`/readings.html`}),o(`#site-footer-mount`),document.body.classList.replace(`js-loading`,`js-ready`);var V={"birth-card":h,compatibility:w,geolocation:M,"greeting-card":B};document.querySelectorAll(`[data-feature]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=V[e.dataset.feature];t&&t()})});var H=new URLSearchParams(location.search).get(`open`);H&&V[H]&&V[H]();