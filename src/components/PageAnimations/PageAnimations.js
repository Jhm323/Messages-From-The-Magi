import './PageAnimations.css';

export function initPageAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gate initial hidden states on JS being present
  document.documentElement.classList.add('js-animate');

  // ── Magic letter split for .magic-h headings ──────────────────────────
  if (!reduced) {
    document.querySelectorAll('.magic-h').forEach(el => {
      const text = el.textContent;
      el.innerHTML = [...text].map((ch, i) => {
        const isSpace = ch === ' ';
        return `<span class="ch${isSpace ? ' ch--space' : ''}" style="--ci:${i}">${isSpace ? '\u00a0' : ch}</span>`;
      }).join('');
    });
  }

  // ── Floating symbol particles ──────────────────────────────────────────
  if (!reduced) {
    const SYMS = ['✦', '♥', '♣', '♦', '♠', '◆', '★', '·', '✧'];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('span');
      p.className = 'x-particle';
      p.setAttribute('aria-hidden', 'true');
      p.textContent = SYMS[i % SYMS.length];
      p.style.setProperty('--dur', `${5 + Math.random() * 7}s`);
      p.style.setProperty('--delay', `${-(Math.random() * 8)}s`);
      p.style.left = `${5 + Math.random() * 90}%`;
      p.style.top  = `${5 + Math.random() * 90}%`;
      document.body.appendChild(p);
    }
  }

  // ── Scroll-reveal observer ─────────────────────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim-hero, .anim-deal, .anim-reveal, .anim-para')
    .forEach(el => revealObs.observe(el));

  // ── Card diamond deal observer ─────────────────────────────────────────
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.play-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('is-dealt'), i * 160);
      });
      cardObs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.card-diamond').forEach(el => cardObs.observe(el));
}
