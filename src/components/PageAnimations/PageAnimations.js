import "./PageAnimations.css";

export function initPageAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Gate initial hidden states on JS being present
  document.documentElement.classList.add("js-animate");

  if (!reduced) {
    document.querySelectorAll(".magic-h").forEach((el) => {
      const words = el.textContent.trim().split(" ");
      let ci = 0;
      const parts = [];
      words.forEach((word, wi) => {
        const letters = [...word]
          .map((ch) => `<span class="ch" style="--ci:${ci++}">${ch}</span>`)
          .join("");
        parts.push(`<span class="ch-word">${letters}</span>`);
        if (wi < words.length - 1) {
          ci++; // keep timing consistent with original character count
          parts.push(" ");
        }
      });
      el.innerHTML = parts.join("");
    });
  }

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(".anim-hero, .anim-deal, .anim-reveal, .anim-para")
    .forEach((el) => revealObs.observe(el));

  const cardObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll(".play-card").forEach((card, i) => {
          setTimeout(() => card.classList.add("is-dealt"), i * 160);
        });
        cardObs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 },
  );

  document
    .querySelectorAll(".card-diamond")
    .forEach((el) => cardObs.observe(el));
}
