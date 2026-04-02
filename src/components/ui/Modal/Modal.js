/**
 * Modal — shared modal infrastructure.
 *
 * mountModal(id, html)  — injects HTML once, wires backdrop click + Escape key.
 *                         Returns the overlay element on first mount, null if already mounted.
 * openModal(id)         — adds .is-open
 * closeModal(id)        — removes .is-open
 */

import './Modal.css';

export function mountModal(id, html) {
  if (document.getElementById(id)) return null;

  document.body.insertAdjacentHTML('beforeend', html);
  const overlay = document.getElementById(id);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.dataset.close !== undefined) {
      closeModal(id);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal(id);
    }
  });

  return overlay;
}

export function openModal(id) {
  document.getElementById(id)?.classList.add('is-open');
}

export function closeModal(id) {
  document.getElementById(id)?.classList.remove('is-open');
}
