

let cartTotal = 0;
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const totalPriceDisplay = document.getElementById("total-price");
const cartItemsContainer = document.getElementById("cart-items");
const discountInput = document.querySelector(".discount-code input");
const applyDiscountBtn = document.getElementById("apply-discount");
const currencySelector = document.getElementById("currency-selector");
const convertButton = document.getElementById("convert-button");
const convertedPriceDisplay = document.getElementById("converted-price");


const currencyRates = {
  USD: 1,
  EUR: 0.92,
  EGP: 47.0,
  JPY: 155.0,
};


for (const currency in currencyRates) {
  const option = document.createElement("option");
  option.value = currency;
  option.textContent = currency;
  currencySelector.appendChild(option);
}


addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");
    const priceText = product.querySelector("p").textContent;
    const price = parseFloat(priceText.replace("$", ""));
    cartTotal += price;
    totalPriceDisplay.textContent = `$${cartTotal.toFixed(2)}`;

    const productName = product.querySelector("h2").textContent;

  
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");


    const itemText = document.createElement("span");
    itemText.textContent = `${productName} - $${price.toFixed(2)}`;
    cartItem.appendChild(itemText);

   
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.addEventListener("click", () => {
      cartTotal -= price;
      totalPriceDisplay.textContent = `$${cartTotal.toFixed(2)}`;
      cartItem.remove();
    });

    cartItem.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItem);
  });
});

;


applyDiscountBtn.addEventListener("click", () => {
  const code = discountInput.value.trim().toLowerCase();
  if (code === "autospinner10") {
    const discount = cartTotal * 0.1;
    cartTotal -= discount;
    totalPriceDisplay.textContent = `$${cartTotal.toFixed(2)}`;
    alert("Discount applied: 10% off!");
  } else {
    alert("Invalid discount code.");
  }
});


convertButton.addEventListener("click", () => {
  const selectedCurrency = currencySelector.value;
  const rate = currencyRates[selectedCurrency];
  const converted = cartTotal * rate;
  convertedPriceDisplay.textContent = `${selectedCurrency} ${converted.toFixed(2)}`;
});
