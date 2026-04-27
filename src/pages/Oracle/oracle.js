import "./oracle.css";
import { initHeader }         from "../../components/Header/Header.js";
import { initFooter }         from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import { initPullCard }       from "../../components/PullCard.js";

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/oracle.html" });
initFooter("#site-footer-mount");
initPullCard("#pull-card-mount");
document.body.classList.replace("js-loading", "js-ready");
