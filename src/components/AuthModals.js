/**
 * AuthModals — Login and Register modals.
 *
 * Exports:
 *   openLoginModal()
 *   openRegisterModal()
 *
 * Each modal has a link to switch to the other.
 * Submit handlers are stubbed — replace the TODO blocks with real API calls.
 */

import { mountModal, openModal, closeModal } from './ui/Modal/Modal.js';
import './ui/Button/Button.js';
import './ui/Form/Form.js';
import { setUser } from '../auth/AuthStore.js';

const LOGIN_ID    = 'modal-login';
const REGISTER_ID = 'modal-register';

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function buildLoginHTML() {
  return `
<div class="modal-overlay" id="${LOGIN_ID}" role="dialog" aria-modal="true" aria-labelledby="${LOGIN_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${LOGIN_ID}-title">Sign In</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
      Welcome back. Enter your details to continue your journey.
    </p>

    <div class="form-group">
      <label class="form-label" for="${LOGIN_ID}-email">Email</label>
      <input class="form-input" id="${LOGIN_ID}-email" type="email" placeholder="you@example.com" autocomplete="email" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="${LOGIN_ID}-password">Password</label>
      <input class="form-input" id="${LOGIN_ID}-password" type="password" placeholder="••••••••" autocomplete="current-password" required>
    </div>

    <div id="${LOGIN_ID}-error" role="alert"
      style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

    <button class="btn btn--primary" id="${LOGIN_ID}-submit" style="width:100%;margin-bottom:1rem;">
      ✦ Sign In
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      No account yet?
      <button id="${LOGIN_ID}-to-register"
        style="background:none;border:none;color:var(--color-gold);cursor:pointer;font-size:inherit;padding:0;text-decoration:underline;">
        Create one
      </button>
    </p>
  </div>
</div>`;
}

function ensureLoginModal() {
  const overlay = mountModal(LOGIN_ID, buildLoginHTML());
  if (!overlay) return;

  const errEl = document.getElementById(`${LOGIN_ID}-error`);

  document.getElementById(`${LOGIN_ID}-submit`).addEventListener('click', async () => {
    const email    = document.getElementById(`${LOGIN_ID}-email`).value.trim();
    const password = document.getElementById(`${LOGIN_ID}-password`).value;

    errEl.style.display = 'none';
    if (!email)    { showError('Please enter your email.'); return; }
    if (!password) { showError('Please enter your password.'); return; }

    // TODO: Replace with real API call, e.g.:
    // const res = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!res.ok) { showError((await res.json()).message); return; }
    // const { user } = await res.json();
    // setUser(user);

    // Stub: mock successful login
    setUser({ name: email.split('@')[0], email });
    closeModal(LOGIN_ID);
  });

  document.getElementById(`${LOGIN_ID}-to-register`).addEventListener('click', () => {
    closeModal(LOGIN_ID);
    openRegisterModal();
  });

  function showError(msg) {
    errEl.textContent   = msg;
    errEl.style.display = 'block';
  }
}

export function openLoginModal() {
  ensureLoginModal();
  openModal(LOGIN_ID);
  setTimeout(() => document.getElementById(`${LOGIN_ID}-email`)?.focus(), 100);
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────

function buildRegisterHTML() {
  return `
<div class="modal-overlay" id="${REGISTER_ID}" role="dialog" aria-modal="true" aria-labelledby="${REGISTER_ID}-title">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="${REGISTER_ID}-title">Create Account</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
      Join the Order. Your readings, saved and waiting.
    </p>

    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-name">Your Name</label>
      <input class="form-input" id="${REGISTER_ID}-name" type="text" placeholder="Your name" autocomplete="name" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-email">Email</label>
      <input class="form-input" id="${REGISTER_ID}-email" type="email" placeholder="you@example.com" autocomplete="email" required>
    </div>
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-password">Password</label>
      <input class="form-input" id="${REGISTER_ID}-password" type="password" placeholder="••••••••" autocomplete="new-password" required>
      <span class="form-hint">Minimum 8 characters</span>
    </div>
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-confirm">Confirm Password</label>
      <input class="form-input" id="${REGISTER_ID}-confirm" type="password" placeholder="••••••••" autocomplete="new-password" required>
    </div>

    <div id="${REGISTER_ID}-error" role="alert"
      style="color:var(--color-error);font-size:0.85rem;margin-bottom:0.75rem;display:none;"></div>

    <button class="btn btn--primary" id="${REGISTER_ID}-submit" style="width:100%;margin-bottom:1rem;">
      ✦ Create Account
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      Already have an account?
      <button id="${REGISTER_ID}-to-login"
        style="background:none;border:none;color:var(--color-gold);cursor:pointer;font-size:inherit;padding:0;text-decoration:underline;">
        Sign in
      </button>
    </p>
  </div>
</div>`;
}

function ensureRegisterModal() {
  const overlay = mountModal(REGISTER_ID, buildRegisterHTML());
  if (!overlay) return;

  const errEl = document.getElementById(`${REGISTER_ID}-error`);

  document.getElementById(`${REGISTER_ID}-submit`).addEventListener('click', async () => {
    const name     = document.getElementById(`${REGISTER_ID}-name`).value.trim();
    const email    = document.getElementById(`${REGISTER_ID}-email`).value.trim();
    const password = document.getElementById(`${REGISTER_ID}-password`).value;
    const confirm  = document.getElementById(`${REGISTER_ID}-confirm`).value;

    errEl.style.display = 'none';
    if (!name)                       { showError('Please enter your name.'); return; }
    if (!email)                      { showError('Please enter your email.'); return; }
    if (password.length < 8)         { showError('Password must be at least 8 characters.'); return; }
    if (password !== confirm)        { showError('Passwords do not match.'); return; }

    // TODO: Replace with real API call, e.g.:
    // const res = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, password }),
    // });
    // if (!res.ok) { showError((await res.json()).message); return; }
    // const { user } = await res.json();
    // setUser(user);

    // Stub: mock successful registration
    setUser({ name, email });
    closeModal(REGISTER_ID);
  });

  document.getElementById(`${REGISTER_ID}-to-login`).addEventListener('click', () => {
    closeModal(REGISTER_ID);
    openLoginModal();
  });

  function showError(msg) {
    errEl.textContent   = msg;
    errEl.style.display = 'block';
  }
}

export function openRegisterModal() {
  ensureRegisterModal();
  openModal(REGISTER_ID);
  setTimeout(() => document.getElementById(`${REGISTER_ID}-name`)?.focus(), 100);
}
