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

function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function setWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function updateWishlistCount() {
    let wishlist = getWishlist();

    let count = wishlist.length;

    let el = document.querySelector("#wishlist-Count");

    if (el) {
        el.innerHTML = count;
    }
}


updateWishlistCount();