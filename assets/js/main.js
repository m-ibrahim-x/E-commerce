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


/*********************
    Product 
**********************/
// container
const container = document.querySelector("#container-boxs");

// data
let all_products = [];

// render function
function renderProducts(products) {
    let cards = "";

    products.forEach(product => {
        cards += `
            <div class="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 overflow-hidden group border border-gray-100"
                data-id="${product.id}">
                
                <!-- Image -->
                <div class="relative overflow-hidden">
                    <img src="${product.image}"
                        class="w-full h-52 object-cover group-hover:scale-110 transition duration-500">

                    <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-300"></div>

                    <!-- Wishlist -->
                    <button class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition">
                        <i class="fa-regular fa-heart  add-fav text-gray-400 hover:text-red-500 hover:scale-125 transition duration-200"></i>
                    </button>

                    <!-- Badge -->
                    <span class="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        -20%
                    </span>
                </div>

                <!-- Content -->
                <div class="p-4">
                    <h3 class="font-semibold text-lg text-gray-800 mb-1">
                        <a href="product.html?id=${product.id}"
                        class="block duration-300 hover:text-yellow-400">
                            ${product.title}
                        </a>
                    </h3>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="text-lg font-bold text-black">${product.price}</span>
                    </div>

                    <!-- Button -->
                    <button class="add-btn w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-black text-white active:scale-95 transition-all duration-300">
                            <i class="fa fa-shopping-cart add-icon"></i>
                            <i class="fa fa-trash remove-icon" style="display: none;"></i>
                            <span class="btn-text">Add to Cart</span>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = cards;
}

// fetch data
axios.get("products.json")
    .then(response => {
        all_products = response.data;
        renderProducts(all_products);
        syncCartButtons();
        syncWishlistButtons(); 
    })
/*********************
    Filter
**********************/
let filter_btns = document.querySelectorAll(".filter-btn");

filter_btns.forEach(btn => {
    btn.addEventListener("click", () => {

        // remove styles from all
        filter_btns.forEach(b => {
            b.classList.remove("bg-black", "text-white");
        });

        // add to current
        btn.classList.add("bg-black", "text-white");

        let filter_value = btn.dataset.filter;

        if (filter_value === "all") {
            renderProducts(all_products);
        } else {

            let filtered = all_products.filter(product => {
                return product.category === filter_value;
            });

            renderProducts(filtered);
        }
    });
});
/*********************
    Basket 
**********************/
document.addEventListener("click", (e) => {
    let btn = e.target.closest(".add-btn");
    if (!btn) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let id = Number(btn.closest("[data-id]").dataset.id);
    let product = all_products.find(p => p.id === id);

    let index = cart.findIndex(item => item.id === id);

    let cartIcon = btn.querySelector(".add-icon");
    let trashIcon = btn.querySelector(".remove-icon");
    let text = btn.querySelector(".btn-text");

    if (index !== -1) {
        // Remove
        cart.splice(index, 1);

        btn.classList.remove("bg-red-500");
        btn.classList.add("bg-black");

        text.textContent = "Add To Cart";

        cartIcon.style.display = "inline-block";
        trashIcon.style.display = "none";

    } else {
        // Add
        cart.push({ ...product, quantity: 1 });

        btn.classList.add("bg-red-500");
        btn.classList.remove("bg-black");

        text.textContent = "Remove";

        cartIcon.style.display = "none";
        trashIcon.style.display = "inline-block";
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
});


function syncCartButtons() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".add-btn").forEach(btn => {
        let id = Number(btn.closest("[data-id]").dataset.id);

        let exists = cart.find(item => item.id === id);

        let cartIcon = btn.querySelector(".add-icon");
        let trashIcon = btn.querySelector(".remove-icon");
        let text = btn.querySelector(".btn-text");

        if (exists) {
            btn.classList.add("bg-red-500");
            btn.classList.remove("bg-black");

            text.textContent = "Remove";

            cartIcon.style.display = "none";
            trashIcon.style.display = "inline-block";

        } else {
            btn.classList.remove("bg-red-500");
            btn.classList.add("bg-black");

            text.textContent = "Add To Cart";

            cartIcon.style.display = "inline-block";
            trashIcon.style.display = "none";
        }
    });
}
/*********************
    Favorite
**********************/
document.addEventListener("click", (e) => {
    let btn = e.target.closest(".add-fav");
    if (!btn) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let id = btn.closest("[data-id]").dataset.id;
    let product = all_products.find(p => p.id == id);

    let index = wishlist.findIndex(item => item.id == id);

    if (index !== -1) {
        wishlist.splice(index, 1);

        btn.classList.remove("text-red-500");
        btn.classList.add("text-gray-400");

    } else {
        wishlist.push(product);

        btn.classList.remove("text-gray-400");
        btn.classList.add("text-red-500");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
});
function syncWishlistButtons() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    document.querySelectorAll(".add-fav").forEach(btn => {
        let id = btn.closest("[data-id]").dataset.id;

        let exists = wishlist.find(item => item.id == id);

        if (exists) {
            btn.classList.remove("text-gray-400");
            btn.classList.add("text-red-500");
        } else {
            btn.classList.remove("text-red-500");
            btn.classList.add("text-gray-400");
        }
    });
}