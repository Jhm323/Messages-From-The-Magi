import{n as e,t}from"./Footer-Dt2lRjst.js";import{c as n,i as r,t as i}from"./CardResult-ICDmN0RT.js";function a(e){let t=document.querySelector(e);if(!t)return;t.innerHTML=o();let r=t.querySelector(`[data-draw]`),a=t.querySelector(`[data-result]`),s=t.querySelector(`[data-card-back]`);r.addEventListener(`click`,c);function c(){r.disabled=!0,r.textContent=`✦ Drawing…`,s.classList.add(`animate-pulse-gold`),setTimeout(()=>{a.innerHTML=i(n(),{eyebrow:`The Cards Speak`,subheading:`Your Oracle Card`,showAffirmation:!0,showAction:!0,showDescription:!0}),s.style.display=`none`,a.style.display=`block`,r.textContent=`✦ Pull Another Card`,r.disabled=!1,r.removeEventListener(`click`,c),r.addEventListener(`click`,e);function e(){a.style.display=`none`,s.style.display=`flex`,s.classList.remove(`animate-pulse-gold`),setTimeout(c,120)}},900)}}function o(){return`
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
    <img src="${r().imagePath}" alt="Card back" style="width:100%;height:100%;object-fit:cover;">
  </div>

  <button class="btn btn--primary" data-draw>
    ✦ Pull a Card
  </button>

  <div data-result style="display:none;margin-top:2rem;"></div>
</div>`}e(`#site-header-mount`,{activePath:`/oracle.html`}),t(`#site-footer-mount`),a(`#pull-card-mount`),document.body.classList.replace(`js-loading`,`js-ready`);