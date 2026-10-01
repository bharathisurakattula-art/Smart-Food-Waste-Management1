// Smart Food Waste Management
// Volunteer JavaScript


document.addEventListener("DOMContentLoaded", function () {

    loadFoodDonations();

    loadAcceptedFood();

    updateStatistics();

});


/* SAMPLE FOOD DONATIONS */

const defaultFood = [

    {
        id: 1,
        donor: "Ravi Kumar",
        foodName: "Vegetable Rice",
        foodType: "Rice",
        quantity: "20 plates",
        location: "Madhapur, Hyderabad",
        availableTime: "6:00 PM",
        expiryTime: "9:00 PM",
        contact: "9876543210",
        status: "Available"
    },

    {
        id: 2,
        donor: "Anjali",
        foodName: "Chapati & Curry",
        foodType: "Meals",
        quantity: "15 plates",
        location: "Kukatpally, Hyderabad",
        availableTime: "7:00 PM",
        expiryTime: "10:00 PM",
        contact: "9876543211",
        status: "Available"
    },

    {
        id: 3,
        donor: "Sai Restaurant",
        foodName: "Meals",
        foodType: "Food",
        quantity: "30 plates",
        location: "Ameerpet, Hyderabad",
        availableTime: "5:30 PM",
        expiryTime: "8:30 PM",
        contact: "9876543212",
        status: "Available"
    }

];


/* LOAD FOOD DONATIONS */

function loadFoodDonations() {

    const foodList =
        document.getElementById("foodList");

    foodList.innerHTML = "";


    let donations =
        JSON.parse(
            localStorage.getItem("foodDonations")
        );


    // Use sample data if no donor data exists
    if (!donations || donations.length === 0) {

        donations = defaultFood;

    }


    const availableFood =
        donations.filter(function (food) {

            return food.status === "Available";

        });


    if (availableFood.length === 0) {

        foodList.innerHTML = `
            <div class="food-card">
                <h3>No Food Available</h3>
                <p>
                    There are currently no available
                    food donations.
                </p>
            </div>
        `;

        return;
    }


    availableFood.forEach(function (food) {

        const card =
            document.createElement("div");

        card.className = "food-card";


        card.innerHTML = `

            <h3>${food.foodName}</h3>

            <p>
                <strong>Donor:</strong>
                ${food.donor || "Anonymous"}
            </p>

            <p>
                <strong>Food Type:</strong>
                ${food.foodType || "Food"}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${food.quantity}
            </p>

            <p>
                <strong>Pickup Location:</strong>
                ${food.location}
            </p>

            <p>
                <strong>Available:</strong>
                ${food.availableTime || "Not specified"}
            </p>

            <p>
                <strong>Expires:</strong>
                ${food.expiryTime || "Not specified"}
            </p>

            <span class="status status-available">
                Available
            </span>

            <button
                class="map-button"
                onclick="openMap('${food.location}')"
            >
                📍 View Location
            </button>

            <button
                class="accept-button"
                onclick="acceptFood(${food.id})"
            >
                Accept Donation
            </button>

        `;


        foodList.appendChild(card);

    });

}


/* ACCEPT FOOD */

function acceptFood(id) {

    let donations =
        JSON.parse(
            localStorage.getItem("foodDonations")
        );


    // If no donor data exists,
    // create sample data locally
    if (!donations || donations.length === 0) {

        donations = defaultFood;

    }


    const food =
        donations.find(function (item) {

            return item.id == id;

        });


    if (!food) {

        alert("Food donation not found.");

        return;
    }


    food.status = "Accepted";


    localStorage.setItem(
        "foodDonations",
        JSON.stringify(donations)
    );


    // Save accepted food

    let accepted =
        JSON.parse(
            localStorage.getItem("acceptedFood")
        ) || [];


    accepted.push(food);


    localStorage.setItem(
        "acceptedFood",
        JSON.stringify(accepted)
    );


    alert(
        "Food donation accepted successfully!"
    );


    loadFoodDonations();

    loadAcceptedFood();

    updateStatistics();

}


/* LOAD ACCEPTED FOOD */

function loadAcceptedFood() {

    const acceptedList =
        document.getElementById("acceptedList");

    acceptedList.innerHTML = "";


    const accepted =
        JSON.parse(
            localStorage.getItem("acceptedFood")
        ) || [];


    if (accepted.length === 0) {

        acceptedList.innerHTML = `
            <div class="accepted-card">
                <h3>No Accepted Donations</h3>
                <p>
                    You have not accepted any food
                    donations yet.
                </p>
            </div>
        `;

        return;
    }


    accepted.forEach(function (food) {

        const card =
            document.createElement("div");

        card.className = "accepted-card";


        card.innerHTML = `

            <h3>${food.foodName}</h3>

            <p>
                <strong>Donor:</strong>
                ${food.donor || "Anonymous"}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${food.quantity}
            </p>

            <p>
                <strong>Location:</strong>
                ${food.location}
            </p>

            <span class="status status-accepted">
                Accepted
            </span>

            <button
                class="map-button"
                onclick="openMap('${food.location}')"
            >
                📍 Open Location
            </button>

            <button
                class="deliver-button"
                onclick="markDelivered(${food.id})"
            >
                ✓ Mark as Delivered
            </button>

        `;


        acceptedList.appendChild(card);

    });

}


/* MARK FOOD AS DELIVERED */

function markDelivered(id) {

    let accepted =
        JSON.parse(
            localStorage.getItem("acceptedFood")
        ) || [];


    const food =
        accepted.find(function (item) {

            return item.id == id;

        });


    if (!food) {

        return;
    }


    food.status = "Delivered";


    // Remove from accepted list

    accepted =
        accepted.filter(function (item) {

            return item.id != id;

        });


    localStorage.setItem(
        "acceptedFood",
        JSON.stringify(accepted)
    );


    // Update original donation

    let donations =
        JSON.parse(
            localStorage.getItem("foodDonations")
        ) || [];


    const donation =
        donations.find(function (item) {

            return item.id == id;

        });


    if (donation) {

        donation.status = "Delivered";

        localStorage.setItem(
            "foodDonations",
            JSON.stringify(donations)
        );

    }


    // Increase delivered count

    let delivered =
        Number(
            localStorage.getItem("deliveredCount")
        ) || 0;

    delivered++;

    localStorage.setItem(
        "deliveredCount",
        delivered
    );


    alert(
        "Food marked as delivered successfully!"
    );


    loadFoodDonations();

    loadAcceptedFood();

    updateStatistics();

}


/* OPEN GOOGLE MAPS */

function openMap(location) {

    const mapURL =
        "https://www.google.com/maps/search/?api=1&query="
        + encodeURIComponent(location);

    window.open(
        mapURL,
        "_blank"
    );

}


/* UPDATE STATISTICS */

function updateStatistics() {

    let donations =
        JSON.parse(
            localStorage.getItem("foodDonations")
        );


    if (!donations || donations.length === 0) {

        donations = defaultFood;

    }


    const available =
        donations.filter(function (food) {

            return food.status === "Available";

        }).length;


    const accepted =
        JSON.parse(
            localStorage.getItem("acceptedFood")
        ) || [];


    const delivered =
        Number(
            localStorage.getItem("deliveredCount")
        ) || 0;


    document.getElementById(
        "availableCount"
    ).textContent = available;


    document.getElementById(
        "acceptedCount"
    ).textContent = accepted.length;


    document.getElementById(
        "deliveredCount"
    ).textContent = delivered;


    document.getElementById(
        "peopleHelped"
    ).textContent = delivered;

}


/* CONTACT ADMIN */

function contactAdmin() {

    alert(
        "Please contact the Smart Food Waste Management administrator for assistance."
    );

}