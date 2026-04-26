function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    const texts = document.querySelectorAll(".sidebar-text");

    // container-boxs
    const container_boxs = document.getElementById("container-boxs");


    const isOpen = sb.classList.contains("w-32");

    if (isOpen) {
        sb.classList.replace("w-32", "w-16");
        container_boxs.classList.replace("mr-32", "mr-16");
        texts.forEach(el => el.classList.add("hidden"))
    } else {
        sb.classList.replace("w-16", "w-32");
        container_boxs.classList.replace("mr-16", "mr-32");
        texts.forEach(el => el.classList.remove("hidden"))
    }

}
let all_products = [];

let params = new URLSearchParams(location.search);
let id = Number(params.get("id"));

let container = document.querySelector("#container-boxs");

/*************************
    Get Product
**************************/
axios.get("products.json")
.then(response => {

    all_products = response.data;

    let product = all_products.find(item => item.id === id);

    if (!product) {
        container.innerHTML = `
            <div class="text-center text-3xl text-red-500 py-20 font-bold">
                Product Not Found
            </div>
        `;
        return;
    }

    renderSingleProduct(product);

    syncCartButtons();
    syncWishlistButtons();

});


/*************************
    Render Product
**************************/
function renderSingleProduct(product){

    container.innerHTML = `
        <div class="mx-auto" data-id="${product.id}">

            <!-- box -->
            <div class="bg-white rounded-2xl shadow-md p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

                <!-- images -->
                <div>
                    <div class="rounded-2xl overflow-hidden border border-gray-200">
                        <img src="${product.image}" alt="Product Image"
                        class="w-full h-[500px] object-cover hover:scale-105 transition duration-500">
                    </div>
                </div>

                <!-- info -->
                <div class="flex flex-col justify-center">

                    <!-- title -->
                    <h1 class="text-4xl font-bold text-yellow-400 mb-4">
                        ${product.title}
                    </h1>

                    <!-- price -->
                    <div class="mb-6">
                        <p class="text-4xl font-bold text-black">
                            ${product.price}
                            <span class="text-yellow-500 text-xl">EGP</span>
                        </p>
                    </div>

                    <!-- desc -->
                    <p class="text-gray-600 leading-8 mb-6">${product.desc}</p>

                    <!-- features -->
                    <div class="space-y-3 text-sm text-gray-700 mb-8">

                        <p>
                            <i class="fa-solid fa-circle-check text-green-500 mr-2"></i>
                            Ultra Soft Material
                        </p>

                        <p>
                            <i class="fa-solid fa-circle-check text-green-500 mr-2"></i>
                            Anti Allergy Fabric
                        </p>

                        <p>
                            <i class="fa-solid fa-circle-check text-green-500 mr-2"></i>
                            Machine Washable
                        </p>

                        <p>
                            <i class="fa-solid fa-circle-check text-green-500 mr-2"></i>
                            Perfect Neck Support
                        </p>

                    </div>

                    <!-- buttons -->
                    <div class="flex items-center gap-4 mb-8">

                        <!-- Cart -->
                        <button class="add-btn w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-black text-white active:scale-95 transition-all duration-300">

                            <i class="fa fa-shopping-cart add-icon"></i>

                            <i class="fa fa-trash remove-icon hidden"></i>

                            <span class="btn-text">
                                Add to Cart
                            </span>

                        </button>

                        <!-- Wishlist -->
                        <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition">

                            <i class="fa-regular fa-heart add-fav text-gray-400 hover:text-red-500 hover:scale-125 transition duration-200"></i>

                        </button>

                    </div>

                    <!-- delivery -->
                    <div class="border-t pt-6 text-sm text-gray-600 space-y-3">

                        <p>
                            <i class="fa-solid fa-truck-fast text-yellow-500 mr-2"></i>
                            Free delivery within 2 - 4 days
                        </p>

                        <p>
                            <i class="fa-solid fa-shield-halved text-green-500 mr-2"></i>
                            Secure payment guaranteed
                        </p>

                        <p>
                            <i class="fa-solid fa-rotate-left text-blue-500 mr-2"></i>
                            Easy return within 14 days
                        </p>

                    </div>

                </div>

            </div>

        </div>
    `;
}
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

    updateWishlistCount();
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