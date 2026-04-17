import "./readings.css";
import { initHeader }             from "../../components/Header/Header.js";
import { initFooter }             from "../../components/Footer/Footer.js";
import { initCosmos }             from "../../components/Cosmos/Cosmos.js";
import { initPageAnimations }     from "../../components/PageAnimations/PageAnimations.js";
import { openBirthCardModal }     from "../../components/BirthCardModal.js";
import { openCompatibilityModal } from "../../components/CompatibilityModal.js";
import { openGeolocationModal }   from "../../components/GeolocationModal.js";
import { openGreetingCardModal }  from "../../components/GreetingCard/GreetingCardModal.js";

initCosmos();
initPageAnimations();
initHeader("#site-header-mount", { activePath: "/readings.html" });
initFooter("#site-footer-mount");
document.body.classList.replace("js-loading", "js-ready");

const openMap = {
  "birth-card":    openBirthCardModal,
  "compatibility": openCompatibilityModal,
  "geolocation":   openGeolocationModal,
  "greeting-card": openGreetingCardModal,
};

document.querySelectorAll("[data-feature]").forEach(btn => {
  btn.addEventListener("click", () => {
    const fn = openMap[btn.dataset.feature];
    if (fn) fn();
  });
});

const openParam = new URLSearchParams(location.search).get("open");
if (openParam && openMap[openParam]) {
  openMap[openParam]();
}
