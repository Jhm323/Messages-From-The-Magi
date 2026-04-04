import{a as e,n as t,o as n,s as r,t as i}from"./Footer-Duogp7ad.js";import{n as a,t as o}from"./SavedReadings-BFfcoB2S.js";function s(e=`/`){r()||window.location.replace(e)}s(`/`),t(`#site-header-mount`,{activePath:`/account.html`}),i(`#site-footer-mount`);var c=n(),l=c.name?.[0]?.toUpperCase()??`✦`,u=document.getElementById(`account-avatar`);if(c.avatar?u.innerHTML=`<img src="${c.avatar}" alt="${c.name}"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`:u.textContent=l,document.getElementById(`account-name`).textContent=c.name??`Seeker`,document.getElementById(`account-email`).textContent=c.email??``,c.birthday){let[e,t,n]=c.birthday.split(`-`).map(Number),r=new Date(e,t-1,n).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}),i=document.getElementById(`account-birthday`);i&&(i.textContent=r)}document.getElementById(`sign-out-btn`).addEventListener(`click`,()=>{e(),window.location.href=`/`});var d={Hearts:`var(--suit-hearts)`,Clubs:`var(--suit-clubs)`,Diamonds:`var(--suit-diamonds)`,Spades:`var(--suit-spades)`,Joker:`var(--suit-joker)`};function f(){let e=document.getElementById(`saved-readings-list`),t=a();if(t.length===0){e.innerHTML=`
          <div style="padding:2.5rem;text-align:center;background:var(--color-dusk);
            border:1px dashed var(--color-mist);border-radius:var(--radius-lg);">
            <div style="font-size:2rem;margin-bottom:0.75rem;opacity:0.35;">♦</div>
            <p style="color:var(--color-mist);font-size:0.9rem;margin:0;">
              No saved readings yet.<br>
              <span style="font-size:0.82rem;">Complete a reading and hit <strong>♦ Save Reading</strong>.</span>
            </p>
          </div>`;return}e.innerHTML=t.map(e=>{let t=new Date(e.savedAt).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}),n=d[e.cardSuit]??`var(--color-gold)`;return`
          <div data-reading-id="${e.id}"
            style="display:flex;align-items:center;gap:1rem;padding:1rem 1.25rem;
              background:var(--color-dusk);border:1px solid var(--color-mist);
              border-radius:var(--radius-md);margin-bottom:0.75rem;">
            <div style="font-size:1.4rem;color:${n};flex-shrink:0;width:1.8rem;text-align:center;">
              ${e.cardSuitSymbol}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-family:var(--font-heading);font-size:0.88rem;color:var(--color-light);
                white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.cardName}</div>
              <div style="font-size:0.78rem;color:var(--color-dawn);margin-top:0.15rem;">
                ${e.label} · ${e.eyebrow}
              </div>
            </div>
            <div style="font-size:0.75rem;color:var(--color-mist);flex-shrink:0;text-align:right;">
              ${t}
            </div>
            <button data-delete="${e.id}"
              style="background:none;border:none;color:var(--color-mist);cursor:pointer;
                font-size:1rem;padding:0.25rem 0.4rem;border-radius:var(--radius-sm);
                transition:color 0.15s,background 0.15s;flex-shrink:0;"
              aria-label="Delete reading"
              onmouseover="this.style.color='var(--color-error)';this.style.background='rgba(224,92,92,0.1)'"
              onmouseout="this.style.color='var(--color-mist)';this.style.background='none'">
              ✕
            </button>
          </div>`}).join(``),e.querySelectorAll(`[data-delete]`).forEach(e=>{e.addEventListener(`click`,()=>{o(e.dataset.delete),f()})})}f(),document.body.classList.replace(`js-loading`,`js-ready`);