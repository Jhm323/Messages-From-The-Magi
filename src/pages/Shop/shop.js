import "./shop.css";
import { initHeader } from "../../components/Header/Header.js";
import { initFooter } from "../../components/Footer/Footer.js";
import { initPageAnimations } from "../../components/PageAnimations/PageAnimations.js";
import { addToCart } from "../../cart/CartStore.js";
import { openCart } from "../../components/Cart/Cart.js";

const PRODUCTS = [
  {
    id: "living-deck",
    name: "The Living Deck",
    type: "Physical Product",
    icon: "🃏",
    price: 4500,
    description:
      "A premium 52-card printed deck with the full Magi symbolism — gilded edges, linen finish, and a collector's keepsake box.",
    badge: "New",
    featured: true,
  },
  {
    id: "foundations-course",
    name: "Magi Foundations Course",
    type: "Video Course",
    icon: "▶",
    price: 9700,
    description:
      "Six in-depth video modules taught by Sharon covering the complete system from first principles — suits, birth cards, spreads, and timing.",
    badge: "Featured",
  },
  {
    id: "compatibility-report",
    name: "Love & Compatibility Report",
    type: "Personalized PDF",
    icon: "♥",
    iconColor: "var(--suit-hearts)",
    price: 1900,
    description:
      "The full card-to-card relationship analysis between you and a partner — cosmic connections, karmic ties, and natural affinities.",
    badge: null,
  },
  {
    id: "birth-card-guide",
    name: "Birth Card PDF Guide",
    type: "Digital Download",
    icon: "♣",
    iconColor: "var(--suit-clubs)",
    price: 1200,
    description:
      "A beautifully formatted 40-page PDF covering your Birth Card, Planetary Ruling Card, and core life themes — yours to keep forever.",
    badge: null,
  },
  {
    id: "year-spread",
    name: "Year Ahead Spread Reading",
    type: "Personalized PDF",
    icon: "♦",
    iconColor: "var(--suit-diamonds)",
    price: 2200,
    description:
      "Your 13-card year spread calculated and interpreted for your current Solar Year — delivered as a personalized PDF within 48 hours.",
    badge: null,
  },
  {
    id: "system-workbook",
    name: "The Complete System Workbook",
    type: "Digital Download",
    icon: "♠",
    iconColor: "var(--suit-spades)",
    price: 2700,
    description:
      "An 80-page deep-dive workbook walking you through the full Star of the Magi system — suits, spreads, and self-discovery exercises.",
    badge: "Best Seller",
    featured: true,
  },
];

function renderGrid() {
  const grid = document.getElementById("shop-grid");
  grid.innerHTML = PRODUCTS.map(
    (p, i) => `
    <div class="product-card anim-reveal${p.featured ? " product-card--featured" : ""}" style="--ri:${i}">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <div class="product-icon"${p.iconColor ? ` style="color:${p.iconColor}"` : ""}>${p.icon}</div>
      <div class="product-type">${p.type}</div>
      <div class="product-name">${p.name}</div>
      <p class="product-desc">${p.description}</p>
      <div class="product-footer">
        <div class="product-price">
          $${(p.price / 100).toFixed(2)}
          ${p.type === "Digital Download" ? '<span class="product-price__sub">one-time</span>' : ""}
        </div>
        <button class="add-to-cart-btn" data-product-id="${p.id}">Add to Cart</button>
      </div>
    </div>`,
  ).join("");
}

initHeader("#site-header-mount", { activePath: "/shop.html" });
initFooter("#site-footer-mount");
renderGrid();
initPageAnimations();

document.getElementById("shop-grid").addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart-btn");
  if (!btn) return;
  const product = PRODUCTS.find((p) => p.id === btn.dataset.productId);
  if (!product) return;

  addToCart(product);

  btn.textContent = "✓ Added";
  btn.classList.add("is-added");
  setTimeout(() => {
    btn.textContent = "Add to Cart";
    btn.classList.remove("is-added");
  }, 1800);

  openCart();
});

document.body.classList.replace("js-loading", "js-ready");
