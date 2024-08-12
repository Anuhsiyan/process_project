// Sample data (can be fetched from local storage or an API)
let dvdCollection = [];

// Function to add a new DVD
function addDVD(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const director = document.getElementById('director').value;
    const releaseDate = document.getElementById('releaseDate').value;

    // Create DVD object
    const newDVD = {
        title: title,
        genre: genre,
        director: director,
        releaseDate: releaseDate
    };


    // Add DVD to collection
    dvdCollection.push(newDVD);

    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('director').value = '';
    document.getElementById('releaseDate').value = '';

    // Update DVD list display
    displayDVDs();
}

// Function to display DVDs
function displayDVDs() {
    const dvdList = document.getElementById('dvdItems');
    dvdList.innerHTML = '';

    dvdCollection.forEach(dvd => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${dvd.title}</strong> (${dvd.genre}) - Directed by ${dvd.director}, Released on ${dvd.releaseDate}`;
        dvdList.appendChild(li);
    });
}

// Event listener for form submission
document.getElementById('addDVDForm').addEventListener('submit', addDVD);

// Display initial DVDs on page load
displayDVDs();
