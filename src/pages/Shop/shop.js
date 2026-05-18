import "./shop.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";

initHeader("#site-header-mount", { activePath: "/shop.html" });
initFooter("#site-footer-mount");
initPageAnimations();

document.body.classList.replace("js-loading", "js-ready");
