/**
 * Header — site-wide sticky navigation with left-side dropdown menu.
 * Usage: initHeader('#site-header-mount', { activePath: '/readings.html' })
 */

import './Header.css';
import { getUser, isLoggedIn, onAuthChange } from '../../auth/AuthStore.js';
import { openLoginModal } from '../AuthModals/AuthModals.js';
import { initCart, openCart } from '../Cart/Cart.js';
import { getCartCount, onCartChange } from '../../cart/CartStore.js';

const NAV_ITEMS = [
  { href: '/',              label: 'Home',               icon: '✦' },
  {
    href: '/readings.html', label: 'Readings',            icon: '♥', iconColor: 'var(--suit-hearts)',
    subItems: [
      { href: '/readings.html?open=birth-card',    label: 'Birth Card Reading',    icon: '♣', iconColor: 'var(--suit-clubs)' },
      { href: '/readings.html?open=compatibility', label: 'Compatibility Reading', iconHTML: '<span style="color:var(--suit-hearts)">♥</span><span style="color:var(--suit-spades)">♠</span>' },
      { href: '/readings.html?open=geolocation',   label: 'Location Reading',      icon: '♦', iconColor: 'var(--suit-diamonds)' },
      { href: '/readings.html?open=greeting-card', label: 'Greeting Card',         icon: '♠', iconColor: 'var(--suit-spades)' },
    ],
  },
  { href: '/oracle.html',   label: 'Oracle',             icon: '🃏' },
  { href: '/explore.html',  label: 'Explore the System', icon: '♦', iconColor: 'var(--suit-diamonds)' },
  { href: '/videos.html',   label: 'Videos & Content',  icon: '▶' },
  { href: '/join.html',     label: 'Join the Order',     icon: '♣', iconColor: 'var(--suit-clubs)' },
  { href: '/shop.html',     label: 'The Magi Shop',      icon: '💎' },
  { href: '/about.html',    label: 'About & Contact',    icon: '♠', iconColor: 'var(--suit-spades)' },
];

function iconSpan(item, cls = 'nav-dropdown__icon') {
  const style = item.iconColor ? ` style="color:${item.iconColor}"` : '';
  const content = item.iconHTML ?? item.icon;
  return `<span class="${cls}"${style}>${content}</span>`;
}

function buildHTML(activePath) {
  const items = NAV_ITEMS.map((item) => {
    const { href, label, subItems } = item;
    const active = activePath === href || (subItems && subItems.some(s => s.href === activePath));

    if (subItems) {
      const subs = subItems.map(sub => `
        <a href="${sub.href}" class="nav-sub__link">
          ${iconSpan(sub)}
          <span>${sub.label}</span>
        </a>`).join('');
      return `
<div class="nav-item--has-sub">
  <a href="${href}" class="nav-dropdown__link${active ? ' nav-dropdown__link--active' : ''}">
    ${iconSpan(item)}
    <span>${label}</span>
    <span class="nav-sub__arrow">›</span>
  </a>
  <div class="nav-sub-menu">${subs}</div>
</div>`;
    }

    return `<a href="${href}" class="nav-dropdown__link${active ? ' nav-dropdown__link--active' : ''}">
      ${iconSpan(item)}
      <span>${label}</span>
    </a>`;
  }).join('\n');

  return `
<header class="site-header">
  <div class="site-header__inner">
    <button class="nav-menu-btn" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav-dropdown">
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
      <span class="nav-menu-btn__bar"></span>
    </button>

    <a href="/" class="site-logo" style="text-decoration:none;">The Mystic Oracle</a>

    <div id="site-header-auth" class="header-auth"></div>
    <button class="header-cart-btn" id="header-cart-btn" aria-label="Open cart">
      🛒
      <span class="header-cart-btn__badge" id="header-cart-badge">0</span>
    </button>

    <div id="site-nav-dropdown" class="nav-dropdown" aria-hidden="true">
      <nav class="nav-dropdown__nav">
        ${items}
      </nav>
    </div>
  </div>
</header>`;
}

function renderAuthBtn() {
  const el = document.getElementById('site-header-auth');
  if (!el) return;

  if (isLoggedIn()) {
    const user    = getUser();
    const initial = user.name?.[0]?.toUpperCase() ?? '✦';
    const avatarHTML = user.avatar
      ? `<img src="${user.avatar}" alt="${user.name}" class="header-auth__avatar header-auth__avatar--img">`
      : `<span class="header-auth__avatar">${initial}</span>`;
    el.innerHTML  = `
      <a href="/account.html" class="header-auth__btn">
        ${avatarHTML}
        <span class="header-auth__name">${user.name}</span>
      </a>`;
  } else {
    el.innerHTML = `
      <button class="header-auth__btn header-auth__btn--sign-in" id="header-sign-in-btn">
        Sign In
      </button>`;
    document.getElementById('header-sign-in-btn')
      ?.addEventListener('click', openLoginModal);
  }
}

export function initHeader(selector, { activePath = '/' } = {}) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.insertAdjacentHTML('afterend', buildHTML(activePath));
  mount.remove();

  const btn      = document.querySelector('.nav-menu-btn');
  const dropdown = document.getElementById('site-nav-dropdown');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    dropdown.setAttribute('aria-hidden', String(!isOpen));
    btn.classList.toggle('is-open', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
      btn.classList.remove('is-open');
    }
  });

  // Auth button — render now and keep in sync with auth state
  renderAuthBtn();
  onAuthChange(renderAuthBtn);

  // Cart
  initCart();
  document.getElementById('header-cart-btn')?.addEventListener('click', openCart);

  function updateCartBadge() {
    const badge = document.getElementById('header-cart-badge');
    if (!badge) return;
    const count = getCartCount();
    badge.textContent = count;
    badge.classList.toggle('has-items', count > 0);
  }
  updateCartBadge();
  onCartChange(updateCartBadge);

  // Submenu hover with delay so users can move mouse to submenu items
  document.querySelectorAll('.nav-item--has-sub').forEach(item => {
    let hideTimer;
    item.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      item.classList.add('sub-open');
    });
    item.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => item.classList.remove('sub-open'), 350);
    });
  });
}
