/* ================= ADMIN DASHBOARD ================= */

// Sample donation data
let donations = [
    {
        donor: "Sample Donor",
        food: "Vegetable Rice",
        quantity: "10 plates",
        location: "Madhapur",
        status: "Available"
    }
];


// Sample volunteer data
let volunteers = [
    {
        name: "Sample Volunteer",
        email: "volunteer@example.com",
        phone: "9876543210",
        location: "Hyderabad",
        status: "Active"
    }
];


// ================= LOAD DASHBOARD =================

function loadDashboard() {

    // Statistics
    document.getElementById("totalDonations").textContent =
        donations.length;

    document.getElementById("availableFood").textContent =
        donations.filter(
            donation => donation.status === "Available"
        ).length;

    document.getElementById("totalVolunteers").textContent =
        volunteers.length;

    document.getElementById("foodDelivered").textContent =
        donations.filter(
            donation => donation.status === "Delivered"
        ).length;


    // User counts
    document.getElementById("donorCount").textContent =
        donations.length;

    document.getElementById("volunteerCount").textContent =
        volunteers.length;

    document.getElementById("adminCount").textContent = "1";


    // Report
    document.getElementById("foodSaved").textContent =
        donations.length;

    document.getElementById("peopleHelped").textContent =
        donations.length * 5;

    document.getElementById("activeVolunteers").textContent =
        volunteers.filter(
            volunteer => volunteer.status === "Active"
        ).length;


    displayDonations();
    displayVolunteers();
}


// ================= DISPLAY DONATIONS =================

function displayDonations() {

    const table = document.getElementById("donationTable");

    table.innerHTML = "";

    if (donations.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    No donations available
                </td>
            </tr>
        `;

        return;
    }


    donations.forEach((donation, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donation.donor}</td>

            <td>${donation.food}</td>

            <td>${donation.quantity}</td>

            <td>${donation.location}</td>

            <td>${donation.status}</td>

            <td>

                <button
                    class="approve-btn"
                    onclick="markDelivered(${index})">
                    Deliver
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteDonation(${index})">
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);

    });
}


// ================= DISPLAY VOLUNTEERS =================

function displayVolunteers() {

    const table = document.getElementById("volunteerTable");

    table.innerHTML = "";

    if (volunteers.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    No volunteers registered
                </td>
            </tr>
        `;

        return;
    }


    volunteers.forEach((volunteer, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${volunteer.name}</td>

            <td>${volunteer.email}</td>

            <td>${volunteer.phone}</td>

            <td>${volunteer.location}</td>

            <td>${volunteer.status}</td>

            <td>

                <button
                    class="approve-btn"
                    onclick="activateVolunteer(${index})">
                    Activate
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteVolunteer(${index})">
                    Delete
                </button>

            </td>
        `;

        table.appendChild(row);

    });
}


// ================= DONATION ACTIONS =================

function markDelivered(index) {

    donations[index].status = "Delivered";

    alert("Food marked as delivered.");

    loadDashboard();
}


function deleteDonation(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this donation?");

    if (confirmDelete) {

        donations.splice(index, 1);

        loadDashboard();
    }
}


// ================= VOLUNTEER ACTIONS =================

function activateVolunteer(index) {

    volunteers[index].status = "Active";

    alert("Volunteer activated.");

    loadDashboard();
}


function deleteVolunteer(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this volunteer?");

    if (confirmDelete) {

        volunteers.splice(index, 1);

        loadDashboard();
    }
}


// ================= ADMIN MESSAGE =================

const adminMessageForm =
    document.getElementById("adminMessageForm");


if (adminMessageForm) {

    adminMessageForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const message =
                document.getElementById("adminMessage").value.trim();

            if (message === "") {

                alert("Please enter a message.");

                return;
            }


            document.getElementById("messageResult").textContent =
                "Message sent successfully!";

            document.getElementById("adminMessage").value = "";

        }
    );
}


// ================= START DASHBOARD =================

document.addEventListener(
    "DOMContentLoaded",
    loadDashboard
);