import "./videos.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import { initChipGroup } from "../../components/ui/SelectionChip/SelectionChip.js";

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/videos.html" });
initFooter("#site-footer-mount");
initChipGroup(document.getElementById("video-filter-chips"));
document.body.classList.replace("js-loading", "js-ready");

const SUBSTACK_RSS = 'https://starofthemagi.substack.com/feed';
const CORS_PROXY   = 'https://api.allorigins.win/get?url=';

async function loadSubstackPosts() {
  const strip = document.getElementById('substack-strip');
  const grid  = document.getElementById('substack-posts');
  if (!strip || !grid) return;

  try {
    const res  = await fetch(`${CORS_PROXY}${encodeURIComponent(SUBSTACK_RSS)}`);
    const json = await res.json();
    const xml  = new DOMParser().parseFromString(json.contents, 'text/xml');
    const items = [...xml.querySelectorAll('item')].slice(0, 3);

    if (!items.length) { strip.style.display = 'none'; return; }

    grid.innerHTML = items.map(item => {
      const title   = item.querySelector('title')?.textContent ?? '';
      const link    = item.querySelector('link')?.textContent ?? '#';
      const pubDate = item.querySelector('pubDate')?.textContent ?? '';
      const desc    = item.querySelector('description')?.textContent ?? '';

      const excerpt = desc.replace(/<[^>]+>/g, '').slice(0, 120).trimEnd() + '…';

      const date = pubDate
        ? new Date(pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : '';

      return `
        <a class="substack-card" href="${link}" target="_blank" rel="noopener noreferrer">
          <div class="substack-card__date">${date}</div>
          <div class="substack-card__title">${title}</div>
          <p class="substack-card__excerpt">${excerpt}</p>
          <span class="substack-card__cta">Read on Substack ↗</span>
        </a>`;
    }).join('');

  } catch {
    if (strip) strip.style.display = 'none';
  }
}

loadSubstackPosts();
