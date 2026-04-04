(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`magi_session`,t=null,n=new Set;try{let n=localStorage.getItem(e);n&&(t=JSON.parse(n))}catch{t=null}function r(){return t}function i(){return t!==null}function a(n){t=n;try{localStorage.setItem(e,JSON.stringify(n))}catch{}c()}function o(){t=null;try{localStorage.removeItem(e)}catch{}c()}function s(e){return n.add(e),()=>n.delete(e)}function c(){n.forEach(e=>e(t))}function l(e,t){if(document.getElementById(e))return null;document.body.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(e);return n.addEventListener(`click`,t=>{(t.target===n||t.target.dataset.close!==void 0)&&d(e)}),document.addEventListener(`keydown`,t=>{t.key===`Escape`&&n.classList.contains(`is-open`)&&d(e)}),n}function u(e){document.getElementById(e)?.classList.add(`is-open`)}function d(e){document.getElementById(e)?.classList.remove(`is-open`)}var f=`modal-login`,p=`modal-register`,m=[{key:`length`,label:`At least 8 characters`,test:e=>e.length>=8},{key:`upper`,label:`One uppercase letter (A–Z)`,test:e=>/[A-Z]/.test(e)},{key:`lower`,label:`One lowercase letter (a–z)`,test:e=>/[a-z]/.test(e)},{key:`number`,label:`One number (0–9)`,test:e=>/[0-9]/.test(e)},{key:`special`,label:`One special character (!@#$…)`,test:e=>/[^A-Za-z0-9]/.test(e)}];function h(e){return m.every(t=>t.test(e))}function g(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function _(e,t,n){let r=document.getElementById(`${e}-${t}-error`),i=document.getElementById(`${e}-${t}`);r&&(r.textContent=n),i&&i.classList.toggle(`is-error`,!!n)}function v(e,t){t.forEach(t=>_(e,t,``))}function y(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=e=>t(e.target.result),r.onerror=n,r.readAsDataURL(e)})}function b(){return`
<div class="modal-overlay" id="${f}" role="dialog" aria-modal="true" aria-labelledby="${f}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${f}-title">Sign In</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
      Welcome back. Enter your details to continue your journey.
    </p>

    <div class="form-group">
      <label class="form-label" for="${f}-email">Email</label>
      <input class="form-input" id="${f}-email" type="email"
        placeholder="you@example.com" autocomplete="email">
      <span class="field-error" id="${f}-email-error"></span>
    </div>

    <div class="form-group">
      <label class="form-label" for="${f}-password">Password</label>
      <input class="form-input" id="${f}-password" type="password"
        placeholder="••••••••" autocomplete="current-password">
      <span class="field-error" id="${f}-password-error"></span>
    </div>

    <button class="btn btn--primary" id="${f}-submit" style="width:100%;margin-top:0.5rem;margin-bottom:1rem;">
      ✦ Sign In
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      No account yet?
      <button class="auth-switch-link" id="${f}-to-register">Create one</button>
    </p>
  </div>
</div>`}function x(){if(!l(f,b()))return;let e=[`email`,`password`];document.getElementById(`${f}-submit`).addEventListener(`click`,async()=>{v(f,e);let t=document.getElementById(`${f}-email`).value.trim(),n=document.getElementById(`${f}-password`).value,r=!1;t?g(t)||(_(f,`email`,`Enter a valid email address.`),r=!0):(_(f,`email`,`Email is required.`),r=!0),n||(_(f,`password`,`Password is required.`),r=!0),!r&&(a({name:t.split(`@`)[0],email:t}),d(f))}),document.getElementById(`${f}-to-register`).addEventListener(`click`,()=>{d(f),T()})}function S(){x(),u(f),setTimeout(()=>document.getElementById(`${f}-email`)?.focus(),100)}function C(){return`
<div class="modal-overlay" id="${p}" role="dialog" aria-modal="true" aria-labelledby="${p}-title">
  <div class="modal" style="overflow-y:auto;max-height:min(720px,88vh);">
    <div class="modal__header">
      <h2 class="modal__title" id="${p}-title">Create Account</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
      Join the Order. Your readings, saved and waiting.
    </p>

    <!-- Avatar -->
    <div class="avatar-upload">
      <div class="avatar-preview" id="${p}-avatar-preview">
        <span class="avatar-preview__initial" id="${p}-avatar-initial">✦</span>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:0.5rem;">Profile Photo <span style="color:var(--color-mist);font-size:0.75em;text-transform:none;letter-spacing:0;">(optional)</span></div>
        <label class="avatar-upload__btn" for="${p}-avatar-input">Choose photo</label>
        <input type="file" accept="image/*" id="${p}-avatar-input" style="display:none;" aria-label="Upload profile photo">
        <div style="font-size:0.75rem;color:var(--color-mist);margin-top:0.35rem;">JPG, PNG, GIF · max 2 MB</div>
      </div>
    </div>

    <!-- Name -->
    <div class="form-group">
      <label class="form-label" for="${p}-name">Name</label>
      <input class="form-input" id="${p}-name" type="text"
        placeholder="Your name" autocomplete="name">
      <span class="field-error" id="${p}-name-error"></span>
    </div>

    <!-- Birthday (full date including year — used for profile only, not card readings) -->
    <div class="form-group">
      <label class="form-label" for="${p}-birthday">Birthday</label>
      <input class="form-input" id="${p}-birthday" type="date" autocomplete="bday">
      <span class="form-hint">Month / Day / Year</span>
      <span class="field-error" id="${p}-birthday-error"></span>
    </div>

    <!-- Email -->
    <div class="form-group">
      <label class="form-label" for="${p}-email">Email</label>
      <input class="form-input" id="${p}-email" type="email"
        placeholder="you@example.com" autocomplete="email">
      <span class="field-error" id="${p}-email-error"></span>
    </div>

    <!-- Password -->
    <div class="form-group">
      <label class="form-label" for="${p}-password">Password</label>
      <input class="form-input" id="${p}-password" type="password"
        placeholder="••••••••" autocomplete="new-password">
      <div class="password-rules" id="${p}-password-rules">${m.map(e=>`<div class="password-rule" data-rule="${e.key}">${e.label}</div>`).join(``)}</div>
      <span class="field-error" id="${p}-password-error"></span>
    </div>

    <!-- Confirm password -->
    <div class="form-group">
      <label class="form-label" for="${p}-confirm">Confirm Password</label>
      <input class="form-input" id="${p}-confirm" type="password"
        placeholder="••••••••" autocomplete="new-password">
      <span class="field-error" id="${p}-confirm-error"></span>
    </div>

    <button class="btn btn--primary" id="${p}-submit" style="width:100%;margin-top:0.25rem;margin-bottom:1rem;">
      ✦ Create Account
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      Already have an account?
      <button class="auth-switch-link" id="${p}-to-login">Sign in</button>
    </p>
  </div>
</div>`}function w(){let e=l(p,C());if(!e)return;let t=[`name`,`birthday`,`email`,`password`,`confirm`],n=null,r=document.getElementById(`${p}-avatar-input`),i=document.getElementById(`${p}-avatar-preview`),o=document.getElementById(`${p}-avatar-initial`);r.addEventListener(`change`,async()=>{let e=r.files?.[0];if(!e)return;if(e.size>2*1024*1024){alert(`Please choose an image under 2 MB.`),r.value=``;return}n=await y(e),o.style.display=`none`;let t=document.createElement(`img`);t.src=n,t.alt=`Avatar preview`,i.appendChild(t)}),document.getElementById(`${p}-name`).addEventListener(`input`,e=>{let t=e.target.value.trim()[0]?.toUpperCase()??`✦`;n||(o.textContent=t)}),document.getElementById(`${p}-password`).addEventListener(`input`,t=>{let n=t.target.value,r=e.querySelectorAll(`#${p}-password-rules .password-rule`);m.forEach((e,t)=>{r[t]?.classList.toggle(`is-met`,e.test(n))})}),document.getElementById(`${p}-submit`).addEventListener(`click`,async()=>{v(p,t);let e=document.getElementById(`${p}-name`).value.trim(),r=document.getElementById(`${p}-birthday`).value,i=document.getElementById(`${p}-email`).value.trim(),o=document.getElementById(`${p}-password`).value,s=document.getElementById(`${p}-confirm`).value,c=!1;e||(_(p,`name`,`Name is required.`),c=!0),r||(_(p,`birthday`,`Birthday is required.`),c=!0),i?g(i)||(_(p,`email`,`Enter a valid email address.`),c=!0):(_(p,`email`,`Email is required.`),c=!0),h(o)||(_(p,`password`,`Password does not meet all requirements.`),c=!0),s?o!==s&&(_(p,`confirm`,`Passwords do not match.`),c=!0):(_(p,`confirm`,`Please confirm your password.`),c=!0),!c&&(a({name:e,email:i,birthday:r,avatar:n??null}),d(p))}),document.getElementById(`${p}-to-login`).addEventListener(`click`,()=>{d(p),S()})}function T(){w(),u(p),setTimeout(()=>document.getElementById(`${p}-name`)?.focus(),100)}var E=[{href:`/`,label:`Home`,icon:`✦`},{href:`/readings.html`,label:`Readings`,icon:`★`,subItems:[{href:`/readings.html?open=birth-card`,label:`Birth Card Reading`,icon:`★`},{href:`/readings.html?open=compatibility`,label:`Compatibility Reading`,icon:`♥♠`},{href:`/readings.html?open=geolocation`,label:`Location Reading`,icon:`🗺`},{href:`/readings.html?open=greeting-card`,label:`Greeting Card`,icon:`✉`}]},{href:`/oracle.html`,label:`Oracle`,icon:`🃏`},{href:`/explore.html`,label:`Explore the System`,icon:`◈`},{href:`/videos.html`,label:`Videos & Content`,icon:`▶`},{href:`/join.html`,label:`Join the Order`,icon:`💎`},{href:`/about.html`,label:`About & Contact`,icon:`✉`}];function D(e){return`
<header class="site-header">
  <div class="site-header__inner">
    <button class="nav-menu-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav-dropdown">
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
    </button>

    <a href="/" class="site-logo" style="text-decoration:none;">Messages from the Magi</a>

    <div id="site-header-auth" class="header-auth"></div>

    <div id="site-nav-dropdown" class="nav-dropdown" aria-hidden="true">
      <nav class="nav-dropdown__nav">
        ${E.map(({href:t,label:n,icon:r,subItems:i})=>{let a=e===t||i&&i.some(t=>t.href===e);if(i){let e=i.map(e=>`
        <a href="${e.href}" class="nav-sub__link">
          <span class="nav-dropdown__icon">${e.icon}</span>
          <span>${e.label}</span>
        </a>`).join(``);return`
<div class="nav-item--has-sub">
  <a href="${t}" class="nav-dropdown__link${a?` nav-dropdown__link--active`:``}">
    <span class="nav-dropdown__icon">${r}</span>
    <span>${n}</span>
    <span class="nav-sub__arrow">›</span>
  </a>
  <div class="nav-sub-menu">${e}</div>
</div>`}return`<a href="${t}" class="nav-dropdown__link${a?` nav-dropdown__link--active`:``}">
      <span class="nav-dropdown__icon">${r}</span>
      <span>${n}</span>
    </a>`}).join(`
`)}
      </nav>
    </div>
  </div>
</header>`}function O(){let e=document.getElementById(`site-header-auth`);if(e)if(i()){let t=r(),n=t.name?.[0]?.toUpperCase()??`✦`;e.innerHTML=`
      <a href="/account.html" class="header-auth__btn">
        ${t.avatar?`<img src="${t.avatar}" alt="${t.name}" class="header-auth__avatar header-auth__avatar--img">`:`<span class="header-auth__avatar">${n}</span>`}
        <span class="header-auth__name">${t.name}</span>
      </a>`}else e.innerHTML=`
      <button class="header-auth__btn header-auth__btn--sign-in" id="header-sign-in-btn">
        Sign In
      </button>`,document.getElementById(`header-sign-in-btn`)?.addEventListener(`click`,S)}function k(e,{activePath:t=`/`}={}){let n=document.querySelector(e);if(!n)return;n.insertAdjacentHTML(`afterend`,D(t)),n.remove();let r=document.querySelector(`.nav-menu-btn`),i=document.getElementById(`site-nav-dropdown`);r.addEventListener(`click`,e=>{e.stopPropagation();let t=i.classList.toggle(`is-open`);r.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`aria-hidden`,String(!t)),r.classList.toggle(`is-open`,t)}),document.addEventListener(`click`,e=>{!r.contains(e.target)&&!i.contains(e.target)&&(i.classList.remove(`is-open`),r.setAttribute(`aria-expanded`,`false`),i.setAttribute(`aria-hidden`,`true`),r.classList.remove(`is-open`))}),O(),s(O),document.querySelectorAll(`.nav-item--has-sub`).forEach(e=>{let t;e.addEventListener(`mouseenter`,()=>{clearTimeout(t),e.classList.add(`sub-open`)}),e.addEventListener(`mouseleave`,()=>{t=setTimeout(()=>e.classList.remove(`sub-open`),350)})})}function A(){return`
<footer class="site-footer">
  <div class="site-footer__logo">Messages from the Magi</div>
  <div>A Living Oracle</div>
  <div class="site-footer__copy">
    © <span class="footer-year"></span> Messages from the Magi. All rights reserved.
    This oracle system is the proprietary intellectual property of Sharon.
  </div>
</footer>`}function j(e){let t=document.querySelector(e);t&&(t.insertAdjacentHTML(`afterend`,A()),t.remove(),document.querySelectorAll(`.footer-year`).forEach(e=>{e.textContent=new Date().getFullYear()}))}export{o as a,u as i,k as n,r as o,l as r,i as s,j as t};