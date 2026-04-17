import{i as e,n as t,r as n,t as r}from"./PageAnimations-B3zyfM8q.js";import{r as i,s as a,t as o}from"./CardResult-BxKRgbki.js";function s(e){let t=document.querySelector(e);if(!t)return;t.innerHTML=c();let n=t.querySelector(`[data-draw]`),r=t.querySelector(`[data-result]`),i=t.querySelector(`[data-card-back]`);n.addEventListener(`click`,s);function s(){n.disabled=!0,n.textContent=`✦ Drawing…`,i.classList.add(`animate-pulse-gold`),setTimeout(()=>{r.innerHTML=o(a(),{eyebrow:`The Cards Speak`,subheading:`Your Oracle Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),i.style.display=`none`,r.style.display=`block`,n.textContent=`✦ Pull Another Card`,n.disabled=!1,n.removeEventListener(`click`,s),n.addEventListener(`click`,e);function e(){r.style.display=`none`,i.style.display=`flex`,i.classList.remove(`animate-pulse-gold`),setTimeout(s,120)}},900)}}function c(){return`
<div style="text-align:center;">
  <h3 style="font-family:var(--font-display);color:var(--color-gold);font-size:1.4rem;margin-bottom:0.5rem;">
    Pull a Card
  </h3>
  <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:2rem;max-width:400px;margin-left:auto;margin-right:auto;">
    Still your mind. Take a breath. Ask your question — then let the cards speak.
  </p>

  <div data-card-back
    style="width:200px;height:300px;margin:0 auto 1.5rem;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--color-gold-muted);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:box-shadow 0.3s;"
    onclick="this.closest('[data-pull-root]')?.querySelector('[data-draw]')?.click()">
    <img src="${i().imagePath}" alt="Card back" style="width:100%;height:100%;object-fit:cover;">
  </div>

  <button class="btn btn--primary" data-draw>
    ✦ Pull a Card
  </button>

  <div data-result style="display:none;margin-top:2rem;"></div>
</div>`}t(),r(),e(`#site-header-mount`,{activePath:`/oracle.html`}),n(`#site-footer-mount`),s(`#pull-card-mount`),document.body.classList.replace(`js-loading`,`js-ready`);