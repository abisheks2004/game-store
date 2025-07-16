
  let cart = {};

  function addToCart(gameName, price) {
    if (!cart[gameName]) {
      cart[gameName] = { quantity: 1, price: price };
    } else {
      cart[gameName].quantity++;
    }
    updateCart();
  }

  function increaseItem(gameName) {
    cart[gameName].quantity++;
    updateCart();
  }

  function decreaseItem(gameName) {
    cart[gameName].quantity--;
    if (cart[gameName].quantity <= 0) {
      delete cart[gameName];
    }
    updateCart();
  }

  function updateCart() {
    let cartItemsDiv = document.getElementById("cart-items");
    let emptyMsg = document.getElementById("empty-msg");
    let cartCountSpan = document.getElementById("cart-count");
    let totalPriceSpan = document.getElementById("cart-total");

    cartItemsDiv.innerHTML = "";
    let totalCount = 0;
    let totalPrice = 0;

    for (let game in cart) {
      let { quantity, price } = cart[game];
      totalCount += quantity;
      totalPrice += quantity * price;

      let itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <span>${game} (₹${price})</span>
        <div class="qty-controls">
          <button onclick="decreaseItem('${game}')">-</button>
          <span>${quantity}</span>
          <button onclick="increaseItem('${game}')">+</button>
        </div>
      `;
      cartItemsDiv.appendChild(itemDiv);
    }

    cartCountSpan.innerText = totalCount;
    totalPriceSpan.innerText = totalPrice;

    if (totalCount === 0) {
      emptyMsg.style.display = "block";
    } else {
      emptyMsg.style.display = "none";
    }
  }

  function toggleCart() {
    document.getElementById("cart-modal").classList.toggle("show");
  }

   function buyNow() {
    let totalPrice = document.getElementById("cart-total").innerText;
    if (parseInt(totalPrice) === 0) {
      alert("Your cart is empty. Add some games before buying!");
      return;
    }

    alert("Thank you for your purchase! Total Amount: ₹" + totalPrice);
    cart = {};
    updateCart();
    toggleCart();

  }
