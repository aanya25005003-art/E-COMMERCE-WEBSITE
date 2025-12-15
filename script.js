function homePopup() {
  alert("📢 Daily Deal Alert: Welcome! Get 10% off your first order.");
  window.location.href = "index.html";
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let countEl = document.getElementById("cartCount");
  if (countEl) {
    countEl.innerText = cart.length;
  }
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

function searchProduct() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

function filterCategory(category) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let productCategory = card.getAttribute("data-category");
    card.style.display =
      category === "all" || productCategory === category
        ? "block"
        : "none";
  });
}

function loadCart() {
  let itemsDiv = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");

  if (!itemsDiv || !totalEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  itemsDiv.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    itemsDiv.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ₹${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalEl.innerText = "Total: ₹" + total;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function loadSummary() {
  let summaryEl = document.getElementById("summary");
  if (!summaryEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let sum = cart.reduce((acc, item) => acc + item.price, 0);
  summaryEl.innerText = "Total: ₹" + sum;
}

function placeOrder() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  updateCartCount();
  loadSummary();
}

window.onload = function () {
  updateCartCount();
  loadCart();
  loadSummary();
};
