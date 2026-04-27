import "./account.css";
import { requireAuth } from "../../auth/requireAuth.js";
import { getUser, clearUser } from "../../auth/AuthStore.js";
import { getSavedReadings, deleteReading } from "../../auth/SavedReadings.js";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";

requireAuth("/");

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/account.html" });
initFooter("#site-footer-mount");

const user = getUser();
const initial = user.name?.[0]?.toUpperCase() ?? "✦";
const avatarEl = document.getElementById("account-avatar");

if (user.avatar) {
  avatarEl.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
} else {
  avatarEl.textContent = initial;
}

document.getElementById("account-name").textContent = user.name ?? "Seeker";
document.getElementById("account-email").textContent = user.email ?? "";

if (user.birthday) {
  const [y, m, d] = user.birthday.split("-").map(Number);
  const formatted = new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const bdayEl = document.getElementById("account-birthday");
  if (bdayEl) bdayEl.textContent = formatted;
}

document.getElementById("sign-out-btn").addEventListener("click", () => {
  clearUser();
  window.location.href = "/";
});

const SUIT_COLORS = {
  Hearts: "var(--suit-hearts)",
  Clubs: "var(--suit-clubs)",
  Diamonds: "var(--suit-diamonds)",
  Spades: "var(--suit-spades)",
  Joker: "var(--suit-joker)",
};

function renderSavedReadings() {
  const list = document.getElementById("saved-readings-list");
  const readings = getSavedReadings();

  if (readings.length === 0) {
    list.innerHTML = `
      <div class="coming-soon coming-soon--padded">
        <div style="font-size:2rem;margin-bottom:0.75rem;opacity:0.35;">♦</div>
        <p class="coming-soon__body">
          No saved readings yet.<br>
          <span>Complete a reading and hit <strong>♦ Save Reading</strong>.</span>
        </p>
      </div>`;
    return;
  }

  list.innerHTML = readings
    .map((r) => {
      const date = new Date(r.savedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const suitColor = SUIT_COLORS[r.cardSuit] ?? "var(--color-gold)";
      return `
      <div class="reading-item" data-reading-id="${r.id}">
        <div class="reading-item__suit" style="color:${suitColor}">${r.cardSuitSymbol}</div>
        <div class="reading-item__body">
          <div class="reading-item__name">${r.cardName}</div>
          <div class="reading-item__meta">${r.label} · ${r.eyebrow}</div>
        </div>
        <div class="reading-item__date">${date}</div>
        <button class="reading-item__delete" data-delete="${r.id}" aria-label="Delete reading">✕</button>
      </div>`;
    })
    .join("");

  list.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteReading(btn.dataset.delete);
      renderSavedReadings();
    });
  });
}

renderSavedReadings();

document.body.classList.replace("js-loading", "js-ready");
