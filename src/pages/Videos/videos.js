import "./videos.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initCosmos } from "../../components/Cosmos/Cosmos.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import { initChipGroup } from "../../components/ui/SelectionChip/SelectionChip.js";

initCosmos();
initPageAnimations();
initHeader("#site-header-mount", { activePath: "/videos.html" });
initFooter("#site-footer-mount");
initChipGroup(document.getElementById("video-filter-chips"));
document.body.classList.replace("js-loading", "js-ready");
