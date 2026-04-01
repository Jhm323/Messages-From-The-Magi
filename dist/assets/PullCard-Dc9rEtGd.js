import{n as e,r as t,t as n}from"./index-ArXBcU0-.js";function r(e){let r=document.querySelector(e);if(!r)return;r.innerHTML=i();let a=r.querySelector(`[data-draw]`),o=r.querySelector(`[data-result]`),s=r.querySelector(`[data-card-back]`);a.addEventListener(`click`,c);function c(){a.disabled=!0,a.textContent=`✦ Drawing…`,s.classList.add(`animate-pulse-gold`),setTimeout(()=>{o.innerHTML=n(t(),{eyebrow:`The Cards Speak`,subheading:`Your Oracle Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),s.style.display=`none`,o.style.display=`block`,a.textContent=`✦ Pull Another Card`,a.disabled=!1,a.removeEventListener(`click`,c),a.addEventListener(`click`,e);function e(){o.style.display=`none`,s.style.display=`flex`,s.classList.remove(`animate-pulse-gold`),setTimeout(c,120)}},900)}}function i(){return`
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
    <img src="${e().imagePath}" alt="Card back" style="width:100%;height:100%;object-fit:cover;">
  </div>

  <button class="btn btn--primary" data-draw>
    ✦ Pull a Card
  </button>

  <div data-result style="display:none;margin-top:2rem;"></div>
</div>`}export{r as initPullCard};