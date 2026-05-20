import "./readings.css";
import { initHeader }             from "../../components/Header/Header.js";
import { initFooter }             from "../../components/Footer/Footer.js";
import { initPageAnimations }     from "../../components/PageAnimations/PageAnimations.js";
import { openBirthCardModal, openBirthCardModalWithData }         from "../../components/BirthCardModal/BirthCardModal.js";
import { openCompatibilityModal, openCompatibilityModalWithData } from "../../components/CompatibilityModal/CompatibilityModal.js";
import { openGeolocationModal, openGeolocationModalWithData }     from "../../components/GeolocationModal.js";
import { openGreetingCardModal }                                  from "../../components/GreetingCard/GreetingCardModal.js";

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

const reopenRaw = sessionStorage.getItem('magi_reopen');
if (reopenRaw) {
  sessionStorage.removeItem('magi_reopen');
  try {
    const reading = JSON.parse(reopenRaw);
    if (reading.type === 'birth-card') {
      openBirthCardModalWithData(reading);
    } else if (reading.type === 'compatibility') {
      openCompatibilityModalWithData(reading);
    } else if (reading.type === 'geolocation') {
      openGeolocationModalWithData(reading);
    }
  } catch {
    // ignore malformed data
  }
}
