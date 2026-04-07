/**
 * Cart — right-side slide-in drawer.
 * initCart() mounts the drawer once into the body.
 * openCart() / closeCart() toggle it from anywhere.
 */

import './Cart.css';
import {
  getCartItems, getCartCount, getCartTotal,
  removeFromCart, updateQty, onCartChange,
} from '../../cart/CartStore.js';

let _mounted = false;
let _closeTimer = null;
const DURATION = 350; // must match CSS transition duration

function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

function itemHTML(item) {
  return `
<div class="cart-item" data-id="${item.id}">
  <div class="cart-item__icon">${item.icon}</div>
  <div class="cart-item__body">
    <div class="cart-item__name">${item.name}</div>
    <div class="cart-item__type">${item.type}</div>
    <div class="cart-item__price">${formatPrice(item.price * item.qty)}</div>
    <div class="cart-item__qty">
      <button class="cart-item__qty-btn" data-action="dec" data-id="${item.id}">−</button>
      <span class="cart-item__qty-val">${item.qty}</span>
      <button class="cart-item__qty-btn" data-action="inc" data-id="${item.id}">+</button>
    </div>
  </div>
  <button class="cart-item__remove" data-remove="${item.id}" aria-label="Remove">✕</button>
</div>`;
}

function render() {
  const items       = getCartItems();
  const count       = getCartCount();
  const total       = getCartTotal();
  const listEl      = document.getElementById('cart-items-list');
  const countEl     = document.getElementById('cart-header-count');
  const totalEl     = document.getElementById('cart-subtotal-amount');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (countEl)     countEl.textContent    = count;
  if (totalEl)     totalEl.textContent    = formatPrice(total);
  if (checkoutBtn) checkoutBtn.disabled   = count === 0;

  if (!listEl) return;
  listEl.innerHTML = items.length === 0 ? `
<div class="cart-empty">
  <div class="cart-empty__icon">✦</div>
  <div class="cart-empty__msg">Your cart is empty</div>
  <div class="cart-empty__sub">Add something sacred to begin.</div>
</div>` : items.map(itemHTML).join('');
}

function getDrawer()   { return document.getElementById('cart-drawer'); }
function getBackdrop() { return document.getElementById('cart-backdrop'); }

export function openCart() {
  // Cancel any in-progress close
  clearTimeout(_closeTimer);

  const drawer   = getDrawer();
  const backdrop = getBackdrop();
  if (!drawer) return;

  // Make visible in DOM first, then trigger transition on next frame
  drawer.style.display   = '';
  backdrop.style.display = '';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
    });
  });
}

export function closeCart() {
  const drawer   = getDrawer();
  const backdrop = getBackdrop();
  if (!drawer) return;

  drawer.classList.remove('is-open');
  backdrop.classList.remove('is-open');

  // Hide from DOM after transition completes — no scroll-area contribution
  _closeTimer = setTimeout(() => {
    drawer.style.display   = 'none';
    backdrop.style.display = 'none';
  }, DURATION);
}

export function initCart() {
  if (_mounted) return;
  _mounted = true;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<div id="cart-backdrop" class="cart-backdrop" style="display:none;"></div>
<div id="cart-drawer" class="cart-drawer" aria-label="Shopping cart" style="display:none;">
  <div class="cart-header">
    <div class="cart-header__title">
      ✦ Your Cart
      <span class="cart-header__count" id="cart-header-count">0</span>
    </div>
    <button class="cart-close-btn" id="cart-close-btn" aria-label="Close cart">✕</button>
  </div>

  <div class="cart-items" id="cart-items-list"></div>

  <div class="cart-footer">
    <div class="cart-subtotal">
      <span class="cart-subtotal__label">Subtotal</span>
      <span class="cart-subtotal__amount" id="cart-subtotal-amount">$0.00</span>
    </div>
    <button class="cart-checkout-btn" id="cart-checkout-btn" disabled>
      Proceed to Checkout
    </button>
    <button class="cart-continue-btn" id="cart-continue-btn">
      Continue Browsing
    </button>
  </div>
</div>`;

  document.body.appendChild(wrapper);

  document.getElementById('cart-close-btn').addEventListener('click', closeCart);
  document.getElementById('cart-backdrop').addEventListener('click', closeCart);
  document.getElementById('cart-continue-btn').addEventListener('click', closeCart);

  document.getElementById('cart-items-list').addEventListener('click', (e) => {
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) { removeFromCart(removeBtn.dataset.remove); return; }

    const qtyBtn = e.target.closest('[data-action]');
    if (qtyBtn) {
      const id   = qtyBtn.dataset.id;
      const item = getCartItems().find(i => i.id === id);
      if (!item) return;
      updateQty(id, item.qty + (qtyBtn.dataset.action === 'inc' ? 1 : -1));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  onCartChange(render);
  render();
}
