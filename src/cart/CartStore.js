/**
 * CartStore — singleton cart state with localStorage persistence.
 * Products: { id, name, price, icon, description }
 * Cart items: { ...product, qty }
 */

const STORAGE_KEY = 'magi_cart';
let _listeners = [];

function _load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function _save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  _listeners.forEach(fn => fn(items));
}

export function getCartItems() {
  return _load();
}

export function getCartCount() {
  return _load().reduce((sum, item) => sum + item.qty, 0);
}

export function getCartTotal() {
  return _load().reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function addToCart(product) {
  const items = _load();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  _save(items);
}

export function removeFromCart(productId) {
  _save(_load().filter(i => i.id !== productId));
}

export function updateQty(productId, qty) {
  if (qty < 1) { removeFromCart(productId); return; }
  const items = _load();
  const item = items.find(i => i.id === productId);
  if (item) { item.qty = qty; _save(items); }
}

export function clearCart() {
  _save([]);
}

export function onCartChange(fn) {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter(l => l !== fn); };
}
