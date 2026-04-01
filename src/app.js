/**
 * Messages from the Magi — App Entry Point
 * Bootstraps all feature components and wires up page interactions.
 */

import { openCompatibilityModal } from "./components/CompatibilityModal.js";
import { openGreetingCardModal  } from "./components/GreetingCardModal.js";
import { openBirthCardModal     } from "./components/BirthCardModal.js";
import { openGeolocationModal   } from "./components/GeolocationModal.js";
import { getCardOfTheDay        } from "./api/cardQueries.js";
import { renderCardResult       } from "./components/CardResult.js";

document.addEventListener("DOMContentLoaded", () => {
  bindFeatureButtons();
  initPullCardSection();
  initCardOfTheDay();
  initScrollEffects();
  injectCardsNavLink();
});

function bindFeatureButtons() {
  document.querySelectorAll("[data-feature]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switch (btn.dataset.feature) {
        case "compatibility":  openCompatibilityModal(); break;
        case "greeting-card":  openGreetingCardModal();  break;
        case "birth-card":     openBirthCardModal();     break;
        case "geolocation":    openGeolocationModal();   break;
        default: console.warn("Unknown feature:", btn.dataset.feature);
      }
    });
    btn.style.cursor = "pointer";
  });
}

function initPullCardSection() {
  const mount = document.querySelector("#pull-card-mount");
  if (!mount) return;
  import("./components/PullCard.js").then(({ initPullCard }) => {
    initPullCard("#pull-card-mount");
  });
}

function initCardOfTheDay() {
  const mount = document.querySelector("#card-of-day-mount");
  if (!mount) return;
  const card = getCardOfTheDay();
  if (!card) return;
  mount.innerHTML = renderCardResult(card, {
    eyebrow:         new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" }),
    subheading:      "Card of the Day",
    showAffirmation: true,
    showAction:      false,
    showDescription: false,
    compact:         true,
  });
}

function injectCardsNavLink() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;
  const link = document.createElement("a");
  link.href      = "/cards.html";
  link.className = "nav-link";
  link.textContent = "The Cards";
  const first = nav.querySelector(".nav-link");
  if (first) first.after(link);
  else nav.prepend(link);
}

function initScrollEffects() {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-up");
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".feature-btn, .tier-card").forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}
