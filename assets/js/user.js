function getUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function toggleAuthButtons(user) {

    let log_in = document.querySelector("#loginLink");
    let log_out = document.querySelectorAll("#logoutBtn");
    let user_Section = document.querySelector("#userSection");

    if (user) {

        log_in.classList.add("hidden");

        log_out.forEach(btn => btn.classList.remove("hidden"));

        user_Section.classList.remove("hidden");

    } else {

        log_in.classList.remove("hidden");

        log_out.forEach(btn => btn.classList.add("hidden"));

        user_Section.classList.add("hidden");
    }
}

function showUsername(user) {

    let user_name = document.querySelector(".username");

    user_name.textContent = user ? user.username : "Welcome";
}

function updateUI() {

    let user = getUser();

    toggleAuthButtons(user);
    showUsername(user);
}

updateUI();

function handleLogout(e) {

    e.preventDefault();

    localStorage.removeItem("currentUser");

    alert("Logout successful ✅");

    updateUI();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

/* Header Logout */
document.querySelectorAll("#logoutBtn")
.forEach(btn => btn.addEventListener("click", handleLogout));

/* Sidebar Logout */
document.querySelector("#sidebarLogout")
.addEventListener("click", handleLogout);