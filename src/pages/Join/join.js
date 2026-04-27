import "./join.css";
import { initHeader }         from "../../components/Header/Header.js";
import { initFooter }         from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/join.html" });
initFooter("#site-footer-mount");
document.body.classList.replace("js-loading", "js-ready");
