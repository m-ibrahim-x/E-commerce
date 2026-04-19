function toggleSidebar() {
    const sb = document.getElementById("sidebar");
    const texts = document.querySelectorAll(".sidebar-text");

    //Order 
    let wishlist  = document.getElementById("wishlist");


    const isOpen = sb.classList.contains("w-32");

    if (isOpen) {
        sb.classList.replace("w-32", "w-16");
        wishlist.classList.replace("mr-32", "mr-16");
        texts.forEach(el => el.classList.add("hidden"))
    } else {
        sb.classList.replace("w-16", "w-32");
        wishlist.classList.replace("mr-16", "mr-32");
        texts.forEach(el => el.classList.remove("hidden"))
    }

};
/*********************
    Wishlist
**********************/
function getWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function setWishlist(wishlist) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

let products_container = document.querySelector("#wishlistContainer");

function renderProducts(products) {

    let card = "";

    products.forEach(item => {
        card +=`
            <div  data-id="${item.id}" class="relative group bg-white rounded-2xl overflow-hidden shadow">
                <img src="${item.image}"
                    class="w-full h-64 object-cover group-hover:scale-105 transition duration-300">
                <!-- Heart -->
                <button data-id="${item.id}"
                    class="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition">
                        <i  class="fa-regular fa-heart  add-fav text-red-400 hover:text-gray-500 hover:scale-125 transition duration-200"></i>
                </button>
        </div> 
        `
    });

    products_container.innerHTML = card;
}
let card = getWishlist()
renderProducts(card)
/*********************
    Remove item
**********************/

document.addEventListener("click", (e) => {

    let btn = e.target.closest("button[data-id]");
    if (!btn || !e.target.closest(".add-fav")) return;

    let id = Number(btn.dataset.id);

    let wishlist = getWishlist();

    wishlist = wishlist.filter(p => p.id !== id);

    setWishlist(wishlist);
    renderProducts(wishlist);
    updateWishlistCount();
});