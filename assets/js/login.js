let form = document.querySelector("#loginForm");

let user_Email = document.querySelector("#email");
let user_Password = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let email = user_Email.value.trim().toLowerCase();
    let password = user_Password.value.trim();

    if (email === '') {
        alert("Please enter your email");
        return;
    }

    if (password === '') {
        alert("Please enter your password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email);


    if (!user) {
        alert("No account found. Please register ❌");

        setTimeout(() => {
            window.location.href = "register.html";
        }, 1500);

        return;
    }

    if (user.password !== password) {
        alert("Password does not match");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful ✅");
    setTimeout(() => {
        window.location.replace("index.html");
    }, 1500);
});