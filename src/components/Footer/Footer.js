/**
 * Footer — site-wide footer.
 * Usage: initFooter('#site-footer-mount')
 */

import './Footer.css';

function buildHTML() {
  return `
<footer class="site-footer">
  <div class="site-footer__logo">Messages from the Magi</div>
  <div>A Living Oracle</div>
  <div class="site-footer__copy">
    © <span class="footer-year"></span> Messages from the Magi. All rights reserved.
    This oracle system is the proprietary intellectual property of Sharon.
  </div>
</footer>`;
}

export function initFooter(selector) {
  const mount = document.querySelector(selector);
  if (!mount) return;
  mount.insertAdjacentHTML('afterend', buildHTML());
  mount.remove();
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}
