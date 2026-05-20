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
</div>`}function w(){let e=l(p,C());if(!e)return;let t=[`name`,`birthday`,`email`,`password`,`confirm`],n=null,r=document.getElementById(`${p}-avatar-input`),i=document.getElementById(`${p}-avatar-preview`),o=document.getElementById(`${p}-avatar-initial`);r.addEventListener(`change`,async()=>{let e=r.files?.[0];if(!e)return;if(e.size>2*1024*1024){alert(`Please choose an image under 2 MB.`),r.value=``;return}n=await y(e),o.style.display=`none`;let t=document.createElement(`img`);t.src=n,t.alt=`Avatar preview`,i.appendChild(t)}),document.getElementById(`${p}-name`).addEventListener(`input`,e=>{let t=e.target.value.trim()[0]?.toUpperCase()??`✦`;n||(o.textContent=t)}),document.getElementById(`${p}-password`).addEventListener(`input`,t=>{let n=t.target.value,r=e.querySelectorAll(`#${p}-password-rules .password-rule`);m.forEach((e,t)=>{r[t]?.classList.toggle(`is-met`,e.test(n))})}),document.getElementById(`${p}-submit`).addEventListener(`click`,async()=>{v(p,t);let e=document.getElementById(`${p}-name`).value.trim(),r=document.getElementById(`${p}-birthday`).value,i=document.getElementById(`${p}-email`).value.trim(),o=document.getElementById(`${p}-password`).value,s=document.getElementById(`${p}-confirm`).value,c=!1;e||(_(p,`name`,`Name is required.`),c=!0),r||(_(p,`birthday`,`Birthday is required.`),c=!0),i?g(i)||(_(p,`email`,`Enter a valid email address.`),c=!0):(_(p,`email`,`Email is required.`),c=!0),h(o)||(_(p,`password`,`Password does not meet all requirements.`),c=!0),s?o!==s&&(_(p,`confirm`,`Passwords do not match.`),c=!0):(_(p,`confirm`,`Please confirm your password.`),c=!0),!c&&(a({name:e,email:i,birthday:r,avatar:n??null}),d(p))}),document.getElementById(`${p}-to-login`).addEventListener(`click`,()=>{d(p),S()})}function T(){w(),u(p),setTimeout(()=>document.getElementById(`${p}-name`)?.focus(),100)}var E=`magi_cart`,D=[],O=new Set;try{D=JSON.parse(localStorage.getItem(E))??[]}catch{D=[]}function k(){try{localStorage.setItem(E,JSON.stringify(D))}catch{}O.forEach(e=>e([...D]))}function A(){return[...D]}function j(){return D.reduce((e,t)=>e+t.qty,0)}function M(){return D.reduce((e,t)=>e+t.price*t.qty,0)}function N(e){let t=D.find(t=>t.id===e.id);t?t.qty+=1:D.push({...e,qty:1}),k()}function P(e){D=D.filter(t=>t.id!==e),k()}function F(e,t){if(t<1){P(e);return}let n=D.find(t=>t.id===e);n&&(n.qty=t,k())}function I(e){return O.add(e),()=>O.delete(e)}var L=!1,R=null,z=350;function B(e){return`$${(e/100).toFixed(2)}`}function V(e){return`
<div class="cart-item" data-id="${e.id}">
  <div class="cart-item__icon">${e.icon}</div>
  <div class="cart-item__body">
    <div class="cart-item__name">${e.name}</div>
    <div class="cart-item__type">${e.type}</div>
    <div class="cart-item__price">${B(e.price*e.qty)}</div>
    <div class="cart-item__qty">
      <button class="cart-item__qty-btn" data-action="dec" data-id="${e.id}">−</button>
      <span class="cart-item__qty-val">${e.qty}</span>
      <button class="cart-item__qty-btn" data-action="inc" data-id="${e.id}">+</button>
    </div>
  </div>
  <button class="cart-item__remove" data-remove="${e.id}" aria-label="Remove">✕</button>
</div>`}function H(){let e=A(),t=j(),n=M(),r=document.getElementById(`cart-items-list`),i=document.getElementById(`cart-header-count`),a=document.getElementById(`cart-subtotal-amount`),o=document.getElementById(`cart-checkout-btn`);i&&(i.textContent=t),a&&(a.textContent=B(n)),o&&(o.disabled=t===0),r&&(r.innerHTML=e.length===0?`
<div class="cart-empty">
  <div class="cart-empty__icon">✦</div>
  <div class="cart-empty__msg">Your cart is empty</div>
  <div class="cart-empty__sub">Add something sacred to begin.</div>
</div>`:e.map(V).join(``))}function U(){return document.getElementById(`cart-drawer`)}function W(){return document.getElementById(`cart-backdrop`)}function G(){clearTimeout(R);let e=U(),t=W();e&&(e.style.display=``,t.style.display=``,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.classList.add(`is-open`),t.classList.add(`is-open`)})}))}function K(){let e=U(),t=W();e&&(e.classList.remove(`is-open`),t.classList.remove(`is-open`),R=setTimeout(()=>{e.style.display=`none`,t.style.display=`none`},z))}function q(){if(L)return;L=!0;let e=document.createElement(`div`);e.innerHTML=`
<div id="cart-backdrop" class="cart-backdrop" style="display:none;"></div>
<div id="cart-drawer" class="cart-drawer" aria-label="Shopping cart" style="display:none;">
  <div class="cart-header">
    <div class="cart-header__title">
      ✦ Your Cart
      <span class="cart-header__count" id="cart-header-count">0</span>
    </div>
    <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">✕</button>
  </div>

  <div class="cart-items" id="cart-items-list"></div>

  <div class="cart-footer">
    <div class="cart-subtotal">
      <span class="cart-subtotal__label">Subtotal</span>
      <span class="cart-subtotal__amount" id="cart-subtotal-amount">$0.00</span>
    </div>
    <button class="cart-checkout-btn" id="cart-checkout-btn" disabled>
      Proceed to Checkout
    </button>
    <button class="cart-continue-btn" id="cart-continue-btn">
      Continue Browsing
    </button>
  </div>
</div>`,document.body.appendChild(e),document.getElementById(`cart-close-btn`).addEventListener(`click`,K),document.getElementById(`cart-backdrop`).addEventListener(`click`,K),document.getElementById(`cart-continue-btn`).addEventListener(`click`,K),document.getElementById(`cart-items-list`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove]`);if(t){P(t.dataset.remove);return}let n=e.target.closest(`[data-action]`);if(n){let e=n.dataset.id,t=A().find(t=>t.id===e);if(!t)return;F(e,t.qty+(n.dataset.action===`inc`?1:-1))}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&K()}),I(H),H()}var J=[{href:`/`,label:`Home`,icon:`✦`},{href:`/readings.html`,label:`Readings`,icon:`♥`,iconColor:`var(--suit-hearts)`,subItems:[{href:`/readings.html?open=birth-card`,label:`Birth Card Reading`,icon:`♣`,iconColor:`var(--suit-clubs)`},{href:`/readings.html?open=compatibility`,label:`Compatibility Reading`,iconHTML:`<span style="color:var(--suit-hearts)">♥</span><span style="color:var(--suit-spades)">♠</span>`},{href:`/readings.html?open=geolocation`,label:`Location Reading`,icon:`♦`,iconColor:`var(--suit-diamonds)`},{href:`/readings.html?open=greeting-card`,label:`Greeting Card`,icon:`♠`,iconColor:`var(--suit-spades)`}]},{href:`/oracle.html`,label:`Oracle`,icon:`🃏`},{href:`/explore.html`,label:`Explore the System`,icon:`♦`,iconColor:`var(--suit-diamonds)`},{href:`/videos.html`,label:`Videos & Content`,icon:`▶`},{href:`/join.html`,label:`Join the Order`,icon:`♣`,iconColor:`var(--suit-clubs)`},{href:`/shop.html`,label:`The Magi Shop`,icon:`💎`},{href:`/about.html`,label:`About & Contact`,icon:`♠`,iconColor:`var(--suit-spades)`}];function Y(e,t=`nav-dropdown__icon`){return`<span class="${t}"${e.iconColor?` style="color:${e.iconColor}"`:``}>${e.iconHTML??e.icon}</span>`}function X(e){return`
<header class="site-header">
  <div class="site-header__inner">
    <button class="nav-menu-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav-dropdown">
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
    </button>

    <a href="/" class="site-logo" style="text-decoration:none;">The Mystic Oracle</a>

    <div id="site-header-auth" class="header-auth"></div>
    <button class="header-cart-btn" id="header-cart-btn" aria-label="Open cart">
      🛒
      <span class="header-cart-btn__badge" id="header-cart-badge">0</span>
    </button>

    <div id="site-nav-dropdown" class="nav-dropdown" aria-hidden="true">
      <nav class="nav-dropdown__nav">
        ${J.map(t=>{let{href:n,label:r,subItems:i}=t,a=e===n||i&&i.some(t=>t.href===e);if(i){let e=i.map(e=>`
        <a href="${e.href}" class="nav-sub__link">
          ${Y(e)}
          <span>${e.label}</span>
        </a>`).join(``);return`
<div class="nav-item--has-sub">
  <a href="${n}" class="nav-dropdown__link${a?` nav-dropdown__link--active`:``}">
    ${Y(t)}
    <span>${r}</span>
    <span class="nav-sub__arrow">›</span>
  </a>
  <div class="nav-sub-menu">${e}</div>
</div>`}return`<a href="${n}" class="nav-dropdown__link${a?` nav-dropdown__link--active`:``}">
      ${Y(t)}
      <span>${r}</span>
    </a>`}).join(`
`)}
      </nav>
    </div>
  </div>
</header>`}function Z(){let e=document.getElementById(`site-header-auth`);if(e)if(i()){let t=r(),n=t.name?.[0]?.toUpperCase()??`✦`;e.innerHTML=`
      <a href="/account.html" class="header-auth__btn">
        ${t.avatar?`<img src="${t.avatar}" alt="${t.name}" class="header-auth__avatar header-auth__avatar--img">`:`<span class="header-auth__avatar">${n}</span>`}
        <span class="header-auth__name">${t.name}</span>
      </a>`}else e.innerHTML=`
      <button class="header-auth__btn header-auth__btn--sign-in" id="header-sign-in-btn">
        Sign In
      </button>`,document.getElementById(`header-sign-in-btn`)?.addEventListener(`click`,S)}function Q(e,{activePath:t=`/`}={}){let n=document.querySelector(e);if(!n)return;n.insertAdjacentHTML(`afterend`,X(t)),n.remove();let r=document.querySelector(`.nav-menu-btn`),i=document.getElementById(`site-nav-dropdown`);r.addEventListener(`click`,e=>{e.stopPropagation();let t=i.classList.toggle(`is-open`);r.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`aria-hidden`,String(!t)),r.classList.toggle(`is-open`,t)}),document.addEventListener(`click`,e=>{!r.contains(e.target)&&!i.contains(e.target)&&(i.classList.remove(`is-open`),r.setAttribute(`aria-expanded`,`false`),i.setAttribute(`aria-hidden`,`true`),r.classList.remove(`is-open`))}),Z(),s(Z),q(),document.getElementById(`header-cart-btn`)?.addEventListener(`click`,G);function a(){let e=document.getElementById(`header-cart-badge`);if(!e)return;let t=j();e.textContent=t,e.classList.toggle(`has-items`,t>0)}a(),I(a),document.querySelectorAll(`.nav-item--has-sub`).forEach(e=>{let t;e.addEventListener(`mouseenter`,()=>{clearTimeout(t),e.classList.add(`sub-open`)}),e.addEventListener(`mouseleave`,()=>{t=setTimeout(()=>e.classList.remove(`sub-open`),350)})})}function $(){return`
<footer class="site-footer">
  <div class="site-footer__logo">Messages from the Magi</div>
  <div>A Living Oracle</div>
  <div class="site-footer__copy">
    © <span class="footer-year"></span> Messages from the Magi. All rights reserved.
    This oracle system is the proprietary intellectual property of Sharon.
  </div>
</footer>`}function ee(e){let t=document.querySelector(e);t&&(t.insertAdjacentHTML(`afterend`,$()),t.remove(),document.querySelectorAll(`.footer-year`).forEach(e=>{e.textContent=new Date().getFullYear()}))}function te(){let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;document.documentElement.classList.add(`js-animate`),e||document.querySelectorAll(`.magic-h`).forEach(e=>{let t=e.textContent.trim().split(` `),n=0,r=[];t.forEach((e,i)=>{let a=[...e].map(e=>`<span class="ch" style="--ci:${n++}">${e}</span>`).join(``);r.push(`<span class="ch-word">${a}</span>`),i<t.length-1&&(n++,r.push(` `))}),e.innerHTML=r.join(``)});let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),t.unobserve(e.target))})},{threshold:.12,rootMargin:`0px 0px -40px 0px`});document.querySelectorAll(`.anim-hero, .anim-deal, .anim-reveal, .anim-para`).forEach(e=>t.observe(e));let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.querySelectorAll(`.play-card`).forEach((e,t)=>{setTimeout(()=>e.classList.add(`is-dealt`),t*160)}),n.unobserve(e.target))})},{threshold:.15});document.querySelectorAll(`.card-diamond`).forEach(e=>n.observe(e))}export{N as a,o as c,a as d,G as i,r as l,ee as n,l as o,Q as r,u as s,te as t,i as u};