/**
 * requireAuth — route guard for protected pages.
 *
 * Call at the top of a protected page's module script, before any rendering.
 * Because body.js-loading keeps the page invisible until js-ready is set,
 * the redirect happens before the user sees any content.
 *
 * Usage:
 *   import { requireAuth } from '/src/auth/requireAuth.js';
 *   requireAuth(); // redirects to '/' if not logged in
 */

import { isLoggedIn } from './AuthStore.js';

/**
 * Redirect to `redirectTo` if the user is not authenticated.
 * @param {string} [redirectTo='/']
 */
export function requireAuth(redirectTo = '/') {
  if (!isLoggedIn()) {
    window.location.replace(redirectTo);
  }
}
