/**
 * AuthModals — Login and Register modals.
 *
 * Exports:
 *   openLoginModal()
 *   openRegisterModal()
 *
 * Submit handlers are stubbed with clear TODO markers for real API integration.
 * Password validation mirrors Joi's string() schema rules, enforced client-side.
 */

import "./AuthModals.css";
import { mountModal, openModal, closeModal } from "../ui/Modal/Modal.js";
import "../ui/Button/Button.js";
import "../ui/Form/Form.js";
import { setUser } from "../../auth/AuthStore.js";

const LOGIN_ID = "modal-login";
const REGISTER_ID = "modal-register";

// ─── Password rules (Joi-style) ───────────────────────────────────────────────
// Mirror these on the server with Joi when the API is wired up:
//   Joi.string().min(8).pattern(/[A-Z]/).pattern(/[a-z]/).pattern(/[0-9]/).pattern(/[^A-Za-z0-9]/)

const PASSWORD_RULES = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  {
    key: "upper",
    label: "One uppercase letter (A–Z)",
    test: (v) => /[A-Z]/.test(v),
  },
  {
    key: "lower",
    label: "One lowercase letter (a–z)",
    test: (v) => /[a-z]/.test(v),
  },
  { key: "number", label: "One number (0–9)", test: (v) => /[0-9]/.test(v) },
  {
    key: "special",
    label: "One special character (!@#$…)",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

function isPasswordValid(value) {
  return PASSWORD_RULES.every((r) => r.test(value));
}

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ─── Field-level error helpers ────────────────────────────────────────────────

function setFieldError(modalId, field, message) {
  const errEl = document.getElementById(`${modalId}-${field}-error`);
  const inputEl = document.getElementById(`${modalId}-${field}`);
  if (errEl) errEl.textContent = message;
  if (inputEl) inputEl.classList.toggle("is-error", Boolean(message));
}

function clearFieldErrors(modalId, fields) {
  fields.forEach((f) => setFieldError(modalId, f, ""));
}

// ─── File → base64 ───────────────────────────────────────────────────────────

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────

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
      <input class="form-input" id="${LOGIN_ID}-email" type="email"
        placeholder="you@example.com" autocomplete="email">
      <span class="field-error" id="${LOGIN_ID}-email-error"></span>
    </div>

    <div class="form-group">
      <label class="form-label" for="${LOGIN_ID}-password">Password</label>
      <input class="form-input" id="${LOGIN_ID}-password" type="password"
        placeholder="••••••••" autocomplete="current-password">
      <span class="field-error" id="${LOGIN_ID}-password-error"></span>
    </div>

    <button class="btn btn--primary" id="${LOGIN_ID}-submit" style="width:100%;margin-top:0.5rem;margin-bottom:1rem;">
      ✦ Sign In
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      No account yet?
      <button class="auth-switch-link" id="${LOGIN_ID}-to-register">Create one</button>
    </p>
  </div>
</div>`;
}

function ensureLoginModal() {
  const overlay = mountModal(LOGIN_ID, buildLoginHTML());
  if (!overlay) return;

  const FIELDS = ["email", "password"];

  document
    .getElementById(`${LOGIN_ID}-submit`)
    .addEventListener("click", async () => {
      clearFieldErrors(LOGIN_ID, FIELDS);

      const email = document.getElementById(`${LOGIN_ID}-email`).value.trim();
      const password = document.getElementById(`${LOGIN_ID}-password`).value;

      let hasError = false;
      if (!email) {
        setFieldError(LOGIN_ID, "email", "Email is required.");
        hasError = true;
      } else if (!isEmailValid(email)) {
        setFieldError(LOGIN_ID, "email", "Enter a valid email address.");
        hasError = true;
      }
      if (!password) {
        setFieldError(LOGIN_ID, "password", "Password is required.");
        hasError = true;
      }
      if (hasError) return;

      // TODO: Replace stub with real API call:
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) {
      //   const { message } = await res.json();
      //   setFieldError(LOGIN_ID, 'password', message);
      //   return;
      // }
      // const { user } = await res.json();
      // setUser(user);

      // Stub: mock successful login
      setUser({ name: email.split("@")[0], email });
      closeModal(LOGIN_ID);
    });

  document
    .getElementById(`${LOGIN_ID}-to-register`)
    .addEventListener("click", () => {
      closeModal(LOGIN_ID);
      openRegisterModal();
    });
}

export function openLoginModal() {
  ensureLoginModal();
  openModal(LOGIN_ID);
  setTimeout(() => document.getElementById(`${LOGIN_ID}-email`)?.focus(), 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER
// ─────────────────────────────────────────────────────────────────────────────

function buildRegisterHTML() {
  const rulesHTML = PASSWORD_RULES.map(
    (r) => `<div class="password-rule" data-rule="${r.key}">${r.label}</div>`,
  ).join("");

  return `
<div class="modal-overlay" id="${REGISTER_ID}" role="dialog" aria-modal="true" aria-labelledby="${REGISTER_ID}-title">
  <div class="modal" style="overflow-y:auto;max-height:min(720px,88vh);">
    <div class="modal__header">
      <h2 class="modal__title" id="${REGISTER_ID}-title">Create Account</h2>
      <button class="modal__close" data-close aria-label="Close">✕</button>
    </div>

    <p style="color:var(--color-dawn);font-size:0.9rem;margin-bottom:1.5rem;line-height:1.6;">
      Join the Order. Your readings, saved and waiting.
    </p>

    <!-- Avatar -->
    <div class="avatar-upload">
      <div class="avatar-preview" id="${REGISTER_ID}-avatar-preview">
        <span class="avatar-preview__initial" id="${REGISTER_ID}-avatar-initial">✦</span>
      </div>
      <div>
        <div class="form-label" style="margin-bottom:0.5rem;">Profile Photo <span style="color:var(--color-mist);font-size:0.75em;text-transform:none;letter-spacing:0;">(optional)</span></div>
        <label class="avatar-upload__btn" for="${REGISTER_ID}-avatar-input">Choose photo</label>
        <input type="file" accept="image/*" id="${REGISTER_ID}-avatar-input" style="display:none;" aria-label="Upload profile photo">
        <div style="font-size:0.75rem;color:var(--color-mist);margin-top:0.35rem;">JPG, PNG, GIF · max 2 MB</div>
      </div>
    </div>

    <!-- Name -->
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-name">Name</label>
      <input class="form-input" id="${REGISTER_ID}-name" type="text"
        placeholder="Your name" autocomplete="name">
      <span class="field-error" id="${REGISTER_ID}-name-error"></span>
    </div>

    <!-- Birthday (full date including year — used for profile only, not card readings) -->
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-birthday">Birthday</label>
      <input class="form-input" id="${REGISTER_ID}-birthday" type="date" autocomplete="bday">
      <span class="form-hint">Month / Day / Year</span>
      <span class="field-error" id="${REGISTER_ID}-birthday-error"></span>
    </div>

    <!-- Email -->
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-email">Email</label>
      <input class="form-input" id="${REGISTER_ID}-email" type="email"
        placeholder="you@example.com" autocomplete="email">
      <span class="field-error" id="${REGISTER_ID}-email-error"></span>
    </div>

    <!-- Password -->
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-password">Password</label>
      <input class="form-input" id="${REGISTER_ID}-password" type="password"
        placeholder="••••••••" autocomplete="new-password">
      <div class="password-rules" id="${REGISTER_ID}-password-rules">${rulesHTML}</div>
      <span class="field-error" id="${REGISTER_ID}-password-error"></span>
    </div>

    <!-- Confirm password -->
    <div class="form-group">
      <label class="form-label" for="${REGISTER_ID}-confirm">Confirm Password</label>
      <input class="form-input" id="${REGISTER_ID}-confirm" type="password"
        placeholder="••••••••" autocomplete="new-password">
      <span class="field-error" id="${REGISTER_ID}-confirm-error"></span>
    </div>

    <button class="btn btn--primary" id="${REGISTER_ID}-submit" style="width:100%;margin-top:0.25rem;margin-bottom:1rem;">
      ✦ Create Account
    </button>

    <p style="text-align:center;font-size:0.85rem;color:var(--color-dawn);">
      Already have an account?
      <button class="auth-switch-link" id="${REGISTER_ID}-to-login">Sign in</button>
    </p>
  </div>
</div>`;
}

function ensureRegisterModal() {
  const overlay = mountModal(REGISTER_ID, buildRegisterHTML());
  if (!overlay) return;

  const FIELDS = ["name", "birthday", "email", "password", "confirm"];
  let avatarBase64 = null;

  // ── Avatar preview ────────────────────────────────────────────────────────

  const avatarInput = document.getElementById(`${REGISTER_ID}-avatar-input`);
  const avatarPreview = document.getElementById(
    `${REGISTER_ID}-avatar-preview`,
  );
  const avatarInitial = document.getElementById(
    `${REGISTER_ID}-avatar-initial`,
  );

  avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image under 2 MB.");
      avatarInput.value = "";
      return;
    }
    avatarBase64 = await readAsBase64(file);
    avatarInitial.style.display = "none";
    const img = document.createElement("img");
    img.src = avatarBase64;
    img.alt = "Avatar preview";
    avatarPreview.appendChild(img);
  });

  // Update initial letter as name is typed
  document
    .getElementById(`${REGISTER_ID}-name`)
    .addEventListener("input", (e) => {
      const initial = e.target.value.trim()[0]?.toUpperCase() ?? "✦";
      if (!avatarBase64) avatarInitial.textContent = initial;
    });

  // ── Password rules live feedback ──────────────────────────────────────────

  document
    .getElementById(`${REGISTER_ID}-password`)
    .addEventListener("input", (e) => {
      const val = e.target.value;
      const rules = overlay.querySelectorAll(
        `#${REGISTER_ID}-password-rules .password-rule`,
      );
      PASSWORD_RULES.forEach((rule, i) => {
        rules[i]?.classList.toggle("is-met", rule.test(val));
      });
    });

  // ── Submit ────────────────────────────────────────────────────────────────

  document
    .getElementById(`${REGISTER_ID}-submit`)
    .addEventListener("click", async () => {
      clearFieldErrors(REGISTER_ID, FIELDS);

      const name = document.getElementById(`${REGISTER_ID}-name`).value.trim();
      const birthday = document.getElementById(`${REGISTER_ID}-birthday`).value;
      const email = document
        .getElementById(`${REGISTER_ID}-email`)
        .value.trim();
      const password = document.getElementById(`${REGISTER_ID}-password`).value;
      const confirm = document.getElementById(`${REGISTER_ID}-confirm`).value;

      let hasError = false;

      if (!name) {
        setFieldError(REGISTER_ID, "name", "Name is required.");
        hasError = true;
      }
      if (!birthday) {
        setFieldError(REGISTER_ID, "birthday", "Birthday is required.");
        hasError = true;
      }
      if (!email) {
        setFieldError(REGISTER_ID, "email", "Email is required.");
        hasError = true;
      } else if (!isEmailValid(email)) {
        setFieldError(REGISTER_ID, "email", "Enter a valid email address.");
        hasError = true;
      }
      if (!isPasswordValid(password)) {
        setFieldError(
          REGISTER_ID,
          "password",
          "Password does not meet all requirements.",
        );
        hasError = true;
      }
      if (!confirm) {
        setFieldError(REGISTER_ID, "confirm", "Please confirm your password.");
        hasError = true;
      } else if (password !== confirm) {
        setFieldError(REGISTER_ID, "confirm", "Passwords do not match.");
        hasError = true;
      }
      if (hasError) return;

      // TODO: Replace stub with real API call:
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, birthday, email, password, avatar: avatarBase64 }),
      // });
      // if (!res.ok) {
      //   const { field, message } = await res.json();
      //   setFieldError(REGISTER_ID, field ?? 'email', message);
      //   return;
      // }
      // const { user } = await res.json();
      // setUser(user);

      // Stub: mock successful registration
      setUser({ name, email, birthday, avatar: avatarBase64 ?? null });
      closeModal(REGISTER_ID);
    });

  document
    .getElementById(`${REGISTER_ID}-to-login`)
    .addEventListener("click", () => {
      closeModal(REGISTER_ID);
      openLoginModal();
    });
}

export function openRegisterModal() {
  ensureRegisterModal();
  openModal(REGISTER_ID);
  setTimeout(
    () => document.getElementById(`${REGISTER_ID}-name`)?.focus(),
    100,
  );
}
