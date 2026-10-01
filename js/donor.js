/* ================= DONOR DASHBOARD ================= */

// Store donations
let myDonations = [];


// ================= FORM =================

const donorFoodForm =
    document.getElementById("donorFoodForm");


if (donorFoodForm) {

    donorFoodForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const donorName =
                document.getElementById("donorName").value.trim();

            const foodName =
                document.getElementById("foodName").value.trim();

            const foodType =
                document.getElementById("foodType").value;

            const foodQuantity =
                document.getElementById("foodQuantity").value.trim();

            const foodLocation =
                document.getElementById("foodLocation").value.trim();

            const availableTime =
                document.getElementById("availableTime").value;

            const expiryTime =
                document.getElementById("expiryTime").value;

            const contactNumber =
                document.getElementById("contactNumber").value.trim();

            const imageInput =
                document.getElementById("foodImage");


            // Validate
            if (
                donorName === "" ||
                foodName === "" ||
                foodType === "" ||
                foodQuantity === "" ||
                foodLocation === "" ||
                availableTime === "" ||
                expiryTime === "" ||
                contactNumber === ""
            ) {

                alert("Please fill all required fields.");

                return;
            }


            // Create donation object
            const donation = {

                id: Date.now(),

                donorName: donorName,

                foodName: foodName,

                foodType: foodType,

                quantity: foodQuantity,

                location: foodLocation,

                availableTime: availableTime,

                expiryTime: expiryTime,

                contact: contactNumber,

                status: "Available",

                image: ""

            };


            // Read image
            if (
                imageInput.files &&
                imageInput.files.length > 0
            ) {

                const reader =
                    new FileReader();

                reader.onload = function () {

                    donation.image =
                        reader.result;

                    myDonations.push(donation);

                    saveDonations();

                    displayDonations();

                    updateStatistics();

                    donorFoodForm.reset();

                    alert(
                        "Food donation submitted successfully!"
                    );
                };

                reader.readAsDataURL(
                    imageInput.files[0]
                );

            } else {

                myDonations.push(donation);

                saveDonations();

                displayDonations();

                updateStatistics();

                donorFoodForm.reset();

                alert(
                    "Food donation submitted successfully!"
                );
            }

        }
    );
}


// ================= DISPLAY DONATIONS =================

function displayDonations() {

    const donationContainer =
        document.getElementById("myDonations");

    if (!donationContainer) {
        return;
    }


    donationContainer.innerHTML = "";


    if (myDonations.length === 0) {

        donationContainer.innerHTML = `

            <div class="empty-message">

                <h3>No Donations Yet</h3>

                <p>
                    Your submitted food donations
                    will appear here.
                </p>

            </div>

        `;

        return;
    }


    myDonations.forEach(function (donation) {

        const card =
            document.createElement("div");

        card.className = "donation-card";


        let imageHTML = "";

        if (donation.image !== "") {

            imageHTML = `
                <img
                    src="${donation.image}"
                    alt="Food Donation">
            `;
        }


        card.innerHTML = `

            <h3>
                ${donation.foodName}
            </h3>

            ${imageHTML}

            <p>
                <strong>Donor:</strong>
                ${donation.donorName}
            </p>

            <p>
                <strong>Food Type:</strong>
                ${donation.foodType}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${donation.quantity}
            </p>

            <p>
                <strong>Location:</strong>
                ${donation.location}
            </p>

            <p>
                <strong>Available From:</strong>
                ${donation.availableTime}
            </p>

            <p>
                <strong>Best Before:</strong>
                ${donation.expiryTime}
            </p>

            <p>
                <strong>Contact:</strong>
                ${donation.contact}
            </p>

            <span class="status">
                ${donation.status}
            </span>

            <br>

            <button
                class="delete-donation"
                onclick="deleteDonation(${donation.id})">

                Delete Donation

            </button>

        `;


        donationContainer.appendChild(card);

    });
}


// ================= DELETE DONATION =================

function deleteDonation(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this donation?"
        );


    if (!confirmDelete) {
        return;
    }


    myDonations =
        myDonations.filter(
            function (donation) {

                return donation.id !== id;

            }
        );


    saveDonations();

    displayDonations();

    updateStatistics();

    alert("Donation deleted successfully.");
}


// ================= STATISTICS =================

function updateStatistics() {

    const total =
        myDonations.length;


    const available =
        myDonations.filter(
            function (donation) {

                return donation.status === "Available";

            }
        ).length;


    const completed =
        myDonations.filter(
            function (donation) {

                return donation.status === "Delivered";

            }
        ).length;


    document.getElementById(
        "totalDonations"
    ).textContent = total;


    document.getElementById(
        "availableDonations"
    ).textContent = available;


    document.getElementById(
        "completedDonations"
    ).textContent = completed;
}


// ================= GOOGLE MAPS =================

function openMap() {

    const locationInput =
        document.getElementById("foodLocation");

    const location =
        locationInput.value.trim();


    if (location === "") {

        alert(
            "Please enter your food location first."
        );

        locationInput.focus();

        return;
    }


    const mapURL =
        "https://www.google.com/maps/search/?api=1&query="
        + encodeURIComponent(location);


    window.open(
        mapURL,
        "_blank"
    );
}


// ================= LOCAL STORAGE =================

function saveDonations() {

    localStorage.setItem(
        "donorFoodDonations",
        JSON.stringify(myDonations)
    );
}


function loadDonations() {

    const savedDonations =
        localStorage.getItem(
            "donorFoodDonations"
        );


    if (savedDonations) {

        try {

            myDonations =
                JSON.parse(savedDonations);

        } catch (error) {

            myDonations = [];

        }

    } else {

        myDonations = [];

    }


    displayDonations();

    updateStatistics();
}


// ================= PAGE LOAD =================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDonations();

    }
);