import{l as e,o as t,s as n,u as r}from"./PageAnimations-SjEbwQho.js";import{a as i,n as a,o,t as s}from"./CardResult-Dyqsb-xX.js";function c(e,t){return`<div class="form-date-selects">
    <select class="form-input" id="${e}" required>
      <option value="">Month</option>${[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`].map((e,t)=>`<option value="${t+1}">${e}</option>`).join(``)}
    </select>
    <select class="form-input" id="${t}" required>
      <option value="">Day</option>${Array.from({length:31},(e,t)=>`<option value="${t+1}">${t+1}</option>`).join(``)}
    </select>
  </div>`}var l=`magi_readings`;function u(){try{return JSON.parse(localStorage.getItem(l))??[]}catch{return[]}}function d(e){let t=u(),n={id:Date.now().toString(),savedAt:new Date().toISOString(),...e};return t.unshift(n),localStorage.setItem(l,JSON.stringify(t)),n}function f(e){let t=u().filter(t=>t.id!==e);localStorage.setItem(l,JSON.stringify(t))}function p(e){let t=document.getElementById(`${e}-save`),n=document.getElementById(`${e}-save-msg`);t&&(t.textContent=`♦ Save Reading`,t.disabled=!1),n&&(n.textContent=``)}function m(e){let t=document.getElementById(`${e}-save`);t&&(t.textContent=`✓ Saved`,t.disabled=!0)}function h(e,t){let n=document.getElementById(`${e}-error`);n&&(n.textContent=t,n.style.display=`block`)}function g(e){let t=document.getElementById(`${e}-error`);t&&(t.style.display=`none`)}function _(e,t,n={}){let r=n.name??`${e}-name`,i=n.month??`${e}-month`,a=n.day??`${e}-day`,o=document.getElementById(r);if(o&&t.name&&(o.value=t.name),t.birthday){let[,e,n]=t.birthday.split(`-`).map(Number),r=document.getElementById(i),o=document.getElementById(a);r&&(r.value=String(e)),o&&(o.value=String(n))}}var v=`modal-birthcard`,y=null;function b(){return`
<div class="modal-overlay" id="${v}" role="dialog" aria-modal="true" aria-labelledby="${v}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${v}-title">Your Birth Card</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${v}-step-form">
      <p class="modal__intro">
        Your Birth Card is the energetic signature you were born with — the card that reflects
        your soul's nature, your gifts, and your path in this life.
      </p>

      <div class="form-group">
        <label class="form-label" for="${v}-name">Your Name</label>
        <input class="form-input" id="${v}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${c(`${v}-month`,`${v}-day`)}
      </div>

      <div id="${v}-error" role="alert" class="modal__error"></div>

      <button class="btn btn--primary btn--full" id="${v}-submit">
        ✦ Reveal My Birth Card
      </button>
    </div>

    <div id="${v}-step-result" style="display:none;">
      <div id="${v}-result-container"></div>
      <div class="modal__actions">
        <button class="btn btn--ghost" id="${v}-again">← New Reading</button>
        <button class="btn btn--secondary" id="${v}-learn" disabled>Expand Reading ✦</button>
      </div>
      <button class="btn btn--ghost modal__save-btn" id="${v}-save">
        ♦ Save Reading
      </button>
      <div id="${v}-save-msg" class="modal__save-msg"></div>
      <p class="modal__tier-note">
        Expanded readings available in Seeker tier
      </p>
    </div>
  </div>
</div>`}function x(){t(v,b())&&(document.getElementById(`${v}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${v}-name`).value.trim()||`Seeker`,t=document.getElementById(`${v}-month`).value,n=document.getElementById(`${v}-day`).value;if(g(v),!t||!n){h(v,`Please select your birth month and day.`);return}let r=a(`${t}/${n}`);if(!r||!r.card){h(v,`Could not calculate your birth card. Please check the date.`);return}document.getElementById(`${v}-result-container`).innerHTML=s(r.card,{eyebrow:e,subheading:`Your Birth Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),y={card:r.card,eyebrow:e,month:t,day:n},p(v),document.getElementById(`${v}-step-form`).style.display=`none`,document.getElementById(`${v}-step-result`).style.display=`block`}),document.getElementById(`${v}-again`).addEventListener(`click`,()=>{y=null,document.getElementById(`${v}-step-form`).style.display=`block`,document.getElementById(`${v}-step-result`).style.display=`none`}),document.getElementById(`${v}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${v}-save-msg`);if(!r()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}y&&(d({type:`birth-card`,label:`Birth Card Reading`,eyebrow:y.eyebrow,cardId:y.card.id,cardName:y.card.name,cardSuit:y.card.suit,cardSuitSymbol:y.card.suitSymbol,inputs:{name:y.eyebrow,month:y.month,day:y.day}}),m(v))}))}function S(){x(),n(v),r()&&_(v,e()),setTimeout(()=>document.getElementById(`${v}-name`)?.focus(),100)}function C(e){x(),n(v);let{name:t,month:r,day:i}=e.inputs??{},o=a(`${r}/${i}`);if(!o?.card)return;let c=document.getElementById(`${v}-name`),l=document.getElementById(`${v}-month`),u=document.getElementById(`${v}-day`);c&&(c.value=t??``),l&&(l.value=r??``),u&&(u.value=i??``),document.getElementById(`${v}-result-container`).innerHTML=s(o.card,{eyebrow:t,subheading:`Your Birth Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),y={card:o.card,eyebrow:t,month:r,day:i},p(v),document.getElementById(`${v}-step-form`).style.display=`none`,document.getElementById(`${v}-step-result`).style.display=`block`}var w=`modal-compatibility`,T=null;function E(){return`
<div class="modal-overlay" id="${w}" role="dialog" aria-modal="true" aria-labelledby="${w}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${w}-title">Compatibility Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div class="modal-step" id="${w}-step-form">
      <p class="modal__intro">
        Enter both birthdates to reveal the card that governs your connection.
      </p>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${w}-name1">Your Name</label>
        <input class="form-input" id="${w}-name1" type="text" placeholder="Your name" autocomplete="given-name">
      </div>
      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${c(`${w}-month1`,`${w}-day1`)}
      </div>

      <div class="divider--glyph">♥</div>

      <div class="form-group">
        <label class="form-label" for="${w}-name2">Partner's Name</label>
        <input class="form-input" id="${w}-name2" type="text" placeholder="Their name" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Partner's Birthdate</label>
        ${c(`${w}-month2`,`${w}-day2`)}
      </div>

      <div id="${w}-error" role="alert" class="modal__error"></div>

      <button class="btn btn--primary btn--full modal__submit" id="${w}-submit">
        ✦ Reveal Compatibility Card
      </button>
    </div>

    <div class="modal-step" id="${w}-step-result" style="display:none;">
      <div id="${w}-result-container"></div>
      <button class="btn btn--ghost btn--full modal__again-btn" id="${w}-again">
        ← Try Another Reading
      </button>
      <button class="btn btn--ghost modal__save-btn" id="${w}-save">
        ♦ Save Reading
      </button>
      <div id="${w}-save-msg" class="modal__save-msg"></div>
    </div>
  </div>
</div>`}function D(){t(w,E())&&(document.getElementById(`${w}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${w}-name1`).value.trim()||`Person 1`,t=document.getElementById(`${w}-month1`).value,n=document.getElementById(`${w}-day1`).value,r=document.getElementById(`${w}-name2`).value.trim()||`Person 2`,a=document.getElementById(`${w}-month2`).value,o=document.getElementById(`${w}-day2`).value;if(g(w),!t||!n||!a||!o){h(w,`Please select both birthdates to continue.`);return}let c=i(`${t}/${n}`,`${a}/${o}`);if(!c||!c.card){h(w,`Something went wrong. Please check the dates and try again.`);return}document.getElementById(`${w}-result-container`).innerHTML=s(c.card,{eyebrow:`${e} & ${r}`,subheading:`Your Compatibility Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${c.card.id} · Numerological value: ${c.reducedValue}
      </p>`}),T={card:c.card,eyebrow:`${e} & ${r}`,name1:e,month1:t,day1:n,name2:r,month2:a,day2:o},p(w),document.getElementById(`${w}-step-form`).style.display=`none`,document.getElementById(`${w}-step-result`).style.display=`block`}),document.getElementById(`${w}-again`).addEventListener(`click`,()=>{T=null,document.getElementById(`${w}-step-form`).style.display=`block`,document.getElementById(`${w}-step-result`).style.display=`none`}),document.getElementById(`${w}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${w}-save-msg`);if(!r()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}T&&(d({type:`compatibility`,label:`Compatibility Reading`,eyebrow:T.eyebrow,cardId:T.card.id,cardName:T.card.name,cardSuit:T.card.suit,cardSuitSymbol:T.card.suitSymbol,inputs:{name1:T.name1,month1:T.month1,day1:T.day1,name2:T.name2,month2:T.month2,day2:T.day2}}),m(w))}))}function O(){D(),n(w),r()&&_(w,e(),{name:`${w}-name1`,month:`${w}-month1`,day:`${w}-day1`}),setTimeout(()=>document.getElementById(`${w}-name1`)?.focus(),100)}function k(e){D(),n(w);let{name1:t,month1:r,day1:a,name2:o,month2:c,day2:l}=e.inputs??{},u=i(`${r}/${a}`,`${c}/${l}`);if(!u?.card)return;let d=(e,t)=>{let n=document.getElementById(e);n&&(n.value=t??``)};d(`${w}-name1`,t),d(`${w}-month1`,r),d(`${w}-day1`,a),d(`${w}-name2`,o),d(`${w}-month2`,c),d(`${w}-day2`,l),document.getElementById(`${w}-result-container`).innerHTML=s(u.card,{eyebrow:`${t} & ${o}`,subheading:`Your Compatibility Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`<p style="color:var(--color-dawn);font-size:0.8rem;text-align:center;margin-top:0.5rem;">
        Card #${u.card.id} · Numerological value: ${u.reducedValue}
      </p>`}),T={card:u.card,eyebrow:`${t} & ${o}`,name1:t,month1:r,day1:a,name2:o,month2:c,day2:l},p(w),document.getElementById(`${w}-step-form`).style.display=`none`,document.getElementById(`${w}-step-result`).style.display=`block`}var A=`modal-geolocation`,j=null;function M(){return`
<div class="modal-overlay" id="${A}" role="dialog" aria-modal="true" aria-labelledby="${A}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${A}-title">Location Reading</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <div id="${A}-step-form">
      <p class="modal__intro">
        Every place carries an energetic signature. This reading reveals how a specific location
        interacts with your personal cards — ideal for travel, relocation, or understanding why
        certain places feel the way they do.
      </p>

      <div class="form-group">
        <label class="form-label" for="${A}-name">Your Name</label>
        <input class="form-input" id="${A}-name" type="text" placeholder="Your name" autocomplete="given-name">
      </div>

      <div class="form-group">
        <label class="form-label">Your Birthdate</label>
        ${c(`${A}-month`,`${A}-day`)}
      </div>

      <div class="form-group">
        <label class="form-label" for="${A}-location">Location</label>
        <input class="form-input" id="${A}-location" type="text"
          placeholder="e.g. New York, Paris, Sedona, Tokyo…"
          autocomplete="off" required>
        <span class="form-hint">City, country, or any place name</span>
      </div>

      <div id="${A}-error" role="alert" class="modal__error"></div>

      <button class="btn btn--primary btn--full" id="${A}-submit">
        ✦ Reveal My Location Card
      </button>
    </div>

    <div id="${A}-step-result" style="display:none;">
      <div id="${A}-result-container"></div>

      <div class="modal__actions">
        <button class="btn btn--ghost" id="${A}-again">
          ← Try Another Location
        </button>
      </div>
      <button class="btn btn--ghost modal__save-btn" id="${A}-save">
        ♦ Save Reading
      </button>
      <div id="${A}-save-msg" class="modal__save-msg"></div>
    </div>
  </div>
</div>`}function N(){t(A,M())&&(document.getElementById(`${A}-submit`).addEventListener(`click`,()=>{let e=document.getElementById(`${A}-name`).value.trim()||`Seeker`,t=document.getElementById(`${A}-month`).value,n=document.getElementById(`${A}-day`).value,r=document.getElementById(`${A}-location`).value.trim();if(g(A),!t||!n){h(A,`Please select your birth month and day.`);return}if(!r){h(A,`Please enter a location name.`);return}let i=o(`${t}/${n}`,r);if(!i||!i.card){h(A,`Could not calculate the location card. Please check your inputs.`);return}document.getElementById(`${A}-result-container`).innerHTML=s(i.card,{eyebrow:`${e} · ${r}`,subheading:`Your Location Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${i.birthValue} + Location value ${i.locationValue}
          = Card #${i.reducedValue}
        </div>`}),j={card:i.card,eyebrow:`${e} · ${r}`,name:e,month:t,day:n,location:r},p(A),document.getElementById(`${A}-step-form`).style.display=`none`,document.getElementById(`${A}-step-result`).style.display=`block`}),document.getElementById(`${A}-again`).addEventListener(`click`,()=>{j=null,document.getElementById(`${A}-step-form`).style.display=`block`,document.getElementById(`${A}-step-result`).style.display=`none`}),document.getElementById(`${A}-save`).addEventListener(`click`,()=>{let e=document.getElementById(`${A}-save-msg`);if(!r()){e.textContent=`Sign in to save your readings.`,e.style.color=`var(--color-gold-muted)`;return}j&&(d({type:`geolocation`,label:`Location Reading`,eyebrow:j.eyebrow,cardId:j.card.id,cardName:j.card.name,cardSuit:j.card.suit,cardSuitSymbol:j.card.suitSymbol,inputs:{name:j.name,month:j.month,day:j.day,location:j.location}}),m(A))}))}function P(){N(),n(A),r()&&_(A,e()),setTimeout(()=>document.getElementById(`${A}-name`)?.focus(),100)}function F(e){N(),n(A);let{name:t,month:r,day:i,location:a}=e.inputs??{},c=o(`${r}/${i}`,a);if(!c?.card)return;let l=(e,t)=>{let n=document.getElementById(e);n&&(n.value=t??``)};l(`${A}-name`,t),l(`${A}-month`,r),l(`${A}-day`,i),l(`${A}-location`,a),document.getElementById(`${A}-result-container`).innerHTML=s(c.card,{eyebrow:`${t} · ${a}`,subheading:`Your Location Card`,showAffirmation:!0,showAction:!0,showDescription:!0,extra:`
        <div style="margin-top:1rem;padding:0.75rem 1rem;background:rgba(255,255,255,0.03);
          border-radius:var(--radius-md);font-size:0.8rem;color:var(--color-dawn);text-align:center;
          font-family:var(--font-heading);letter-spacing:0.06em;">
          Birth value ${c.birthValue} + Location value ${c.locationValue}
          = Card #${c.reducedValue}
        </div>`}),j={card:c.card,eyebrow:`${t} · ${a}`,name:t,month:r,day:i,location:a},p(A),document.getElementById(`${A}-step-form`).style.display=`none`,document.getElementById(`${A}-step-result`).style.display=`block`}export{S as a,m as c,f as d,u as f,k as i,p as l,c as m,F as n,C as o,d as p,O as r,g as s,P as t,h as u};