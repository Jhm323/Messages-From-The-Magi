/**
 * AuthStore — singleton auth state with localStorage persistence.
 *
 * API:
 *   getUser()          → { name, email } | null
 *   isLoggedIn()       → boolean
 *   setUser(userData)  → void  (call after successful login/register API response)
 *   clearUser()        → void  (call on sign-out)
 *   onAuthChange(fn)   → unsubscribe function
 */

const STORAGE_KEY = 'magi_session';

let _user = null;
const _listeners = new Set();

// Rehydrate from localStorage on module load
try {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) _user = JSON.parse(stored);
} catch {
  _user = null;
}

/** Return the current user object, or null if not logged in. */
export function getUser() {
  return _user;
}

/** True if a user session exists. */
export function isLoggedIn() {
  return _user !== null;
}

/**
 * Persist a user session.
 * Call this after a successful login or register API response.
 * @param {{ name: string, email: string, [key: string]: any }} userData
 */
export function setUser(userData) {
  _user = userData;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch { /* storage unavailable */ }
  _notify();
}

/**
 * Clear the session (sign out).
 */
export function clearUser() {
  _user = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* storage unavailable */ }
  _notify();
}

/**
 * Subscribe to auth state changes.
 * @param {(user: object|null) => void} fn
 * @returns {() => void} unsubscribe
 */
export function onAuthChange(fn) {
  _listeners.add(fn);
  return () => _listeners.delete(fn);
}

function _notify() {
  _listeners.forEach(fn => fn(_user));
}
