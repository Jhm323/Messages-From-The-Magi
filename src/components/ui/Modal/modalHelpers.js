/**
 * Shared modal utility helpers.
 * All functions accept a modalId string and operate on elements within that modal.
 */

/** Reset the save button to its default state. */
export function resetSaveBtn(modalId) {
  const btn = document.getElementById(`${modalId}-save`);
  const msg = document.getElementById(`${modalId}-save-msg`);
  if (btn) { btn.textContent = '♦ Save Reading'; btn.disabled = false; }
  if (msg) { msg.textContent = ''; }
}

/** Mark the save button as saved. */
export function markSaved(modalId) {
  const btn = document.getElementById(`${modalId}-save`);
  if (btn) { btn.textContent = '✓ Saved'; btn.disabled = true; }
}

/** Show an error message in the modal's error element. */
export function showError(modalId, msg) {
  const errEl = document.getElementById(`${modalId}-error`);
  if (!errEl) return;
  errEl.textContent = msg;
  errEl.style.display = 'block';
}

/** Hide the modal's error element. */
export function hideError(modalId) {
  const errEl = document.getElementById(`${modalId}-error`);
  if (errEl) errEl.style.display = 'none';
}

/**
 * Prefill name and birthdate fields from the logged-in user's profile.
 * @param {string} modalId
 * @param {Object} user  — { name, birthday } from AuthStore.getUser()
 * @param {Object} [fieldIds]  — override default field id suffixes
 * @param {string} [fieldIds.name='-name']
 * @param {string} [fieldIds.month='-month']
 * @param {string} [fieldIds.day='-day']
 */
export function prefillUserData(modalId, user, fieldIds = {}) {
  const nameId  = fieldIds.name  ?? `${modalId}-name`;
  const monthId = fieldIds.month ?? `${modalId}-month`;
  const dayId   = fieldIds.day   ?? `${modalId}-day`;

  const nameEl = document.getElementById(nameId);
  if (nameEl && user.name) nameEl.value = user.name;

  if (user.birthday) {
    const [, m, d] = user.birthday.split('-').map(Number);
    const monthEl = document.getElementById(monthId);
    const dayEl   = document.getElementById(dayId);
    if (monthEl) monthEl.value = String(m);
    if (dayEl)   dayEl.value   = String(d);
  }
}
