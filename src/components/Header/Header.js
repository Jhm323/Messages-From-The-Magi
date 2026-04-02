/**
 * Header — site-wide sticky navigation.
 * Usage: initHeader('#site-header-mount', { page: 'home' | 'cards' })
 */

import './Header.css';

const NAV = {
  home: [
    { href: '#features',   label: 'Readings' },
    { href: '/cards.html', label: 'The Cards' },
    { href: '#pull-card',  label: 'Oracle' },
    { href: '#the-system', label: 'The System' },
    { href: '#join',       label: 'Join the Order' },
    { href: '#about',      label: 'About' },
    { href: '#contact',    label: 'Book a Reading', extra: 'btn btn--secondary', style: 'margin-left:0.5rem;' },
  ],
  cards: [
    { href: '/index.html',       label: '← Home' },
    { href: '/cards.html',       label: 'The Cards', active: true },
    { href: '/index.html#join',  label: 'Join the Order' },
    { href: '/index.html#about', label: 'Book a Reading', extra: 'btn btn--secondary', style: 'margin-left:0.5rem;' },
  ],
};

function buildHTML(page) {
  const links = NAV[page] || NAV.home;
  const navItems = links.map(({ href, label, extra = '', active = false, style = '' }) => {
    const cls = ['nav-link', extra, active ? 'nav-link--active' : ''].filter(Boolean).join(' ');
    return `<a href="${href}" class="${cls}"${style ? ` style="${style}"` : ''}>${label}</a>`;
  }).join('\n      ');

  return `
<header class="site-header">
  <div class="site-header__inner">
    <a href="/" class="site-logo" style="text-decoration:none;">
      Messages from the Magi
    </a>
    <nav class="site-nav" aria-label="Main navigation">
      ${navItems}
    </nav>
  </div>
</header>`;
}

export function initHeader(selector, { page = 'home' } = {}) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.insertAdjacentHTML('afterend', buildHTML(page));
  mount.remove();
}
