document.addEventListener('DOMContentLoaded', function() {
    // Example of fetching and displaying rental data
    fetchRentals();
    fetchDVDs();
    fetchCustomers();
    fetchAlerts();

    // Handle Add DVD Form submission
    document.getElementById('add-dvd-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('dvd-title').value;
        const genre = document.getElementById('dvd-genre').value;
        const stock = document.getElementById('dvd-stock').value;
        addDVD(title, genre, stock);
    });

    // Handle Update Customer Form submission
    document.getElementById('update-customer-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('customer-id').value;
        const name = document.getElementById('customer-name').value;
        const email = document.getElementById('customer-email').value;
        updateCustomer(id, name, email);
    });

    // Handle Add User Form submission
    document.getElementById('add-user-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const role = document.getElementById('role').value;
        addUser(username, role);
    });
});

function fetchRentals() {
    fetch('/api/current_rentals')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('current-rentals').getElementsByTagName('tbody')[0];
            data.forEach(rental => {
                const row = table.insertRow();
                row.insertCell().textContent = rental.id;
                row.insertCell().textContent = rental.dvd_title;
                row.insertCell().textContent = rental.customer_id;
                row.insertCell().textContent = rental.rental_date;
                row.insertCell().textContent = rental.due_date;
            });
        });

    fetch('/api/overdue_rentals')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('overdue-rentals').getElementsByTagName('tbody')[0];
            data.forEach(rental => {
                const row = table.insertRow();
                row.insertCell().textContent = rental.id;
                row.insertCell().textContent = rental.dvd_title;
                row.insertCell().textContent = rental.customer_id;
                row.insertCell().textContent = rental.rental_date;
                row.insertCell().textContent = rental.due_date;
            });
        });
}

function fetchDVDs() {
    fetch('/api/dvd_catalog')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('dvd-catalog').getElementsByTagName('tbody')[0];
            data.forEach(dvd => {
                const row = table.insertRow();
                row.insertCell().textContent = dvd.id;
                row.insertCell().textContent = dvd.title;
                row.insertCell().textContent = dvd.genre;
                row.insertCell().textContent = dvd.stock;
            });
        });
}

function fetchCustomers() {
    fetch('/api/customers')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('customer-list').getElementsByTagName('tbody')[0];
            data.forEach(customer => {
                const row = table.insertRow();
                row.insertCell().textContent = customer.id;
                row.insertCell().textContent = customer.name;
                row.insertCell().textContent = customer.email;
            });
        });
}

function fetchAlerts() {
    fetch('/api/alerts')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('alerts-list');
            data.forEach(alert => {
                const li = document.createElement('li');
                li.textContent = alert.message;
                list.appendChild(li);
            });
        });
}

function addDVD(title, genre, stock) {
    fetch('/api/add_dvd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, genre, stock })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchDVDs();
    });
}

function updateCustomer(id, name, email) {
    fetch(`/api/update_customer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchCustomers();
    });
}

function addUser(username, role) {
    fetch('/api/add_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, role })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}
