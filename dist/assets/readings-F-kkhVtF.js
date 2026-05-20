import{a as e,i as t,l as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./PageAnimations-SjEbwQho.js";import{n as l}from"./CardResult-Dyqsb-xX.js";import{a as u,c as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,u as x}from"./GeolocationModal-Mojw7EHw.js";var S={email:{id:`greeting-card-email`,name:`Send Greeting Card via Email`,type:`Digital Delivery`,icon:`✉`,price:499,description:`Your personalized Magi greeting card delivered to the recipient's inbox.`},print:{id:`greeting-card-print`,name:`Printable Greeting Card PDF`,type:`Digital Download`,icon:`🖨`,price:299,description:`A beautifully formatted PDF of your personalized Magi greeting card, ready to print.`}},C=`modal-greeting`,w=null;function T(){return`
<div class="modal-overlay" id="${C}" role="dialog" aria-modal="true" aria-labelledby="${C}-title">
  <div class="modal modal--fullscreen">
    <div class="modal__header">
      <h2 class="modal__title" id="${C}-title">Create a Greeting Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <!-- STEP 1: Form -->
    <div id="${C}-step-form">
      <p class="modal__intro">
        Enter the recipient's details to generate a personalized card drawn from their birth card energy.
      </p>

      <div class="form-group">
        <label class="form-label" for="${C}-name">Recipient's Name</label>
        <input class="form-input" id="${C}-name" type="text" placeholder="e.g. Sarah" required>
      </div>
      <div class="form-group">
        <label class="form-label">Recipient's Birthdate</label>
        ${m(`${C}-month`,`${C}-day`)}
      </div>
      <div class="form-group">
        <label class="form-label">Occasion</label>
        <div class="chip-group" id="${C}-occasion-chips" style="margin-bottom:0.6rem;">
          <button class="chip" data-value="Birthday">🎂 Birthday</button>
          <button class="chip" data-value="Anniversary">♥ Anniversary</button>
          <button class="chip" data-value="New Year">✦ New Year</button>
          <button class="chip" data-value="Celebration">★ Celebration</button>
          <button class="chip" data-value="Just Because">Just Because</button>
        </div>
        <input class="form-input" id="${C}-occasion" type="text" placeholder="or type your own…">
      </div>
      <div class="form-group">
        <label class="form-label" for="${C}-message">Your Personal Message</label>
        <textarea class="form-input" id="${C}-message" rows="3"
          placeholder="Write your message here…"
          style="resize:vertical;"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="${C}-from">From</label>
        <input class="form-input" id="${C}-from" type="text" placeholder="Your name">
      </div>

      <div id="${C}-error" role="alert" class="modal__error"></div>

      <button class="btn btn--primary btn--full" id="${C}-submit">
        ✦ Generate Card
      </button>
    </div>

    <!-- STEP 2: Card Display -->
    <div id="${C}-step-result" style="display:none;">
      <div id="${C}-card-output"></div>

      <div class="greeting-actions">
        <div style="display:flex;gap:1rem;">
          <button class="btn btn--primary" id="${C}-buy-email" style="flex:1;">
            ✉ Send via Email
          </button>
          <button class="btn btn--secondary" id="${C}-buy-print" style="flex:1;">
            🖨 Print PDF
          </button>
        </div>
      </div>
      <button class="btn btn--ghost modal__save-btn" id="${C}-save">
        ♦ Save Reading
      </button>
      <div id="${C}-save-msg" class="modal__save-msg"></div>
    </div>
  </div>
</div>`}function E(e){return e.toLowerCase()}function D({name:e,occasion:t,message:n,from:r,card:i}){return`
<div class="greeting-reveal-wrapper">

  <!-- Cover: Mystic Oracle card shows first, then melts away -->
  <div class="greeting-cover" id="${C}-cover">
    <img src="/assets/util/card_back.jpg" alt="The Mystic Oracle" class="greeting-cover__img">
  </div>

  <!-- Content: fades in after cover melts -->
  <div class="greeting-content" id="${C}-content">
    <div class="greeting-card card-display card-display--${E(i.suit)}" id="${C}-printable">

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

      <div class="card-description" style="font-size:0.95rem;margin:0.5rem 0;line-height:1.7;text-align:center;">
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

    <button class="greeting-replay-btn" id="${C}-replay" style="margin-top:1rem;">↺ Replay</button>
  </div>

</div>`}function O(){let n=i(C,T());if(!n)return;let r=document.getElementById(`${C}-occasion`),a=n.querySelectorAll(`#${C}-occasion-chips .chip`);a.forEach(e=>{e.addEventListener(`click`,()=>{a.forEach(e=>e.classList.remove(`is-active`)),e.classList.add(`is-active`),r.value=e.dataset.value})}),r.addEventListener(`input`,()=>{a.forEach(e=>e.classList.remove(`is-active`))}),document.getElementById(`${C}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${C}-name`).value.trim(),t=document.getElementById(`${C}-month`).value,n=document.getElementById(`${C}-day`).value,r=document.getElementById(`${C}-occasion`).value.trim(),i=document.getElementById(`${C}-message`).value.trim(),a=document.getElementById(`${C}-from`).value.trim();if(y(C),!e){x(C,`Please enter the recipient's name.`);return}if(!t||!n){x(C,`Please select the recipient's birth month and day.`);return}let o=l(`${t}/${n}`);if(!o||!o.card){x(C,`Could not calculate the birth card. Please check the date.`);return}let s=document.getElementById(`${C}-card-output`);s.innerHTML=D({name:e,occasion:r,message:i,from:a,card:o.card}),document.getElementById(`${C}-replay`).addEventListener(`click`,()=>{let e=document.getElementById(`${C}-cover`),t=document.getElementById(`${C}-content`);e.style.animation=`none`,t.style.animation=`none`,t.style.opacity=`0`,e.offsetWidth,e.style.animation=``,t.style.animation=``}),w={card:o.card,eyebrow:e},p(C),document.getElementById(`${C}-step-form`).style.display=`none`,document.getElementById(`${C}-step-result`).style.display=`flex`}),document.getElementById(`${C}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${C}-save-msg`);if(!c()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}w&&(_({type:`greeting-card`,label:`Greeting Card Reading`,eyebrow:w.eyebrow,cardId:w.card.id,cardName:w.card.name,cardSuit:w.card.suit,cardSuitSymbol:w.card.suitSymbol}),d(C))}),document.getElementById(`${C}-buy-email`).addEventListener(`click`,()=>{e(S.email),t()}),document.getElementById(`${C}-buy-print`).addEventListener(`click`,()=>{e(S.print),t()})}function k(){if(!c())return;let e=n(),t=document.getElementById(`${C}-from`);t&&(t.value=e.name??``)}function A(){O(),o(C),k(),setTimeout(()=>document.getElementById(`${C}-name`)?.focus(),100)}s(),a(`#site-header-mount`,{activePath:`/readings.html`}),r(`#site-footer-mount`),document.body.classList.replace(`js-loading`,`js-ready`);var j={"birth-card":u,compatibility:v,geolocation:b,"greeting-card":A};document.querySelectorAll(`[data-feature]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=j[e.dataset.feature];t&&t()})});var M=new URLSearchParams(location.search).get(`open`);M&&j[M]&&j[M]();var N=sessionStorage.getItem(`magi_reopen`);if(N){sessionStorage.removeItem(`magi_reopen`);try{let e=JSON.parse(N);e.type===`birth-card`?g(e):e.type===`compatibility`?f(e):e.type===`geolocation`&&h(e)}catch{}}