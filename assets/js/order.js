function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    const texts = document.querySelectorAll(".sidebar-text");

    //Order 
    let order = document.getElementById("order");


    const isOpen = sb.classList.contains("w-32");

    if (isOpen) {
        sb.classList.replace("w-32", "w-16");
        order.classList.replace("mr-32", "mr-16");
        texts.forEach(el => el.classList.add("hidden"))
    } else {
        sb.classList.replace("w-16", "w-32");
        order.classList.replace("mr-16", "mr-32");
        texts.forEach(el => el.classList.remove("hidden"))
    }

};
/*********************
    Product 
**********************/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// container
let products_container = document.querySelector(".products");

// render
function renderProducts(products) {

    let html = "";

    products.forEach(product => {
        html += `
            <div
                class="flex flex-col sm:flex-row sm:items-center gap-4 border p-4 rounded-xl hover:shadow-lg transition">
                    <!-- Image -->
                    <img src="${product.image}"
                        class="w-full h-40 object-cover rounded-lg sm:w-20 sm:h-20 shrink-0">
                    <!-- Content -->
                    <div class="flex-1">
                        <div class="flex items-center justify-between gap-3">
                            <!-- Info -->
                            <div>
                                <h3 class="font-semibold text-base sm:text-lg truncate">${product.title}</h3>
                                <p class="price text-gray-500 text-sm">${product.price * product.quantity} <span class="font-semibold text-black">EGP</span></p>
                            </div>
                            <!-- Actions -->
                            <div class="flex items-center gap-2">
                                <button class="decrease px-2 py-1 bg-gray-200 rounded text-sm" data-id="${product.id}">-</button>
                                    <span class="quantity text-sm">${product.quantity}</span>
                                <button class="increase px-2 py-1 bg-gray-200 rounded text-sm" data-id="${product.id}">+</button>
                                <button class="text-red-500 hover:text-red-700" data-id="${product.id}">
                                    <i class="remove-item fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        `;
    });

    products_container.innerHTML = html;
}

// init
let cart = getCart();
renderProducts(cart);
/*********************
    Counter
**********************/
// Handle increase quantity ( + button )
document.addEventListener("click", (e) => {

    let btn = e.target.closest(".increase");
    if (!btn) return;

    let id = Number(btn.dataset.id);

    let cart = getCart();

    let item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity++;

    setCart(cart);
    renderProducts(cart);
    updateCartCount();
    updateOrderSummary();

});
// Handle decrease quantity ( - button )
document.addEventListener("click", (e) => {

    let btn = e.target.closest(".decrease");
    if (!btn) return;

    let id = Number(btn.dataset.id);

    let cart = getCart();

    let item = cart.find(p => p.id === id);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(p => p.id !== id);
    }
    setCart(cart);
    renderProducts(cart);
    updateCartCount();
    updateOrderSummary();

});
/*********************
    Remove item
**********************/
document.addEventListener("click", (e) => {

    let btn = e.target.closest("button[data-id]");
    if (!btn || !e.target.closest(".remove-item")) return;

    let id = Number(btn.dataset.id);

    let cart = getCart();

    cart = cart.filter(p => p.id !== id);

    setCart(cart);
    renderProducts(cart);
    updateCartCount();
    updateOrderSummary();
});
/*********************
    Order Summary
**********************/

//total before shipping
let subtotal_EL = document.querySelector("#subtotal");
//shipping
let shipping_EL = document.querySelector("#shipping");
//total
let total_EL = document.querySelector("#total");

function updateOrderSummary() {

    let cart = getCart();

    let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let shipping = subtotal * 0.15;

    let total = subtotal + shipping;

    subtotal_EL.textContent = subtotal.toFixed(2) + " EGP";
    shipping_EL.textContent = shipping.toFixed(2) + " EGP";
    total_EL.textContent = total.toFixed(2) + " EGP"
}
updateOrderSummary();
