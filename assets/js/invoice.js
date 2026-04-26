let orderId = localStorage.getItem("orderId") || "N/A";
let orderDate = localStorage.getItem("orderDate") || "N/A";

/*************************
    If No Order Found
**************************/
if (orderId === "N/A") {
    window.location.href = "checkout.html";
}

/*************************
    Show Data
**************************/
document.getElementById("invoiceId").textContent = orderId;
document.getElementById("invoiceDate").textContent = orderDate;


/*************************
    Show Customer
**************************/
let chek_customer = JSON.parse(
    localStorage.getItem("chek_customer")
);

/*************************
    If No Customer Found
**************************/
if (!chek_customer) {
    window.location.href = "checkout.html";
}

/*************************
    Show Customer Data
**************************/
document.getElementById("customerName").textContent =
    chek_customer.name || "N/A";

document.getElementById("customerEmail").textContent =
    chek_customer.email || "N/A";

document.getElementById("customerAddress").textContent =
    chek_customer.address || "N/A";

document.getElementById("customerPhone").textContent =
    chek_customer.phone || "N/A";

/*************************
    Show Products
**************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let invoiceProducts = document.getElementById("invoiceProducts");

cart.forEach((product) => {

    let row = document.createElement("tr");
    row.classList.add("border-t");

    let name = document.createElement("td");
    name.className = "px-5 py-4";
    name.textContent = product.title;

    let quantity = document.createElement("td");
    quantity.className = "px-5 py-4 text-center";
    quantity.textContent = product.quantity;

    let price = document.createElement("td");
    price.className = "px-5 py-4 text-center";
    price.textContent = product.price + " EGP";

    let total = document.createElement("td");
    total.className = "px-5 py-4 text-center font-semibold";
    total.textContent = (product.price * product.quantity) + " EGP";

    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);

    invoiceProducts.appendChild(row);

});
/*************************
    Show Prices
**************************/
let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
let shipping = subtotal * 0.15;
let total = subtotal + shipping;

document.getElementById("subtotal").textContent = subtotal.toFixed(2) + " EGP";
document.getElementById("shipping").textContent = shipping.toFixed(2) + " EGP";
document.getElementById("total").textContent = total.toFixed(2) + " EGP";
/*************************
    Clear Cart
**************************/
localStorage.removeItem("cart");