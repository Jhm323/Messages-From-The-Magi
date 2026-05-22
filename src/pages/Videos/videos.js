import "./videos.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/videos.html" });
initFooter("#site-footer-mount");
document.body.classList.replace("js-loading", "js-ready");

const YT_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const YT_MAX = 8;

async function loadSubstackPosts() {
  const strip = document.getElementById("substack-strip");
  const grid = document.getElementById("substack-posts");
  if (!strip || !grid) return;

  try {
    const rssEndpoint = import.meta.env.DEV
      ? `https://corsproxy.io/?${encodeURIComponent("https://starofthemagi.substack.com/feed")}`
      : "/api/rss";
    const res = await fetch(rssEndpoint);
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, "text/xml");
    const items = [...xml.querySelectorAll("item")].slice(0, 3);

    if (!items.length) {
      strip.style.display = "none";
      return;
    }

    grid.innerHTML = items
      .map((item) => {
        const title = item.querySelector("title")?.textContent ?? "";
        const link = item.querySelector("link")?.textContent ?? "#";
        const pubDate = item.querySelector("pubDate")?.textContent ?? "";
        const desc = item.querySelector("description")?.textContent ?? "";

        // Full post HTML lives in content:encoded
        const encoded = item.querySelector("encoded")?.textContent ?? "";

        // Prefer first <img> from post body (post-specific art)
        const imgMatch = encoded.match(/<img[^>]+src=["']([^"']+)["']/i);
        const bodyImg = imgMatch ? imgMatch[1] : null;

        // Fall back to enclosure only if it isn't the generic profile image
        const enclosureUrl =
          item.querySelector("enclosure")?.getAttribute("url") ?? null;

        const enclosureImg = enclosureUrl ?? null;

        const imageUrl = bodyImg || enclosureImg;

        const excerpt =
          desc
            .replace(/<[^>]+>/g, "")
            .slice(0, 120)
            .trimEnd() + "…";

        const date = pubDate
          ? new Date(pubDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "";

        return `
        <a class="substack-card" href="${link}" target="_blank" rel="noopener noreferrer">
          ${
            imageUrl
              ? `<div class="substack-card__img-wrap">
              <img class="substack-card__img" src="${imageUrl}" alt="${title}" loading="lazy" />
            </div>`
              : ""
          }
          <div class="substack-card__date">${date}</div>
          <div class="substack-card__title">${title}</div>
          <p class="substack-card__excerpt">${excerpt}</p>
          <span class="substack-card__cta">Read on Substack ↗</span>
        </a>`;
      })
      .join("");
  } catch {
    if (strip) strip.style.display = "none";
  }
}

async function loadYouTubeVideos() {
  const grid = document.getElementById("video-grid-mount");
  if (!grid) return;

  grid.innerHTML = Array(4)
    .fill(
      `
    <div class="video-card video-card--loading">
      <div class="video-card__thumbnail"></div>
      <div class="video-card__content">
        <div class="video-card__skeleton video-card__skeleton--label"></div>
        <div class="video-card__skeleton video-card__skeleton--title"></div>
        <div class="video-card__skeleton video-card__skeleton--body"></div>
      </div>
    </div>`,
    )
    .join("");

  if (!YT_CHANNEL_ID) {
    renderVideoFallback(grid);
    return;
  }

  try {
    const params = new URLSearchParams({ channelId: YT_CHANNEL_ID, maxResults: YT_MAX, order: "date", type: "video" });
    const res = await fetch(`/api/youtube?${params}`);
    if (!res.ok) throw new Error(`YouTube API ${res.status}`);
    const data = await res.json();

    if (!data.items?.length) {
      renderVideoFallback(grid);
      return;
    }

    grid.innerHTML = data.items
      .map((item) => {
        const { title, description, thumbnails, publishedAt } = item.snippet;
        const videoId = item.id.videoId;
        const thumb = thumbnails.high?.url ?? thumbnails.default?.url;
        const excerpt =
          description.slice(0, 100).trimEnd() +
          (description.length > 100 ? "…" : "");
        const date = new Date(publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
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
      })
      .join("");
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
