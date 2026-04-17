import './PageBackground.css';

/**
 * Injects a full-viewport background image behind all page content.
 * @param {string} imagePath - Path to the image (e.g. '/images/bg-shop.png')
 * @param {{ tile?: boolean, tileSize?: string }} options
 */
export function initPageBackground(imagePath, { tile = false, tileSize = '600px 600px' } = {}) {
  document.body.classList.add('has-page-bg');

  const el = document.createElement('div');
  el.className = tile ? 'page-bg page-bg--tile' : 'page-bg';
  el.setAttribute('aria-hidden', 'true');
  el.style.backgroundImage = `url('${imagePath}')`;
  if (tile && tileSize !== '600px 600px') {
    el.style.backgroundSize = tileSize;
  }

  document.body.insertBefore(el, document.body.firstChild);
}
