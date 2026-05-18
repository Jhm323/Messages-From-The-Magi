/**
 * CartStore — singleton cart state with localStorage persistence.
 * Products: { id, name, price, icon, description }
 * Cart items: { ...product, qty }
 */

const STORAGE_KEY = 'magi_cart';

let _items = [];
const _listeners = new Set();

// Hydrate from localStorage once on module load
try {
  _items = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
} catch {
  _items = [];
}

function _save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_items));
  } catch { /* storage unavailable */ }
  _listeners.forEach(fn => fn([..._items]));
}

export function getCartItems() {
  return [..._items];
}

export function getCartCount() {
  return _items.reduce((sum, item) => sum + item.qty, 0);
}

export function getCartTotal() {
  return _items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function addToCart(product) {
  const existing = _items.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    _items.push({ ...product, qty: 1 });
  }
  _save();
}

export function removeFromCart(productId) {
  _items = _items.filter(i => i.id !== productId);
  _save();
}

export function updateQty(productId, qty) {
  if (qty < 1) { removeFromCart(productId); return; }
  const item = _items.find(i => i.id === productId);
  if (item) { item.qty = qty; _save(); }
}

export function clearCart() {
  _items = [];
  _save();
}

export function onCartChange(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}
