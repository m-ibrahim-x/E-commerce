let links = document.querySelectorAll(".nav-link");
let currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
    let linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});

function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    const texts = document.querySelectorAll(".sidebar-text");

    // Main
    const main = document.getElementById("mainContent");
    //Filter section
    const filter = document.getElementById("filter");
    // Products section
    const products = document.getElementById("products");
    // Choose Us
    const chooseUs = document.getElementById("Choose-Us");
    // Special Offer
    const specialOffer = document.getElementById("Special-Offer");
    // footer
    const footer = document.getElementById("footer");


    const isOpen = sb.classList.contains("w-32");

    if (isOpen) {
        sb.classList.replace("w-32", "w-16");
        main.classList.replace("mr-32", "mr-16");
        filter.classList.replace("mr-32", "mr-16");
        products.classList.replace("mr-32", "mr-16");
        chooseUs.classList.replace("mr-32", "mr-16");
        specialOffer.classList.replace("mr-32", "mr-16");
        footer.classList.replace("mr-32", "mr-16");
        texts.forEach(el => el.classList.add("hidden"))
    } else {
        sb.classList.replace("w-16", "w-32");
        main.classList.replace("mr-16", "mr-32");
        filter.classList.replace("mr-16", "mr-32");
        products.classList.replace("mr-16", "mr-32");
        chooseUs.classList.replace("mr-16", "mr-32");
        specialOffer.classList.replace("mr-16", "mr-32");
        footer.classList.replace("mr-16", "mr-32");
        texts.forEach(el => el.classList.remove("hidden"))
    }

}


/*
Products
*/
axios.get('products.json')
    .then(response => {
        response.data.map(product => {
            let container = document.querySelector("#container-boxs");

            container.innerHTML += `
                <div
                    class="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 overflow-hidden group border border-gray-100">
                    <!-- Image -->
                    <div class="relative overflow-hidden">
                        <img src="${product.image}"
                            class="w-full h-52 object-cover group-hover:scale-110 transition duration-500">
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>
                        <!--  Wishlist -->
                        <button
                            class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition">
                            <i
                                class="fa-regular fa-heart text-gray-400 hover:text-red-500 hover:scale-125 transition duration-200"></i>
                        </button>
                        <!-- Badge -->
                        <span
                            class="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            -20%
                        </span>
                    </div>
                    <!-- Content -->
                    <div class="p-4">
                        <h3 class="font-semibold text-lg text-gray-800 mb-1">
                            Soft Pillow
                        </h3>
                        <div class="flex items-center gap-2 mb-4">
                            <span class="text-lg font-bold text-black">${product.price}</span>
                        </div>
                        <!--  Button -->
                        <button
                            class="add-btn w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-black text-white hover:bg-gray-800 active:scale-95 transition-all duration-300">
                            <!-- Add Icon -->
                            <i class="fa-solid fa-cart-shopping add-icon"></i>
                            <!--  Remove Icon -->
                            <i class="fa-solid fa-trash remove-icon hidden"></i> <!-- Text -->
                            <span class="btn-text">Add to Cart</span>
                        </button>
                    </div>
                </div>
    `
        })
    })
