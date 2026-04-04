/**
 * SelectionChip — pill-shaped toggle chips for filter bars and quick-select fields.
 *
 * Usage (HTML):
 *   <div class="chip-group">
 *     <button class="chip is-active" data-value="all">All</button>
 *     <button class="chip" data-value="hearts">♥ Hearts</button>
 *   </div>
 *
 * Usage (JS):
 *   import { initChipGroup } from './ui/SelectionChip/SelectionChip.js';
 *   initChipGroup(container, (value) => console.log(value));
 */

import './SelectionChip.css';

/**
 * Wire a .chip-group so clicks toggle is-active and fire onChange.
 * @param {Element}  container  The .chip-group element
 * @param {Function} [onChange] Called with the selected chip's data-value
 */
export function initChipGroup(container, onChange) {
  if (!container) return;
  const chips = container.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      onChange?.(chip.dataset.value ?? chip.textContent.trim());
    });
  });
}
