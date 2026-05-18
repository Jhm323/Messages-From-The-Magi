import "./home.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import "../../components/ui/Button/Button.js";
import "../../components/ui/Form/Form.js";
import { getCardOfTheDay } from "../../api/cardQueries.js";
import { renderCardResult } from "../../components/CardResult/CardResult.js";

document.addEventListener("DOMContentLoaded", () => {
  initPageAnimations();
  initHeader("#site-header-mount", { activePath: "/" });
  initFooter("#site-footer-mount");
  initCardOfTheDay();
  document.body.classList.replace("js-loading", "js-ready");
});

function initCardOfTheDay() {
  const mount = document.querySelector("#card-of-day-mount");
  if (!mount) return;
  const card = getCardOfTheDay();
  if (!card) return;
  mount.innerHTML = renderCardResult(card, {
    eyebrow: new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    subheading: "Card of the Day",
    showAffirmation: true,
    showAction: false,
    showDescription: false,
    compact: true,
  });
}

