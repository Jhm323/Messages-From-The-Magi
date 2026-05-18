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

const SUBSTACK_RSS  = 'https://starofthemagi.substack.com/feed';
const CORS_PROXY    = 'https://api.allorigins.win/get?url=';

const YT_API_KEY    = import.meta.env.VITE_YOUTUBE_API_KEY;
const YT_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const YT_MAX        = 8;

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

async function loadYouTubeVideos() {
  const grid = document.getElementById('video-grid-mount');
  if (!grid) return;

  grid.innerHTML = Array(4).fill(`
    <div class="video-card video-card--loading">
      <div class="video-card__thumbnail"></div>
      <div class="video-card__content">
        <div class="video-card__skeleton video-card__skeleton--label"></div>
        <div class="video-card__skeleton video-card__skeleton--title"></div>
        <div class="video-card__skeleton video-card__skeleton--body"></div>
      </div>
    </div>`).join('');

  if (!YT_API_KEY || !YT_CHANNEL_ID) {
    renderVideoFallback(grid);
    return;
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${YT_CHANNEL_ID}&part=snippet&order=date&type=video&maxResults=${YT_MAX}`;
    const res  = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);
    const data = await res.json();

    if (!data.items?.length) { renderVideoFallback(grid); return; }

    grid.innerHTML = data.items.map(item => {
      const { title, description, thumbnails, publishedAt } = item.snippet;
      const videoId = item.id.videoId;
      const thumb   = thumbnails.high?.url ?? thumbnails.default?.url;
      const excerpt = description.slice(0, 100).trimEnd() + (description.length > 100 ? '…' : '');
      const date    = new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
      });

      return `
        <a class="video-card" href="https://www.youtube.com/watch?v=${videoId}"
           target="_blank" rel="noopener noreferrer">
          <div class="video-card__thumbnail">
            <img class="video-card__thumb-img" src="${thumb}" alt="${title}" loading="lazy" />
          </div>
          <div class="video-card__content">
            <div class="video-card__date">${date}</div>
            <div class="video-card__title">${title}</div>
            <p class="video-card__excerpt">${excerpt}</p>
            <span class="video-card__watch">Watch on YouTube ↗</span>
          </div>
        </a>`;
    }).join('');

  } catch {
    renderVideoFallback(grid);
  }
}

function renderVideoFallback(grid) {
  grid.innerHTML = `
    <p class="video-fallback">
      Videos unavailable right now —
      <a href="https://www.youtube.com/@StaroftheMagi/videos" target="_blank" rel="noopener noreferrer">
        watch on YouTube ↗
      </a>
    </p>`;
}

loadSubstackPosts();
loadYouTubeVideos();
