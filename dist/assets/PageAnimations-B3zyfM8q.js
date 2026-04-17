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
</div>`}function x(){if(!l(f,b()))return;let e=[`email`,`password`];document.getElementById(`${f}-submit`).addEventListener(`click`,async()=>{v(f,e);let t=document.getElementById(`${f}-email`).value.trim(),n=document.getElementById(`${f}-password`).value,r=!1;t?g(t)||(_(f,`email`,`Enter a valid email address.`),r=!0):(_(f,`email`,`Email is required.`),r=!0),n||(_(f,`password`,`Password is required.`),r=!0),!r&&(a({name:t.split(`@`)[0],email:t}),d(f))}),document.getElementById(`${f}-to-register`).addEventListener(`click`,()=>{d(f),ee()})}function S(){x(),u(f),setTimeout(()=>document.getElementById(`${f}-email`)?.focus(),100)}function C(){return`
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
</div>`}function w(){let e=l(p,C());if(!e)return;let t=[`name`,`birthday`,`email`,`password`,`confirm`],n=null,r=document.getElementById(`${p}-avatar-input`),i=document.getElementById(`${p}-avatar-preview`),o=document.getElementById(`${p}-avatar-initial`);r.addEventListener(`change`,async()=>{let e=r.files?.[0];if(!e)return;if(e.size>2*1024*1024){alert(`Please choose an image under 2 MB.`),r.value=``;return}n=await y(e),o.style.display=`none`;let t=document.createElement(`img`);t.src=n,t.alt=`Avatar preview`,i.appendChild(t)}),document.getElementById(`${p}-name`).addEventListener(`input`,e=>{let t=e.target.value.trim()[0]?.toUpperCase()??`✦`;n||(o.textContent=t)}),document.getElementById(`${p}-password`).addEventListener(`input`,t=>{let n=t.target.value,r=e.querySelectorAll(`#${p}-password-rules .password-rule`);m.forEach((e,t)=>{r[t]?.classList.toggle(`is-met`,e.test(n))})}),document.getElementById(`${p}-submit`).addEventListener(`click`,async()=>{v(p,t);let e=document.getElementById(`${p}-name`).value.trim(),r=document.getElementById(`${p}-birthday`).value,i=document.getElementById(`${p}-email`).value.trim(),o=document.getElementById(`${p}-password`).value,s=document.getElementById(`${p}-confirm`).value,c=!1;e||(_(p,`name`,`Name is required.`),c=!0),r||(_(p,`birthday`,`Birthday is required.`),c=!0),i?g(i)||(_(p,`email`,`Enter a valid email address.`),c=!0):(_(p,`email`,`Email is required.`),c=!0),h(o)||(_(p,`password`,`Password does not meet all requirements.`),c=!0),s?o!==s&&(_(p,`confirm`,`Passwords do not match.`),c=!0):(_(p,`confirm`,`Please confirm your password.`),c=!0),!c&&(a({name:e,email:i,birthday:r,avatar:n??null}),d(p))}),document.getElementById(`${p}-to-login`).addEventListener(`click`,()=>{d(p),S()})}function ee(){w(),u(p),setTimeout(()=>document.getElementById(`${p}-name`)?.focus(),100)}var T=`magi_cart`,E=[];function D(){try{return JSON.parse(localStorage.getItem(T))||[]}catch{return[]}}function O(e){localStorage.setItem(T,JSON.stringify(e)),E.forEach(t=>t(e))}function k(){return D()}function A(){return D().reduce((e,t)=>e+t.qty,0)}function j(){return D().reduce((e,t)=>e+t.price*t.qty,0)}function M(e){let t=D(),n=t.find(t=>t.id===e.id);n?n.qty+=1:t.push({...e,qty:1}),O(t)}function N(e){O(D().filter(t=>t.id!==e))}function P(e,t){if(t<1){N(e);return}let n=D(),r=n.find(t=>t.id===e);r&&(r.qty=t,O(n))}function F(e){return E.push(e),()=>{E=E.filter(t=>t!==e)}}var I=!1,L=null,R=350;function z(e){return`$${(e/100).toFixed(2)}`}function B(e){return`
<div class="cart-item" data-id="${e.id}">
  <div class="cart-item__icon">${e.icon}</div>
  <div class="cart-item__body">
    <div class="cart-item__name">${e.name}</div>
    <div class="cart-item__type">${e.type}</div>
    <div class="cart-item__price">${z(e.price*e.qty)}</div>
    <div class="cart-item__qty">
      <button class="cart-item__qty-btn" data-action="dec" data-id="${e.id}">−</button>
      <span class="cart-item__qty-val">${e.qty}</span>
      <button class="cart-item__qty-btn" data-action="inc" data-id="${e.id}">+</button>
    </div>
  </div>
  <button class="cart-item__remove" data-remove="${e.id}" aria-label="Remove">✕</button>
</div>`}function V(){let e=k(),t=A(),n=j(),r=document.getElementById(`cart-items-list`),i=document.getElementById(`cart-header-count`),a=document.getElementById(`cart-subtotal-amount`),o=document.getElementById(`cart-checkout-btn`);i&&(i.textContent=t),a&&(a.textContent=z(n)),o&&(o.disabled=t===0),r&&(r.innerHTML=e.length===0?`
<div class="cart-empty">
  <div class="cart-empty__icon">✦</div>
  <div class="cart-empty__msg">Your cart is empty</div>
  <div class="cart-empty__sub">Add something sacred to begin.</div>
</div>`:e.map(B).join(``))}function H(){return document.getElementById(`cart-drawer`)}function U(){return document.getElementById(`cart-backdrop`)}function W(){clearTimeout(L);let e=H(),t=U();e&&(e.style.display=``,t.style.display=``,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e.classList.add(`is-open`),t.classList.add(`is-open`)})}))}function G(){let e=H(),t=U();e&&(e.classList.remove(`is-open`),t.classList.remove(`is-open`),L=setTimeout(()=>{e.style.display=`none`,t.style.display=`none`},R))}function K(){if(I)return;I=!0;let e=document.createElement(`div`);e.innerHTML=`
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
</div>`,document.body.appendChild(e),document.getElementById(`cart-close-btn`).addEventListener(`click`,G),document.getElementById(`cart-backdrop`).addEventListener(`click`,G),document.getElementById(`cart-continue-btn`).addEventListener(`click`,G),document.getElementById(`cart-items-list`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-remove]`);if(t){N(t.dataset.remove);return}let n=e.target.closest(`[data-action]`);if(n){let e=n.dataset.id,t=k().find(t=>t.id===e);if(!t)return;P(e,t.qty+(n.dataset.action===`inc`?1:-1))}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&G()}),F(V),V()}var q=[{href:`/`,label:`Home`,icon:`✦`},{href:`/readings.html`,label:`Readings`,icon:`★`,subItems:[{href:`/readings.html?open=birth-card`,label:`Birth Card Reading`,icon:`★`},{href:`/readings.html?open=compatibility`,label:`Compatibility Reading`,icon:`♥♠`},{href:`/readings.html?open=geolocation`,label:`Location Reading`,icon:`🗺`},{href:`/readings.html?open=greeting-card`,label:`Greeting Card`,icon:`✉`}]},{href:`/oracle.html`,label:`Oracle`,icon:`🃏`},{href:`/explore.html`,label:`Explore the System`,icon:`◈`},{href:`/videos.html`,label:`Videos & Content`,icon:`▶`},{href:`/join.html`,label:`Join the Order`,icon:`💎`},{href:`/shop.html`,label:`The Magi Shop`,icon:`✦`},{href:`/about.html`,label:`About & Contact`,icon:`✉`}];function J(e){return`
<header class="site-header">
  <div class="site-header__inner">
    <button class="nav-menu-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav-dropdown">
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
    </button>

    <a href="/" class="site-logo" style="text-decoration:none;">Messages from the Magi</a>

    <div id="site-header-auth" class="header-auth"></div>
    <button class="header-cart-btn" id="header-cart-btn" aria-label="Open cart">
      🛍
      <span class="header-cart-btn__badge" id="header-cart-badge">0</span>
    </button>

    <div id="site-nav-dropdown" class="nav-dropdown" aria-hidden="true">
      <nav class="nav-dropdown__nav">
        ${q.map(({href:t,label:n,icon:r,subItems:i})=>{let a=e===t||i&&i.some(t=>t.href===e);if(i){let e=i.map(e=>`
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
</header>`}function Y(){let e=document.getElementById(`site-header-auth`);if(e)if(i()){let t=r(),n=t.name?.[0]?.toUpperCase()??`✦`;e.innerHTML=`
      <a href="/account.html" class="header-auth__btn">
        ${t.avatar?`<img src="${t.avatar}" alt="${t.name}" class="header-auth__avatar header-auth__avatar--img">`:`<span class="header-auth__avatar">${n}</span>`}
        <span class="header-auth__name">${t.name}</span>
      </a>`}else e.innerHTML=`
      <button class="header-auth__btn header-auth__btn--sign-in" id="header-sign-in-btn">
        Sign In
      </button>`,document.getElementById(`header-sign-in-btn`)?.addEventListener(`click`,S)}function X(e,{activePath:t=`/`}={}){let n=document.querySelector(e);if(!n)return;n.insertAdjacentHTML(`afterend`,J(t)),n.remove();let r=document.querySelector(`.nav-menu-btn`),i=document.getElementById(`site-nav-dropdown`);r.addEventListener(`click`,e=>{e.stopPropagation();let t=i.classList.toggle(`is-open`);r.setAttribute(`aria-expanded`,String(t)),i.setAttribute(`aria-hidden`,String(!t)),r.classList.toggle(`is-open`,t)}),document.addEventListener(`click`,e=>{!r.contains(e.target)&&!i.contains(e.target)&&(i.classList.remove(`is-open`),r.setAttribute(`aria-expanded`,`false`),i.setAttribute(`aria-hidden`,`true`),r.classList.remove(`is-open`))}),Y(),s(Y),K(),document.getElementById(`header-cart-btn`)?.addEventListener(`click`,W);function a(){let e=document.getElementById(`header-cart-badge`);if(!e)return;let t=A();e.textContent=t,e.classList.toggle(`has-items`,t>0)}a(),F(a),document.querySelectorAll(`.nav-item--has-sub`).forEach(e=>{let t;e.addEventListener(`mouseenter`,()=>{clearTimeout(t),e.classList.add(`sub-open`)}),e.addEventListener(`mouseleave`,()=>{t=setTimeout(()=>e.classList.remove(`sub-open`),350)})})}function Z(){return`
<footer class="site-footer">
  <div class="site-footer__logo">Messages from the Magi</div>
  <div>A Living Oracle</div>
  <div class="site-footer__copy">
    © <span class="footer-year"></span> Messages from the Magi. All rights reserved.
    This oracle system is the proprietary intellectual property of Sharon.
  </div>
</footer>`}function Q(e){let t=document.querySelector(e);t&&(t.insertAdjacentHTML(`afterend`,Z()),t.remove(),document.querySelectorAll(`.footer-year`).forEach(e=>{e.textContent=new Date().getFullYear()}))}var $=[[[0,0],[28,8],[58,4],[88,12],[116,4],[144,18],[136,52]],[[0,20],[30,0],[60,20],[45,60],[60,100],[0,100],[15,60]],[[20,0],[20,60],[0,30],[40,30],[20,15]],[[0,30],[25,8],[55,0],[85,8],[110,30]],[[30,0],[60,30],[30,60],[0,30],[30,0]],[[0,0],[20,15],[40,10],[55,25],[50,45],[40,60],[50,75]]];function te(){if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let e=document.createElement(`style`);e.textContent=`main,footer,#site-footer-mount{position:relative;z-index:1;}`,document.head.appendChild(e);let t=document.createElement(`canvas`);t.setAttribute(`aria-hidden`,`true`),Object.assign(t.style,{position:`fixed`,inset:`0`,pointerEvents:`none`,zIndex:`0`}),document.body.insertBefore(t,document.body.firstChild);let n=t.getContext(`2d`),r=0,i=0,a=[],o=[],s=[],c=null,l=0,u=0,d=1500;function f(){let e=window.devicePixelRatio||1;r=window.innerWidth,i=window.innerHeight,t.width=Math.round(r*e),t.height=Math.round(i*e),t.style.width=r+`px`,t.style.height=i+`px`,n.setTransform(e,0,0,e,0,0),p(),m()}function p(){let e=Math.min(Math.floor(r*i/5e3),220);a=Array.from({length:e},()=>({x:Math.random()*r,y:Math.random()*i,r:Math.random()*1.3+.2,phase:Math.random()*Math.PI*2,freq:6e-4+Math.random()*.0014,gold:Math.random()<.18}))}function m(){o=Array.from({length:3},(e,t)=>{let n=$[(t*2+Math.floor(Math.random()*2))%$.length],a=.55+Math.random()*.7,o=60+Math.random()*(r-180),s=60+Math.random()*(i-180);return{pts:n.map(([e,t])=>[o+e*a,s+t*a]),phase:Math.random()*Math.PI*2,freq:3e-4+Math.random()*3e-4}})}function h(){let e=Math.random()<.22,t=Math.random(),n=t<.7?Math.random()*r*1.3:r+10,a=t<.7?-10:Math.random()*i*.5,o=Math.PI/4+(Math.random()-.5)*.4,c=e?1.8+Math.random()*1.4:4+Math.random()*3;s.push({x:n,y:a,vx:Math.cos(o)*c,vy:Math.sin(o)*c,tail:e?130+Math.random()*90:55+Math.random()*55,width:e?2.2:1.2,life:0,maxLife:e?200:95,isComet:e})}function g(e){let t=Math.min(e-l,64);l=e,u+=t,n.clearRect(0,0,r,i);for(let e of a){let t=.35+.5*(.5+.5*Math.sin(e.phase+u*e.freq));n.beginPath(),n.arc(e.x,e.y,e.r,0,Math.PI*2),n.fillStyle=e.gold?`rgba(201,168,76,${t})`:`rgba(220,225,255,${t})`,n.fill()}for(let e of o){let t=.07+.04*Math.sin(e.phase+u*e.freq),r=.22+.12*Math.sin(e.phase+u*e.freq*1.3);n.beginPath(),n.moveTo(e.pts[0][0],e.pts[0][1]);for(let t=1;t<e.pts.length;t++)n.lineTo(e.pts[t][0],e.pts[t][1]);n.strokeStyle=`rgba(201,168,76,${t})`,n.lineWidth=.6,n.stroke();for(let[t,i]of e.pts){let e=n.createRadialGradient(t,i,0,t,i,5);e.addColorStop(0,`rgba(201,168,76,${r})`),e.addColorStop(1,`transparent`),n.beginPath(),n.arc(t,i,5,0,Math.PI*2),n.fillStyle=e,n.fill(),n.beginPath(),n.arc(t,i,1.4,0,Math.PI*2),n.fillStyle=`rgba(230,210,140,${r})`,n.fill()}}d-=t,d<=0&&(h(),d=2200+Math.random()*4500);for(let e=s.length-1;e>=0;e--){let t=s[e];t.life++,t.x+=t.vx,t.y+=t.vy;let a=t.life/t.maxLife,o=Math.sin(a*Math.PI),c=Math.atan2(t.vy,t.vx),l=t.x-Math.cos(c)*t.tail,u=t.y-Math.sin(c)*t.tail,d=n.createLinearGradient(l,u,t.x,t.y);t.isComet?(d.addColorStop(0,`transparent`),d.addColorStop(.5,`rgba(201,168,76,${o*.25})`),d.addColorStop(1,`rgba(255,225,120,${o*.9})`)):(d.addColorStop(0,`transparent`),d.addColorStop(.5,`rgba(180,190,255,${o*.2})`),d.addColorStop(1,`rgba(240,245,255,${o*.85})`)),n.beginPath(),n.moveTo(l,u),n.lineTo(t.x,t.y),n.strokeStyle=d,n.lineWidth=t.width,n.lineCap=`round`,n.stroke();let f=t.isComet?10:5,p=t.isComet?`255,215,100`:`210,220,255`,m=n.createRadialGradient(t.x,t.y,0,t.x,t.y,f);m.addColorStop(0,`rgba(${p},${o*(t.isComet?.9:.7)})`),m.addColorStop(1,`transparent`),n.beginPath(),n.arc(t.x,t.y,f,0,Math.PI*2),n.fillStyle=m,n.fill(),(t.life>=t.maxLife||t.x>r+80||t.y>i+80)&&s.splice(e,1)}c=requestAnimationFrame(g)}document.addEventListener(`visibilitychange`,()=>{document.hidden?cancelAnimationFrame(c):(l=performance.now(),c=requestAnimationFrame(g))}),window.addEventListener(`resize`,f,{passive:!0}),f(),c=requestAnimationFrame(g)}function ne(){let e=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;if(document.documentElement.classList.add(`js-animate`),e||document.querySelectorAll(`.magic-h`).forEach(e=>{e.innerHTML=[...e.textContent].map((e,t)=>{let n=e===` `;return`<span class="ch${n?` ch--space`:``}" style="--ci:${t}">${n?`\xA0`:e}</span>`}).join(``)}),!e){let e=[`✦`,`♥`,`♣`,`♦`,`♠`,`◆`,`★`,`·`,`✧`];for(let t=0;t<14;t++){let n=document.createElement(`span`);n.className=`x-particle`,n.setAttribute(`aria-hidden`,`true`),n.textContent=e[t%e.length],n.style.setProperty(`--dur`,`${5+Math.random()*7}s`),n.style.setProperty(`--delay`,`${-(Math.random()*8)}s`),n.style.left=`${5+Math.random()*90}%`,n.style.top=`${5+Math.random()*90}%`,document.body.appendChild(n)}}let t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),t.unobserve(e.target))})},{threshold:.12,rootMargin:`0px 0px -40px 0px`});document.querySelectorAll(`.anim-hero, .anim-deal, .anim-reveal, .anim-para`).forEach(e=>t.observe(e));let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.querySelectorAll(`.play-card`).forEach((e,t)=>{setTimeout(()=>e.classList.add(`is-dealt`),t*160)}),n.unobserve(e.target))})},{threshold:.15});document.querySelectorAll(`.card-diamond`).forEach(e=>n.observe(e))}export{W as a,u as c,i as d,X as i,o as l,te as n,M as o,Q as r,l as s,ne as t,r as u};