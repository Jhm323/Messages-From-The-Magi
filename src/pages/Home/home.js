import "./home.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initCosmos } from "../../components/Cosmos/Cosmos.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import "../../components/ui/Button/Button.js";
import "../../components/ui/Form/Form.js";
import { openBirthCardModal } from "../../components/BirthCardModal.js";
import { getCardOfTheDay } from "../../api/cardQueries.js";
import { renderCardResult } from "../../components/CardResult/CardResult.js";

document.addEventListener("DOMContentLoaded", () => {
  initCosmos();
  initPageAnimations();
  initHeader("#site-header-mount", { activePath: "/" });
  initFooter("#site-footer-mount");
  initCardOfTheDay();
  bindBirthCardBtn();
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

function bindBirthCardBtn() {
  document.querySelectorAll("[data-feature='birth-card']").forEach((btn) => {
    btn.style.cursor = "pointer";
    btn.addEventListener("click", openBirthCardModal);
  });
}
