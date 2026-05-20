import "./account.css";
import { requireAuth } from "../../auth/requireAuth.js";
import { getUser, clearUser, setUser } from "../../auth/AuthStore.js";
import { getSavedReadings, deleteReading } from "../../auth/SavedReadings.js";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import { openBirthCardModalWithData }     from '../../components/BirthCardModal/BirthCardModal.js';
import { openCompatibilityModalWithData } from '../../components/CompatibilityModal/CompatibilityModal.js';
import { openGeolocationModalWithData }   from '../../components/GeolocationModal.js';

requireAuth("/");

initPageAnimations();
initHeader("#site-header-mount", { activePath: "/account.html" });
initFooter("#site-footer-mount");

function renderProfile() {
  const user = getUser();
  if (!user) return;

  const initial = user.name?.[0]?.toUpperCase() ?? "✦";
  const avatarEl = document.getElementById("account-avatar");

  if (user.avatar) {
    avatarEl.innerHTML = `<img src="${user.avatar}" alt="${user.name}">`;
  } else {
    avatarEl.innerHTML = '';
    avatarEl.textContent = initial;
  }

  document.getElementById("account-name").textContent = user.name ?? "Seeker";
  document.getElementById("account-email").textContent = user.email ?? "";

  const bdayEl = document.getElementById("account-birthday");
  if (bdayEl) {
    if (user.birthday) {
      const [y, m, d] = user.birthday.split("-").map(Number);
      bdayEl.textContent = new Date(y, m - 1, d).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } else {
      bdayEl.textContent = '';
    }
  }
}

renderProfile();

document.getElementById("sign-out-btn").addEventListener("click", () => {
  clearUser();
  window.location.href = "/";
});

const editModal     = document.getElementById('modal-edit-profile');
const editOpenBtn   = document.getElementById('edit-profile-btn');
const editCloseBtn  = document.getElementById('edit-profile-close');
const editCancelBtn = document.getElementById('edit-profile-cancel');
const editSaveBtn   = document.getElementById('edit-profile-save');
const editError     = document.getElementById('edit-profile-error');

function openEditModal() {
  const user = getUser();
  document.getElementById('edit-profile-name').value     = user.name     ?? '';
  document.getElementById('edit-profile-birthday').value = user.birthday ?? '';
  document.getElementById('edit-profile-avatar').value   = user.avatar   ?? '';
  editError.textContent = '';
  editModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('edit-profile-name')?.focus(), 100);
}

function closeEditModal() {
  editModal.classList.remove('is-open');
  document.body.style.overflow = '';
}

editOpenBtn.addEventListener('click', openEditModal);
editCloseBtn.addEventListener('click', closeEditModal);
editCancelBtn.addEventListener('click', closeEditModal);

editModal.addEventListener('click', (e) => {
  if (e.target === editModal) closeEditModal();
});

editSaveBtn.addEventListener('click', () => {
  const name     = document.getElementById('edit-profile-name').value.trim();
  const birthday = document.getElementById('edit-profile-birthday').value;
  const avatar   = document.getElementById('edit-profile-avatar').value.trim();

  if (!name) {
    editError.textContent = 'Name is required.';
    editError.style.display = 'block';
    return;
  }

  setUser({
    ...getUser(),
    name,
    birthday: birthday || undefined,
    avatar:   avatar   || undefined,
  });

  closeEditModal();
  renderProfile();
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
      <div class="reading-item reading-item--clickable" data-reading-id="${r.id}" data-reading-type="${r.type}" title="Reopen this reading">
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

  list.querySelectorAll('.reading-item--clickable').forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('[data-delete]')) return;

      const id = item.dataset.readingId;
      const reading = getSavedReadings().find(r => r.id === id);
      if (!reading?.inputs) return;

      const type = reading.type;
      if (type === 'birth-card') {
        sessionStorage.setItem('magi_reopen', JSON.stringify(reading));
        window.location.href = '/readings.html?open=birth-card';
      } else if (type === 'compatibility') {
        sessionStorage.setItem('magi_reopen', JSON.stringify(reading));
        window.location.href = '/readings.html?open=compatibility';
      } else if (type === 'geolocation') {
        sessionStorage.setItem('magi_reopen', JSON.stringify(reading));
        window.location.href = '/readings.html?open=geolocation';
      }
    });
  });
}

renderSavedReadings();

document.body.classList.replace("js-loading", "js-ready");
