function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    let cart = getCart();

    let count = cart.reduce((total, item) => total + item.quantity, 0);

    let el = document.querySelector("#cart-Count");

    if (el) {
        el.innerHTML = count;
    }
}

updateCartCount();