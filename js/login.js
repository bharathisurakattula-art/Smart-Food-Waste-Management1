// Smart Food Waste Management
// Login JavaScript

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("loginPassword");
    const togglePassword = document.getElementById("togglePassword");
    const forgotPassword = document.getElementById("forgotPassword");
    const loginMessage = document.getElementById("loginMessage");


    // SHOW / HIDE PASSWORD
    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁";
        }

    });


    // FORGOT PASSWORD
    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        if (email === "") {
            loginMessage.textContent = "Please enter your email first.";
            loginMessage.style.color = "red";
            return;
        }

        loginMessage.textContent =
            "Password reset option will be available soon.";

        loginMessage.style.color = "#218838";
    });


    // LOGIN
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const role =
            document.getElementById("loginRole").value;

        const rememberMe =
            document.getElementById("rememberMe").checked;


        // BASIC VALIDATION

        if (email === "" || password === "" || role === "") {

            loginMessage.textContent =
                "Please fill all the fields.";

            loginMessage.style.color = "red";

            return;
        }


        // DEMO ADMIN LOGIN

        if (
            role === "admin" &&
            email === "admin@smartfood.com" &&
            password === "Admin@123"
        ) {

            loginMessage.textContent =
                "Login successful! Redirecting...";

            loginMessage.style.color = "green";

            saveLogin(email, role, rememberMe);

            setTimeout(function () {
                window.location.href = "admin.html";
            }, 1000);

            return;
        }


        // CHECK REGISTERED USERS

        const users =
            JSON.parse(localStorage.getItem("smartFoodUsers")) || [];

        const user =
            users.find(function (item) {

                return (
                    item.email === email &&
                    item.password === password &&
                    item.role === role
                );

            });


        if (user) {

            loginMessage.textContent =
                "Login successful! Redirecting...";

            loginMessage.style.color = "green";

            saveLogin(email, role, rememberMe);

            setTimeout(function () {

                if (role === "donor") {
                    window.location.href = "donor.html";
                }

                else if (role === "volunteer") {
                    window.location.href = "volunteer.html";
                }

                else if (role === "admin") {
                    window.location.href = "admin.html";
                }

            }, 1000);

        } else {

            loginMessage.textContent =
                "Invalid email, password or role.";

            loginMessage.style.color = "red";
        }

    });


    // SAVE LOGIN INFORMATION
    function saveLogin(email, role, rememberMe) {

        const loginData = {
            email: email,
            role: role,
            loggedIn: true
        };

        if (rememberMe) {

            localStorage.setItem(
                "smartFoodLogin",
                JSON.stringify(loginData)
            );

        } else {

            sessionStorage.setItem(
                "smartFoodLogin",
                JSON.stringify(loginData)
            );
        }
    }

});