let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.getElementById("checkoutForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    if (!name || !email || !phone || !address) {
        alert("Please fill all fields");
        return;
    }

    /*************************
        Save Customer
    *************************/
    let chek_customer = {
        name,
        email,
        phone,
        address
    };

    localStorage.setItem(
        "chek_customer",
        JSON.stringify(chek_customer)
    );

    /*************************
        Generate Invoice ID
    *************************/
    let lastId = Number(localStorage.getItem("lastInvoiceId")) || 1;

    lastId++;

    localStorage.setItem("lastInvoiceId", lastId);
    localStorage.setItem("orderId", "INV-" + lastId);

    /*************************
        Save Date
    *************************/
    localStorage.setItem(
        "orderDate",
        new Date().toLocaleDateString()
    );

    /*************************
        Success + Redirect
    *************************/
    alert("Order Placed Successfully");

    setTimeout(() => {
        window.location.href = "invoice.html";
    }, 1000);

});