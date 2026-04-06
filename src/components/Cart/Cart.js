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
  const items     = getCartItems();
  const count     = getCartCount();
  const total     = getCartTotal();
  const listEl    = document.getElementById('cart-items-list');
  const countEl   = document.getElementById('cart-header-count');
  const totalEl   = document.getElementById('cart-subtotal-amount');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  if (countEl) countEl.textContent = count;

  if (totalEl) totalEl.textContent = formatPrice(total);

  if (checkoutBtn) checkoutBtn.disabled = count === 0;

  if (!listEl) return;
  if (items.length === 0) {
    listEl.innerHTML = `
<div class="cart-empty">
  <div class="cart-empty__icon">✦</div>
  <div class="cart-empty__msg">Your cart is empty</div>
  <div class="cart-empty__sub">Add something sacred to begin.</div>
</div>`;
  } else {
    listEl.innerHTML = items.map(itemHTML).join('');
  }
}

export function openCart() {
  document.getElementById('cart-drawer')?.classList.add('is-open');
  document.getElementById('cart-backdrop')?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

export function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('is-open');
  document.getElementById('cart-backdrop')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

export function initCart() {
  if (_mounted) return;
  _mounted = true;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
<div id="cart-backdrop" class="cart-backdrop"></div>
<div id="cart-drawer" class="cart-drawer" aria-label="Shopping cart">
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
      const id = qtyBtn.dataset.id;
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
