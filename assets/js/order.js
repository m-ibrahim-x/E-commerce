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

}


// let add_btns = document.querySelectorAll(".add-btn");
// let cart_count = document.querySelector("#cart-Count");
