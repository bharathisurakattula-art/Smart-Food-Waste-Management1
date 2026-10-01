// ==========================================
// SMART FOOD WASTE MANAGEMENT
// Main JavaScript File
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ------------------------------------------
    // MOBILE MENU
    // ------------------------------------------

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }


    // ------------------------------------------
    // CLOSE MOBILE MENU AFTER CLICKING LINK
    // ------------------------------------------

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu) {
                navMenu.classList.remove("active");
            }
        });
    });


    // ------------------------------------------
    // SMOOTH SCROLL
    // ------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // ------------------------------------------
    // CURRENT YEAR IN FOOTER
    // ------------------------------------------

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ------------------------------------------
    // BACK TO TOP BUTTON
    // ------------------------------------------

    const topButton = document.getElementById("backToTop");

    if (topButton) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                topButton.style.display = "block";
            } else {
                topButton.style.display = "none";
            }

        });

        topButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // ------------------------------------------
    // LOGOUT FUNCTION
    // ------------------------------------------

    const logoutButtons = document.querySelectorAll(".logout-btn");

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            localStorage.removeItem("smartFoodLogin");
            sessionStorage.removeItem("smartFoodLogin");

            alert("You have been logged out.");

            window.location.href = "login.html";

        });

    });


    // ------------------------------------------
    // CHECK LOGIN STATUS
    // ------------------------------------------

    const loginData =
        localStorage.getItem("smartFoodLogin") ||
        sessionStorage.getItem("smartFoodLogin");

    const loginButtons = document.querySelectorAll(".login-btn");
    const userElements = document.querySelectorAll(".logged-user");

    if (loginData) {

        try {

            const user = JSON.parse(loginData);

            userElements.forEach(function (element) {
                element.textContent = user.email || "User";
            });

            loginButtons.forEach(function (button) {
                button.style.display = "none";
            });

        } catch (error) {
            console.log("Login data could not be read.");
        }

    }


    // ------------------------------------------
    // IMAGE PREVIEW
    // ------------------------------------------

    const imageInputs = document.querySelectorAll(
        'input[type="file"][accept*="image"]'
    );

    imageInputs.forEach(function (input) {

        input.addEventListener("change", function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                this.value = "";
                return;
            }

            const previewId = this.getAttribute("data-preview");
            const preview = document.getElementById(previewId);

            if (preview) {

                const reader = new FileReader();

                reader.onload = function (event) {
                    preview.src = event.target.result;
                    preview.style.display = "block";
                };

                reader.readAsDataURL(file);
            }

        });

    });


    // ------------------------------------------
    // GENERAL FORM VALIDATION
    // ------------------------------------------

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            const requiredFields =
                form.querySelectorAll("[required]");

            let valid = true;

            requiredFields.forEach(function (field) {

                if (!field.value.trim()) {

                    valid = false;
                    field.style.border = "2px solid red";

                } else {

                    field.style.border = "";

                }

            });

            if (!valid) {

                event.preventDefault();

                alert("Please fill all required fields.");

            }

        });

    });


    // ------------------------------------------
    // CONTACT MESSAGE
    // ------------------------------------------

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            alert(
                "Thank you for contacting Smart Food Waste Management!"
            );

            contactForm.reset();

        });

    }


    // ------------------------------------------
    // WELCOME MESSAGE
    // ------------------------------------------

    console.log(
        "Smart Food Waste Management website loaded successfully."
    );

});