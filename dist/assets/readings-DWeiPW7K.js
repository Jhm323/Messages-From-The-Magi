import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,t as s}from"./Footer-D4rECF6l.js";import{o as c,r as l,s as u,t as d}from"./CardResult-ICDmN0RT.js";import{n as f,t as p}from"./BirthCardModal-CkMXckwb.js";import{r as m}from"./SavedReadings-1dH3-Zbr.js";import"./SelectionChip-CB9M93dA.js";var h=`modal-compatibility`,g=null;function _(){return`
<div class="modal-overlay" id="${h}" role="dialog" aria-modal="true" aria-labelledby="${h}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${h}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${h}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter both birthdates to reveal the card that governs your connection.
      </p>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${h}-name1">Your Name</label>
        <input class="form-input" id="${h}-name1" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${f(`${h}-month1`,`${h}-day1`)}
      </div>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${h}-name2">Partner's Name</label>
        <input class="form-input" id="${h}-name2" type="text" placeholder="Their name" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Partner's Birthdate</label>
        ${f(`${h}-month2`,`${h}-day2`)}
      </div>

      <div id="${h}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${h}-submit" style="width:100%;margin-top:0.5rem;">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${h}-step-result" style="display:none;">
      <div id="${h}-result-container"></div>
      <button class="btn btn--ghost" id="${h}-again" style="width:100%;margin-top:1.5rem;">
        ← Try Another Reading
      </button>
      <button class="btn btn--ghost" id="${h}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${h}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function v(){if(!e(h,_()))return;let t=document.getElementById(`${h}-error`);document.getElementById(`${h}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${h}-name1`).value.trim()||`Person 1`,n=document.getElementById(`${h}-month1`).value,r=document.getElementById(`${h}-day1`).value,i=document.getElementById(`${h}-name2`).value.trim()||`Person 2`,a=document.getElementById(`${h}-month2`).value,o=document.getElementById(`${h}-day2`).value;if(t.style.display=`none`,!n||!r||!a||!o){t.textContent=`Please select both birthdates to continue.`,t.style.display=`block`;return}let s=c(`${n}/${r}`,`${a}/${o}`);if(!s||!s.card){t.textContent=`Something went wrong. Please check the dates and try again.`,t.style.display=`block`;return}document.getElementById(`${h}-result-container`).innerHTML=d(s.card,{eyebrow:`${e} & ${i}`,subheading:`Your Compatibility Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${s.card.id} · Numerological value: ${s.reducedValue}
      </p>`}),g={card:s.card,eyebrow:`${e} & ${i}`},y(),document.getElementById(`${h}-step-form`).style.display=`none`,document.getElementById(`${h}-step-result`).style.display=`block`}),document.getElementById(`${h}-again`).addEventListener(`click`,()=>{g=null,document.getElementById(`${h}-step-form`).style.display=`block`,document.getElementById(`${h}-step-result`).style.display=`none`}),document.getElementById(`${h}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${h}-save-msg`);if(!r()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}g&&(m({type:`compatibility`,label:`Compatibility Reading`,eyebrow:g.eyebrow,cardId:g.card.id,cardName:g.card.name,cardSuit:g.card.suit,cardSuitSymbol:g.card.suitSymbol}),b())})}function y(){let e=document.getElementById(`${h}-save`),t=document.getElementById(`${h}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function b(){let e=document.getElementById(`${h}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function x(){if(!r())return;let e=t(),n=document.getElementById(`${h}-name1`);if(n&&(n.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${h}-month1`),i=document.getElementById(`${h}-day1`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function S(){v(),a(h),x(),setTimeout(()=>document.getElementById(`${h}-name1`)?.focus(),100)}var C=`modal-geolocation`,w=null;function T(){return`
<div class="modal-overlay" id="${C}" role="dialog" aria-modal="true" aria-labelledby="${C}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${C}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${C}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Every place carries an energetic signature. This reading reveals how a specific location
        interacts with your personal cards — ideal for travel, relocation, or understanding why
        certain places feel the way they do.
      </p>

      <div class="form-group">
        <label class="form-label" for="${C}-name">Your Name</label>
        <input class="form-input" id="${C}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>

      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${f(`${C}-month`,`${C}-day`)}
      </div>

      <div class="form-group">
        <label class="form-label" for="${C}-location">Location</label>
        <input class="form-input" id="${C}-location" type="text"
          placeholder="e.g. New York, Paris, Sedona, Tokyo…"
          autocomplete="off" required>
        <span class="form-hint">City, country, or any place name</span>
      </div>

      <div id="${C}-error" role="alert"
        style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${C}-submit" style="width:100%;">
        ✦ Reveal My Location Card
      </button>
    </div>

    <div id="${C}-step-result" style="display:none;">
      <div id="${C}-result-container"></div>

      <div style="display:flex;gap:1rem;margin-top:1.5rem;">
        <button class="btn btn--ghost" id="${C}-again" style="flex:1;">
          ← Try Another Location
        </button>
      </div>
      <button class="btn btn--ghost" id="${C}-save" style="width:100%;margin-top:0.75rem;">
        ♦ Save Reading
      </button>
      <div id="${C}-save-msg" style="font-size:0.78rem;text-align:center;color:var(--color-mist);margin-top:0.4rem;min-height:1.2em;"></div>
    </div>
  </div>
</div>`}function E(){if(!e(C,T()))return;let t=document.getElementById(`${C}-error`);document.getElementById(`${C}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${C}-name`).value.trim()||`Seeker`,r=document.getElementById(`${C}-month`).value,i=document.getElementById(`${C}-day`).value,a=document.getElementById(`${C}-location`).value.trim();if(t.style.display=`none`,!r||!i){n(`Please select your birth month and day.`);return}if(!a){n(`Please enter a location name.`);return}let o=u(`${r}/${i}`,a);if(!o||!o.card){n(`Could not calculate the location card. Please check your inputs.`);return}document.getElementById(`${C}-result-container`).innerHTML=d(o.card,{eyebrow:`${e} · ${a}`,subheading:`Your Location Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${o.birthValue} + Location value ${o.locationValue}
          = Card #${o.reducedValue}
        </div>`}),w={card:o.card,eyebrow:`${e} · ${a}`,location:a},D(),document.getElementById(`${C}-step-form`).style.display=`none`,document.getElementById(`${C}-step-result`).style.display=`block`}),document.getElementById(`${C}-again`).addEventListener(`click`,()=>{w=null,document.getElementById(`${C}-step-form`).style.display=`block`,document.getElementById(`${C}-step-result`).style.display=`none`}),document.getElementById(`${C}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${C}-save-msg`);if(!r()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}w&&(m({type:`geolocation`,label:`Location Reading`,eyebrow:w.eyebrow,cardId:w.card.id,cardName:w.card.name,cardSuit:w.card.suit,cardSuitSymbol:w.card.suitSymbol}),O())});function n(e){t.textContent=e,t.style.display=`block`}}function D(){let e=document.getElementById(`${C}-save`),t=document.getElementById(`${C}-save-msg`);e&&(e.textContent=`♦ Save Reading`,e.disabled=!1),t&&(t.textContent=``)}function O(){let e=document.getElementById(`${C}-save`);e&&(e.textContent=`✓ Saved`,e.disabled=!0)}function k(){if(!r())return;let e=t(),n=document.getElementById(`${C}-name`);if(n&&(n.value=e.name??``),e.birthday){let[,t,n]=e.birthday.split(`-`).map(Number),r=document.getElementById(`${C}-month`),i=document.getElementById(`${C}-day`);r&&(r.value=String(t)),i&&(i.value=String(n))}}function A(){E(),a(C),k(),setTimeout(()=>document.getElementById(`${C}-name`)?.focus(),100)}var j={email:{id:`greeting-card-email`,name:`Send Greeting Card via Email`,type:`Digital Delivery`,icon:`✉`,price:499,description:`Your personalized Magi greeting card delivered to the recipient's inbox.`},print:{id:`greeting-card-print`,name:`Printable Greeting Card PDF`,type:`Digital Download`,icon:`🖨`,price:299,description:`A beautifully formatted PDF of your personalized Magi greeting card, ready to print.`}},M=`modal-greeting`;function N(){return`
<div class="modal-overlay" id="${M}" role="dialog" aria-modal="true" aria-labelledby="${M}-title">
  <div class="modal modal--fullscreen">
    <div class="modal__header">
      <h2 class="modal__title" id="${M}-title">Create a Greeting Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${M}-step-form">
      <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
        Enter the recipient's details to generate a personalized card drawn from their birth card energy.
      </p>

      <div class="form-group">
        <label class="form-label" for="${M}-name">Recipient's Name</label>
        <input class="form-input" id="${M}-name" type="text" placeholder="e.g. Sarah" required>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient's Birthdate</label>
        ${f(`${M}-month`,`${M}-day`)}
      </div>
      <div class="form-group">
        <label class="form-label">Occasion</label>
        <div class="chip-group" id="${M}-occasion-chips" style="margin-bottom:0.6rem;">
          <button class="chip" data-value="Birthday">🎂 Birthday</button>
          <button class="chip" data-value="Anniversary">♥ Anniversary</button>
          <button class="chip" data-value="New Year">✦ New Year</button>
          <button class="chip" data-value="Celebration">★ Celebration</button>
          <button class="chip" data-value="Just Because">Just Because</button>
        </div>
        <input class="form-input" id="${M}-occasion" type="text" placeholder="or type your own…">
      </div>
      <div class="form-group">
        <label class="form-label" for="${M}-message">Your Personal Message</label>
        <textarea class="form-input" id="${M}-message" rows="3"
          placeholder="Write your message here…"
          style="resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="${M}-from">From</label>
        <input class="form-input" id="${M}-from" type="text" placeholder="Your name">
      </div>

      <div id="${M}-error" role="alert" style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

      <button class="btn btn--primary" id="${M}-submit" style="width:100%;">
        ✦ Generate Card
      </button>
    </div>

    <!-- STEP 2: Card Display -->
    <div id="${M}-step-result" style="display:none;">
      <div id="${M}-card-output"></div>

      <div class="greeting-actions">
        <div style="display:flex;gap:1rem;">
          <button class="btn btn--primary" id="${M}-buy-email" style="flex:1;">
            ✉ Send via Email
          </button>
          <button class="btn btn--secondary" id="${M}-buy-print" style="flex:1;">
            🖨 Print PDF
          </button>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:0.6rem;padding:0 0.25rem;">
          <span style="font-size:0.75rem;color:var(--color-mist);font-family:var(--font-heading);letter-spacing:0.06em;">
            ✉ $4.99 · 🖨 $2.99
          </span>
          <button class="btn btn--ghost" id="${M}-again"
            style="font-size:0.72rem;padding:0.35rem 0.9rem;border-radius:999px;">
            ← New Card
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`}function P(e){return e.toLowerCase()}function F({name:e,occasion:t,message:n,from:r,card:i}){return`
<div class="greeting-reveal-wrapper">

  <!-- Cover: Mystic Oracle card shows first, then melts away -->
  <div class="greeting-cover" id="${M}-cover">
    <img src="/images/util/card_back.jpg" alt="The Mystic Oracle" class="greeting-cover__img">
  </div>

  <!-- Content: fades in after cover melts -->
  <div class="greeting-content" id="${M}-content">
    <div class="greeting-card card-display card-display--${P(i.suit)}" id="${M}-printable">

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

    <button class="greeting-replay-btn" id="${M}-replay" style="margin-top:1rem;">↺ Replay</button>
  </div>

</div>`}function I(){let t=e(M,N());if(!t)return;let r=document.getElementById(`${M}-error`),i=document.getElementById(`${M}-occasion`),a=t.querySelectorAll(`#${M}-occasion-chips .chip`);a.forEach(e=>{e.addEventListener(`click`,()=>{a.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),i.value=e.dataset.value})}),i.addEventListener(`input`,()=>{a.forEach(e=>e.classList.remove(`is-active`))}),document.getElementById(`${M}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${M}-name`).value.trim(),t=document.getElementById(`${M}-month`).value,n=document.getElementById(`${M}-day`).value,i=document.getElementById(`${M}-occasion`).value.trim(),a=document.getElementById(`${M}-message`).value.trim(),o=document.getElementById(`${M}-from`).value.trim();if(r.style.display=`none`,!e){s(`Please enter the recipient's name.`);return}if(!t||!n){s(`Please select the recipient's birth month and day.`);return}let c=l(`${t}/${n}`);if(!c||!c.card){s(`Could not calculate the birth card. Please check the date.`);return}let u=document.getElementById(`${M}-card-output`);u.innerHTML=F({name:e,occasion:i,message:a,from:o,card:c.card}),document.getElementById(`${M}-replay`).addEventListener(`click`,()=>{let e=document.getElementById(`${M}-cover`),t=document.getElementById(`${M}-content`);e.style.animation=`none`,t.style.animation=`none`,t.style.opacity=`0`,e.offsetWidth,e.style.animation=``,t.style.animation=``}),c.card,document.getElementById(`${M}-step-form`).style.display=`none`,document.getElementById(`${M}-step-result`).style.display=`flex`}),document.getElementById(`${M}-again`).addEventListener(`click`,()=>{c()}),document.getElementById(`${M}-buy-email`).addEventListener(`click`,()=>{n(j.email),o()}),document.getElementById(`${M}-buy-print`).addEventListener(`click`,()=>{n(j.print),o()});function s(e){r.textContent=e,r.style.display=`block`}function c(){document.getElementById(`${M}-step-form`).style.display=``,document.getElementById(`${M}-step-result`).style.display=`none`}}function L(){if(!r())return;let e=t(),n=document.getElementById(`${M}-from`);n&&(n.value=e.name??``)}function R(){I(),a(M),L(),setTimeout(()=>document.getElementById(`${M}-name`)?.focus(),100)}i(`#site-header-mount`,{activePath:`/readings.html`}),s(`#site-footer-mount`),document.body.classList.replace(`js-loading`,`js-ready`);var z={"birth-card":p,compatibility:S,geolocation:A,"greeting-card":R};document.querySelectorAll(`[data-feature]`).forEach(e=>{e.style.cursor=`pointer`,e.addEventListener(`click`,()=>{let t=z[e.dataset.feature];t&&t()})});var B=new URLSearchParams(location.search).get(`open`);B&&z[B]&&z[B]();