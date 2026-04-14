function getUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function toggleAuthButtons(user) {
    let log_in = document.querySelector("#loginLink");
    let log_out = document.querySelector("#logoutBtn");

    let user_Section = document.querySelector("#userSection");

    if (user) {
        log_in.classList.add("hidden");
        log_out.classList.remove("hidden");
        user_Section.classList.remove("hidden");
    } else {
        log_in.classList.remove("hidden");
        log_out.classList.add("hidden");
        user_Section.classList.add("hidden");
    }
}

function showUsername(user) {
    let user_name = document.querySelector(".username");

    if (user) {
        user_name.textContent = `${user.username}`;
    } else {
        user_name.textContent = "Welcome";
    }
}

function updateUI() {
    let user = getUser();

    toggleAuthButtons(user);
    showUsername(user);
    // console.log(user);
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

document.querySelectorAll("#logoutBtn")
    .forEach(btn => btn.addEventListener("click", handleLogout));