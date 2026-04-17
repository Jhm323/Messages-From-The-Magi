import{d as e,i as t,l as n,n as r,r as i,t as a,u as o}from"./PageAnimations-B3zyfM8q.js";import{n as s,t as c}from"./SavedReadings-1dH3-Zbr.js";function l(t=`/`){e()||window.location.replace(t)}l(`/`),r(),a(),t(`#site-header-mount`,{activePath:`/account.html`}),i(`#site-footer-mount`);var u=o(),d=u.name?.[0]?.toUpperCase()??`✦`,f=document.getElementById(`account-avatar`);if(u.avatar?f.innerHTML=`<img src="${u.avatar}" alt="${u.name}">`:f.textContent=d,document.getElementById(`account-name`).textContent=u.name??`Seeker`,document.getElementById(`account-email`).textContent=u.email??``,u.birthday){let[e,t,n]=u.birthday.split(`-`).map(Number),r=new Date(e,t-1,n).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),i=document.getElementById(`account-birthday`);i&&(i.textContent=r)}document.getElementById(`sign-out-btn`).addEventListener(`click`,()=>{n(),window.location.href=`/`});var p={Hearts:`var(--suit-hearts)`,Clubs:`var(--suit-clubs)`,Diamonds:`var(--suit-diamonds)`,Spades:`var(--suit-spades)`,Joker:`var(--suit-joker)`};function m(){let e=document.getElementById(`saved-readings-list`),t=s();if(t.length===0){e.innerHTML=`
      <div class="coming-soon coming-soon--padded">
        <div style="font-size:2rem;margin-bottom:0.75rem;opacity:0.35;">♦</div>
        <p class="coming-soon__body">
          No saved readings yet.<br>
          <span>Complete a reading and hit <strong>♦ Save Reading</strong>.</span>
        </p>
      </div>`;return}e.innerHTML=t.map(e=>{let t=new Date(e.savedAt).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}),n=p[e.cardSuit]??`var(--color-gold)`;return`
      <div class="reading-item" data-reading-id="${e.id}">
        <div class="reading-item__suit" style="color:${n}">${e.cardSuitSymbol}</div>
        <div class="reading-item__body">
          <div class="reading-item__name">${e.cardName}</div>
          <div class="reading-item__meta">${e.label} · ${e.eyebrow}</div>
        </div>
        <div class="reading-item__date">${t}</div>
        <button class="reading-item__delete" data-delete="${e.id}" aria-label="Delete reading">✕</button>
      </div>`}).join(``),e.querySelectorAll(`[data-delete]`).forEach(e=>{e.addEventListener(`click`,()=>{c(e.dataset.delete),m()})})}m(),document.body.classList.replace(`js-loading`,`js-ready`);