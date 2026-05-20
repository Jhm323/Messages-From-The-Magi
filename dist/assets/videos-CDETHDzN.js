import{n as e,r as t,t as n}from"./PageAnimations-SjEbwQho.js";n(),t(`#site-header-mount`,{activePath:`/videos.html`}),e(`#site-footer-mount`),document.body.classList.replace(`js-loading`,`js-ready`);var r=`***REDACTED***`,i=`UC76xXGUjaAwdxCgvY1Jv6ZA`,a=8;async function o(){let e=document.getElementById(`substack-strip`),t=document.getElementById(`substack-posts`);if(!(!e||!t))try{let n=await(await fetch(`/api/rss`)).text(),r=[...new DOMParser().parseFromString(n,`text/xml`).querySelectorAll(`item`)].slice(0,3);if(!r.length){e.style.display=`none`;return}t.innerHTML=r.map(e=>{let t=e.querySelector(`title`)?.textContent??``,n=e.querySelector(`link`)?.textContent??`#`,r=e.querySelector(`pubDate`)?.textContent??``,i=e.querySelector(`description`)?.textContent??``,a=(e.querySelector(`encoded`)?.textContent??``).match(/<img[^>]+src=["']([^"']+)["']/i),o=a?a[1]:null,s=e.querySelector(`enclosure`)?.getAttribute(`url`)??null??null,c=o||s,l=i.replace(/<[^>]+>/g,``).slice(0,120).trimEnd()+`…`,u=r?new Date(r).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`}):``;return`
        <a class="substack-card" href="${n}" target="_blank" rel="noopener noreferrer">
          ${c?`<div class="substack-card__img-wrap">
              <img class="substack-card__img" src="${c}" alt="${t}" loading="lazy" />
            </div>`:``}
          <div class="substack-card__date">${u}</div>
          <div class="substack-card__title">${t}</div>
          <p class="substack-card__excerpt">${l}</p>
          <span class="substack-card__cta">Read on Substack ↗</span>
        </a>`}).join(``)}catch{e&&(e.style.display=`none`)}}async function s(){let e=document.getElementById(`video-grid-mount`);if(e){e.innerHTML=[,,,,].fill(`
    <div class="video-card video-card--loading">
      <div class="video-card__thumbnail"></div>
      <div class="video-card__content">
        <div class="video-card__skeleton video-card__skeleton--label"></div>
        <div class="video-card__skeleton video-card__skeleton--title"></div>
        <div class="video-card__skeleton video-card__skeleton--body"></div>
      </div>
    </div>`).join(``);try{let t=`https://www.googleapis.com/youtube/v3/search?key=${r}&channelId=${i}&part=snippet&order=date&type=video&maxResults=${a}`,n=await fetch(t);if(!n.ok)throw Error(`YouTube API ${n.status}`);let o=await n.json();if(!o.items?.length){c(e);return}e.innerHTML=o.items.map(e=>{let{title:t,description:n,thumbnails:r,publishedAt:i}=e.snippet,a=e.id.videoId,o=r.high?.url??r.default?.url,s=n.slice(0,100).trimEnd()+(n.length>100?`…`:``);return`
        <a class="video-card" href="https://www.youtube.com/watch?v=${a}"
           target="_blank" rel="noopener noreferrer">
          <div class="video-card__thumbnail">
            <img class="video-card__thumb-img" src="${o}" alt="${t}" loading="lazy" />
          </div>
          <div class="video-card__content">
            <div class="video-card__date">${new Date(i).toLocaleDateString(`en-US`,{month:`long`,day:`numeric`,year:`numeric`})}</div>
            <div class="video-card__title">${t}</div>
            <p class="video-card__excerpt">${s}</p>
            <span class="video-card__watch">Watch on YouTube ↗</span>
          </div>
        </a>`}).join(``)}catch{c(e)}}}function c(e){e.innerHTML=`
    <p class="video-fallback">
      Videos unavailable right now —
      <a href="https://www.youtube.com/@StaroftheMagi/videos" target="_blank" rel="noopener noreferrer">
        watch on YouTube ↗
      </a>
    </p>`}o(),s();