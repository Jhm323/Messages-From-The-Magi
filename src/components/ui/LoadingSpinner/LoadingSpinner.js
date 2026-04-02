import './LoadingSpinner.css';

export function renderSpinner(label = 'Loading…') {
  return `
<div class="loading-overlay">
  <div class="loading-spinner"></div>
  <span>${label}</span>
</div>`;
}
