"use strict";

const PRODUCTS = [
  { id: "apple", name: "Red Apples", description: "Crisp, sweet apples for snacking or baking.", priceCents: 249, unit: "per kg", emoji: "🍎" },
  { id: "banana", name: "Bananas", description: "Ripe bananas with a naturally sweet, soft texture.", priceCents: 179, unit: "per kg", emoji: "🍌" },
  { id: "orange", name: "Oranges", description: "Juicy oranges with a bright, refreshing flavor.", priceCents: 229, unit: "per kg", emoji: "🍊" },
  { id: "strawberry", name: "Strawberries", description: "Fragrant, sweet strawberries, ideal for a snack or dessert.", priceCents: 499, unit: "per 500 g pack", emoji: "🍓" },
  { id: "grapes", name: "Grapes", description: "Seedless grapes with a crisp bite and mellow sweetness.", priceCents: 349, unit: "per kg", emoji: "🍇" },
  { id: "pineapple", name: "Pineapple", description: "Golden pineapple with a tangy-sweet tropical flavor.", priceCents: 399, unit: "per item", emoji: "🍍" },
  { id: "watermelon", name: "Watermelon", description: "Refreshing watermelon with juicy red flesh.", priceCents: 189, unit: "per kg", emoji: "🍉" },
  { id: "lemon", name: "Lemons", description: "Zesty lemons for drinks, cooking, and baking.", priceCents: 69, unit: "per item", emoji: "🍋" },
  { id: "peach", name: "Peaches", description: "Soft, fragrant peaches with sweet summer flavor.", priceCents: 379, unit: "per kg", emoji: "🍑" },
  { id: "kiwi", name: "Kiwis", description: "Tangy-sweet kiwis with bright green flesh.", priceCents: 299, unit: "per 6-item pack", emoji: "🥝" }
];

const CART_STORAGE_KEY = "fruit-shop-cart-v1";
const currency = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const pageContent = document.querySelector("#page-content");
const notice = document.querySelector("#app-notice");
const cartCount = document.querySelector("#nav-cart-count");
let cart = loadCart();
let orderComplete = false;

function formatPrice(cents) {
  return currency.format(cents / 100);
}

function getProduct(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

function getCartTotalCents() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.priceCents * item.quantity : 0);
  }, 0);
}

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new TypeError("Saved cart is not a list.");

    const validItems = [];
    for (const item of parsed) {
      if (!item || typeof item.productId !== "string" ||
          !Number.isSafeInteger(item.quantity) || item.quantity < 1 ||
          !getProduct(item.productId)) {
        continue;
      }

      const existing = validItems.find((entry) => entry.productId === item.productId);
      if (existing) existing.quantity += item.quantity;
      else validItems.push({ productId: item.productId, quantity: item.quantity });
    }

    if (validItems.length !== parsed.length) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validItems));
      window.addEventListener("DOMContentLoaded", () => {
        showNotice("Some invalid saved cart entries were removed.", "error");
      }, { once: true });
    }
    return validItems;
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch (storageError) {
        console.error("Could not clear invalid saved cart data.", storageError);
      }
      window.addEventListener("DOMContentLoaded", () => {
        showNotice("Saved cart data was invalid and has been cleared.", "error");
      }, { once: true });
      return [];
    }

    console.error("Could not read the saved cart.", error);
    window.addEventListener("DOMContentLoaded", () => {
      showNotice("Browser storage is unavailable. Cart changes may not persist.", "error");
    }, { once: true });
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error("Could not save the cart.", error);
    showNotice("The cart changed, but browser storage could not save it.", "error");
    return false;
  }
}

function showNotice(message, type = "success") {
  notice.textContent = message;
  notice.classList.toggle("error", type === "error");
  notice.hidden = false;
}

function clearNotice() {
  notice.textContent = "";
  notice.classList.remove("error");
  notice.hidden = true;
}

function getRoute() {
  const hash = window.location.hash.slice(1);
  const [route = "products", query = ""] = hash.split("?");
  const params = new URLSearchParams(query);
  const validRoutes = new Set(["products", "product-details", "shopping-cart", "checkout"]);

  return {
    name: validRoutes.has(route) ? route : "products",
    productId: params.get("id")
  };
}

function updateNavigation(routeName) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.route === routeName) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = String(totalItems);
  cartCount.setAttribute(
    "aria-label",
    `${totalItems} ${totalItems === 1 ? "item" : "items"} in cart`
  );
}

function renderPageHeader(title, subtitle, options = {}) {
  const shortcut = options.showCart
    ? `<a class="cart-shortcut" href="#shopping-cart">View cart (${cart.length}) →</a>`
    : "";
  return `
    <header class="page-header">
      <div>
        <p class="eyebrow">${options.eyebrow ?? "Fruit Shop"}</p>
        <h1>${title}</h1>
        ${subtitle ? `<p class="lede">${subtitle}</p>` : ""}
      </div>
      ${shortcut}
    </header>`;
}

function renderProducts() {
  const cards = PRODUCTS.map((product) => `
    <article class="product-card">
      <a class="product-art" href="#product-details?id=${product.id}" aria-label="View ${product.name} details">
        <span aria-hidden="true">${product.emoji}</span>
      </a>
      <h2><a class="product-title-link" href="#product-details?id=${product.id}">${product.name}</a></h2>
      <p class="product-price">${formatPrice(product.priceCents)} <span class="product-unit">${product.unit}</span></p>
      <div class="card-actions">
        <div class="quantity-control">
          <label for="quantity-${product.id}">Quantity</label>
          <div class="stepper">
            <button type="button" data-quantity-step="-1" aria-label="Decrease ${product.name} quantity">−</button>
            <input id="quantity-${product.id}" type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity="${product.id}" aria-label="${product.name} quantity">
            <button type="button" data-quantity-step="1" aria-label="Increase ${product.name} quantity">+</button>
          </div>
        </div>
        <button class="button" type="button" data-add-product="${product.id}">Add to cart</button>
      </div>
    </article>`).join("");

  pageContent.innerHTML = `
    <div class="page-wrap">
      ${renderPageHeader("Browse fresh fruit", "Simple, seasonal favourites for your next order.", { showCart: true, eyebrow: "Picked for you" })}
      <section class="product-grid" aria-label="Fruit products">${cards}</section>
    </div>`;
}

function renderProductDetails(productId) {
  const product = getProduct(productId);
  if (!product) {
    pageContent.innerHTML = `
      <div class="page-wrap not-found">
        ${renderPageHeader("Product details", "")}
        <section class="empty-state" aria-labelledby="not-found-title">
          <div class="state-icon" aria-hidden="true">🔎</div>
          <h2 id="not-found-title">${productId ? "Product not found" : "Choose a product first"}</h2>
          <p>${productId ? "We couldn't find that fruit." : "Select a fruit from the Products page to see its details."}</p>
          <a class="button" href="#products">Back to Products</a>
        </section>
      </div>`;
    return;
  }

  pageContent.innerHTML = `
    <div class="page-wrap">
      ${renderPageHeader("Product details", "")}
      <a class="back-link" href="#products">← Back to Products</a>
      <article class="detail-panel">
        <div class="detail-art" aria-label="${product.name} illustration">${product.emoji}</div>
        <div class="detail-info">
          <p class="eyebrow">Fresh fruit</p>
          <h2>${product.name}</h2>
          <p class="detail-description">${product.description}</p>
          <p class="detail-price">${formatPrice(product.priceCents)} <span>${product.unit}</span></p>
          <div class="quantity-control">
            <label for="detail-quantity">Quantity</label>
            <div class="stepper">
              <button type="button" data-quantity-step="-1" aria-label="Decrease quantity">−</button>
              <input id="detail-quantity" type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity="${product.id}" aria-label="${product.name} quantity">
              <button type="button" data-quantity-step="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <button class="button" type="button" data-add-product="${product.id}">Add to cart</button>
        </div>
      </article>
    </div>`;
}

function renderEmptyCart(title = "Your cart is empty.", description = "Browse the fruit selection and add something fresh.") {
  pageContent.innerHTML = `
    <div class="page-wrap">
      ${renderPageHeader("Shopping Cart", "")}
      <section class="empty-state">
        <div class="state-icon" aria-hidden="true">🧺</div>
        <h2>${title}</h2>
        <p>${description}</p>
        <a class="button" href="#products">Browse Products</a>
      </section>
    </div>`;
}

function renderShoppingCart() {
  if (cart.length === 0) {
    renderEmptyCart();
    return;
  }

  const rows = cart.map((item) => {
    const product = getProduct(item.productId);
    const lineTotal = product.priceCents * item.quantity;
    return `
      <article class="cart-row">
        <div class="cart-product">
          <span class="mini-art" aria-hidden="true">${product.emoji}</span>
          <div><h3>${product.name}</h3><p class="muted">${product.unit}</p></div>
        </div>
        <div class="quantity-control">
          <label for="cart-quantity-${product.id}">Quantity</label>
          <div class="stepper">
            <button type="button" data-quantity-step="-1" data-cart-step="${product.id}" aria-label="Decrease ${product.name} quantity">−</button>
            <input id="cart-quantity-${product.id}" type="number" min="1" step="1" value="${item.quantity}" inputmode="numeric" data-cart-quantity="${product.id}" aria-label="${product.name} quantity">
            <button type="button" data-quantity-step="1" data-cart-step="${product.id}" aria-label="Increase ${product.name} quantity">+</button>
          </div>
        </div>
        <p class="unit-price">${formatPrice(product.priceCents)} ${product.unit}</p>
        <div class="cart-row-actions">
          <span class="line-total">${formatPrice(lineTotal)}</span>
          <button class="button text-button" type="button" data-remove-product="${product.id}">Remove</button>
        </div>
      </article>`;
  }).join("");

  pageContent.innerHTML = `
    <div class="page-wrap">
      ${renderPageHeader("Shopping Cart", "Review your fruit and adjust quantities before checkout.", { eyebrow: `${cart.length} ${cart.length === 1 ? "product" : "products"}` })}
      <section class="summary-panel" aria-labelledby="cart-items-title">
        <h2 class="summary-heading" id="cart-items-title">Your items</h2>
        <div class="cart-list">${rows}</div>
        <div class="total-row"><span>Order total</span><strong>${formatPrice(getCartTotalCents())}</strong></div>
        <div class="summary-actions">
          <a class="button secondary" href="#products">Continue shopping</a>
          <a class="button" href="#checkout">Go to Checkout</a>
        </div>
      </section>
    </div>`;
}

function renderCheckout() {
  if (orderComplete) {
    pageContent.innerHTML = `
      <div class="page-wrap">
        ${renderPageHeader("Order complete", "", { eyebrow: "Thank you" })}
        <section class="confirmation-panel">
          <div class="state-icon" aria-hidden="true">✓</div>
          <h2>Your sample order has been processed.</h2>
          <p>No payment was taken. This was a mock checkout, and your cart has been cleared.</p>
          <a class="button" href="#products">Continue shopping</a>
        </section>
      </div>`;
    return;
  }

  if (cart.length === 0) {
    pageContent.innerHTML = `
      <div class="page-wrap">
        ${renderPageHeader("Checkout", "", { eyebrow: "Order summary" })}
        <section class="empty-state">
          <div class="state-icon" aria-hidden="true">🧺</div>
          <h2>There are no items to process.</h2>
          <p>Add fruit to your cart before checking out.</p>
          <a class="button" href="#products">Browse Products</a>
        </section>
      </div>`;
    return;
  }

  const rows = cart.map((item) => {
    const product = getProduct(item.productId);
    return `
      <div class="checkout-row">
        <span class="checkout-product">${product.emoji} ${product.name}</span>
        <span class="checkout-quantity">${item.quantity} × ${formatPrice(product.priceCents)} <span class="checkout-unit">${product.unit}</span></span>
        <span class="checkout-line-total">${formatPrice(product.priceCents * item.quantity)}</span>
      </div>`;
  }).join("");

  pageContent.innerHTML = `
    <div class="page-wrap">
      ${renderPageHeader("Checkout", "One last look at your order.", { eyebrow: "Order summary" })}
      <section class="summary-panel" aria-labelledby="checkout-summary-title">
        <h2 class="summary-heading" id="checkout-summary-title">Your order</h2>
        <div class="checkout-list">${rows}</div>
        <div class="total-row"><span>Total</span><strong>${formatPrice(getCartTotalCents())}</strong></div>
        <div class="summary-actions">
          <a class="button secondary" href="#shopping-cart">Back to Shopping Cart</a>
          <button class="button" type="button" data-process-order>Process Order</button>
        </div>
        <p class="mock-note">Mock checkout: no payment is taken.</p>
      </section>
    </div>`;
}

function render() {
  clearNotice();
  const route = getRoute();
  orderComplete = route.name === "checkout" && orderComplete;
  updateNavigation(route.name);

  if (route.name === "products") renderProducts();
  else if (route.name === "product-details") renderProductDetails(route.productId);
  else if (route.name === "shopping-cart") renderShoppingCart();
  else renderCheckout();
}

function readQuantity(input) {
  const quantity = Number(input.value);
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    input.setCustomValidity("Enter a whole number greater than or equal to 1.");
    input.reportValidity();
    input.setCustomValidity("");
    return null;
  }
  return quantity;
}

function addToCart(productId, quantity) {
  const product = getProduct(productId);
  if (!product || !Number.isSafeInteger(quantity) || quantity < 1) return;

  const existing = cart.find((item) => item.productId === productId);
  if (existing) existing.quantity += quantity;
  else cart.push({ productId, quantity });

  saveCart();
  orderComplete = false;
  render();
  showNotice(`${product.name} added to cart.`);
}

function updateCartQuantity(productId, quantity) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) return;
  const item = cart.find((entry) => entry.productId === productId);
  if (!item) return;
  item.quantity = quantity;
  saveCart();
  render();
}

function removeFromCart(productId) {
  const product = getProduct(productId);
  cart = cart.filter((item) => item.productId !== productId);
  saveCart();
  render();
  showNotice(`${product?.name ?? "Product"} removed from cart.`);
}

document.addEventListener("click", (event) => {
  const stepButton = event.target.closest("[data-quantity-step]");
  if (stepButton) {
    const step = Number(stepButton.dataset.quantityStep);
    const cartProductId = stepButton.dataset.cartStep;
    if (cartProductId) {
      const item = cart.find((entry) => entry.productId === cartProductId);
      if (item) updateCartQuantity(cartProductId, Math.max(1, item.quantity + step));
      return;
    }

    const control = stepButton.closest(".stepper");
    const input = control?.querySelector("input");
    if (input) input.value = String(Math.max(1, (Number(input.value) || 1) + step));
    return;
  }

  const addButton = event.target.closest("[data-add-product]");
  if (addButton) {
    const productId = addButton.dataset.addProduct;
    const input = document.querySelector(`[data-product-quantity="${productId}"]`);
    const quantity = input ? readQuantity(input) : null;
    if (quantity !== null) addToCart(productId, quantity);
    return;
  }

  const removeButton = event.target.closest("[data-remove-product]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.removeProduct);
    return;
  }

  if (event.target.closest("[data-process-order]")) {
    if (cart.length === 0) {
      render();
      return;
    }
    cart = [];
    saveCart();
    orderComplete = true;
    render();
  }
});

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-cart-quantity]");
  if (!input) return;
  const quantity = readQuantity(input);
  if (quantity !== null) updateCartQuantity(input.dataset.cartQuantity, quantity);
  else render();
});

window.addEventListener("hashchange", () => {
  if (getRoute().name !== "checkout") orderComplete = false;
  render();
  document.querySelector("#main-content").focus({ preventScroll: true });
});

if (!window.location.hash) window.location.hash = "#products";
render();
