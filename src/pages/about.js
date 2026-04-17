import { initHeader }         from "../components/Header/Header.js";
import { initFooter }         from "../components/Footer/Footer.js";
import { initCosmos }         from "../components/Cosmos/Cosmos.js";
import { initPageAnimations } from "../components/PageAnimations/PageAnimations.js";

initCosmos();
initPageAnimations();
initHeader("#site-header-mount", { activePath: "/about.html" });
initFooter("#site-footer-mount");
document.body.classList.replace("js-loading", "js-ready");
