const cart = new Map();

const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const clearCart = document.querySelector("#clearCart");

function formatPrice(value) {
  return `￥${value}`;
}

function renderCart() {
  if (cart.size === 0) {
    cartItems.className = "cart-items empty";
    cartItems.textContent = "还没有选择茶品";
    cartTotal.textContent = "￥0";
    return;
  }

  cartItems.className = "cart-items";
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, name) => {
    total += item.price * item.count;

    const row = document.createElement("div");
    row.className = "cart-row";

    const info = document.createElement("div");
    const title = document.createElement("strong");
    const detail = document.createElement("span");
    title.textContent = name;
    detail.textContent = `${formatPrice(item.price)} x ${item.count}`;
    info.append(title, detail);

    const subtotal = document.createElement("strong");
    subtotal.textContent = formatPrice(item.price * item.count);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "-";
    remove.setAttribute("aria-label", `移除一份${name}`);
    remove.addEventListener("click", () => {
      item.count -= 1;
      if (item.count <= 0) cart.delete(name);
      renderCart();
    });

    row.append(info, subtotal, remove);
    cartItems.append(row);
  });

  cartTotal.textContent = formatPrice(total);
}

document.querySelectorAll("[data-name][data-price]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const existing = cart.get(name) || { price, count: 0 };
    existing.count += 1;
    cart.set(name, existing);
    renderCart();

    button.textContent = "已加入";
    window.setTimeout(() => {
      button.textContent = "加入茶单";
    }, 900);
  });
});

clearCart.addEventListener("click", () => {
  cart.clear();
  renderCart();
});
