let form = document.querySelector("#registerForm");

let user_Name = document.querySelector("#username");
let user_Email = document.querySelector("#email");
let user_Password = document.querySelector("#password");
let user_Confirm_Password = document.querySelector("#confirmPassword");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = user_Name.value.trim();
    let email = user_Email.value.trim().toLowerCase();
    let password = user_Password.value.trim();
    let confirmPassword = user_Confirm_Password.value.trim();

    if (username === '') {
        alert("Please enter your username");
        return;
    }

    if (email === '') {
        alert("Please enter your email");
        return;
    }

    if (password === '') {
        alert("Please enter your password");
        return;
    }

    if (confirmPassword === '') {
        alert("Please enter your confirm password");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    } else if (password.length > 12) {
        alert("Password must be at most 12 characters");
        return;
    }

    if (password !== confirmPassword) {
        alert("Password does not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let isExist = users.some(user => user.email === email);

    if (isExist) {
        alert("Email already exists");
        return;
    }

    let newUser = {
        username: username,
        email: email,
        password: password,
        cart: [],
        wishlist: []
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully ✅");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});



