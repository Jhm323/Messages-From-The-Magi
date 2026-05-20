import{n as e,r as t,t as n}from"./PageAnimations-SjEbwQho.js";import{r,s as i,t as a}from"./CardResult-Dyqsb-xX.js";function o(e){let t=document.querySelector(e);if(!t)return;t.innerHTML=s();let n=t.querySelector(`[data-draw]`),r=t.querySelector(`[data-result]`),o=t.querySelector(`[data-card-back]`);n.addEventListener(`click`,c);function c(){n.disabled=!0,n.textContent=`✦ Drawing…`,o.classList.add(`animate-pulse-gold`),setTimeout(()=>{r.innerHTML=a(i(),{eyebrow:`The Cards Speak`,subheading:`Your Oracle Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),o.style.display=`none`,r.style.display=`block`,n.textContent=`✦ Pull Another Card`,n.disabled=!1,n.removeEventListener(`click`,c),n.addEventListener(`click`,e);function e(){r.style.display=`none`,o.style.display=`flex`,o.classList.remove(`animate-pulse-gold`),setTimeout(c,120)}},900)}}function s(){return`
<div style="text-align:center;">
  <div data-card-back
    style="width:200px;height:300px;margin:0 auto 24px;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--color-gold-muted);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:box-shadow 0.3s;"
    onclick="this.closest('[data-pull-root]')?.querySelector('[data-draw]')?.click()">
    <img src="${r().imagePath}" alt="Card back" style="width:100%;height:100%;object-fit:cover;">
  </div>

  <button class="btn btn--primary" data-draw>
    ✦ Pull a Card
  </button>

  <div data-result style="display:none;margin-top:32px;"></div>
</div>`}n(),t(`#site-header-mount`,{activePath:`/oracle.html`}),e(`#site-footer-mount`),o(`#pull-card-mount`),document.body.classList.replace(`js-loading`,`js-ready`);