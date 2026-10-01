// Smart Food Waste Management
// Register JavaScript


document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");

    const passwordInput =
        document.getElementById("registerPassword");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const registerMessage =
        document.getElementById("registerMessage");

    const termsLink =
        document.getElementById("termsLink");


    /* SHOW / HIDE PASSWORD */

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁";
        }

    });


    /* SHOW / HIDE CONFIRM PASSWORD */

    toggleConfirmPassword.addEventListener("click", function () {

        if (confirmPasswordInput.type === "password") {

            confirmPasswordInput.type = "text";

            toggleConfirmPassword.textContent = "🙈";

        } else {

            confirmPasswordInput.type = "password";

            toggleConfirmPassword.textContent = "👁";
        }

    });


    /* TERMS AND CONDITIONS */

    termsLink.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "Terms & Conditions:\n\n" +
            "1. Provide genuine information.\n" +
            "2. Donated food should be safe for consumption.\n" +
            "3. Volunteers should collect food responsibly.\n" +
            "4. Users should use the platform responsibly."
        );

    });


    /* REGISTER FORM */

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // GET VALUES

        const name =
            document.getElementById("registerName")
            .value.trim();

        const email =
            document.getElementById("registerEmail")
            .value.trim()
            .toLowerCase();

        const phone =
            document.getElementById("registerPhone")
            .value.trim();

        const role =
            document.getElementById("registerRole")
            .value;

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;

        const terms =
            document.getElementById("terms").checked;


        /* VALIDATION */

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            role === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            showMessage(
                "Please fill all the fields.",
                "red"
            );

            return;
        }


        /* PHONE VALIDATION */

        if (!/^[0-9]{10}$/.test(phone)) {

            showMessage(
                "Please enter a valid 10-digit phone number.",
                "red"
            );

            return;
        }


        /* PASSWORD LENGTH */

        if (password.length < 6) {

            showMessage(
                "Password must contain at least 6 characters.",
                "red"
            );

            return;
        }


        /* PASSWORD MATCH */

        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "red"
            );

            return;
        }


        /* TERMS */

        if (!terms) {

            showMessage(
                "Please agree to the Terms & Conditions.",
                "red"
            );

            return;
        }


        /* GET EXISTING USERS */

        let users =
            JSON.parse(
                localStorage.getItem("smartFoodUsers")
            ) || [];


        /* CHECK EXISTING EMAIL */

        const existingUser =
            users.find(function (user) {

                return user.email === email;

            });


        if (existingUser) {

            showMessage(
                "This email is already registered.",
                "red"
            );

            return;
        }


        /* CREATE USER */

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            role: role,

            password: password
        };


        /* SAVE USER */

        users.push(newUser);

        localStorage.setItem(
            "smartFoodUsers",
            JSON.stringify(users)
        );


        /* SUCCESS MESSAGE */

        showMessage(
            "Registration successful! Redirecting to login...",
            "green"
        );


        /* REDIRECT */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });


    /* MESSAGE FUNCTION */

    function showMessage(message, color) {

        registerMessage.textContent = message;

        registerMessage.style.color = color;

    }

});