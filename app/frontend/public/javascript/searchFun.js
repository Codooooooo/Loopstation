function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    // If no results were found, display a message indicating so.
    if (results.length === 0) {
        const noResults = document.createElement('tr');
        const noResultsCell = document.createElement('td');
        noResultsCell.textContent = 'No results found';
        noResultsCell.setAttribute('colspan', '5');
        noResults.appendChild(noResultsCell);
        resultsList.appendChild(noResults);
    } else {
        // Otherwise, create a table row for each result and append it to the results list.
        for (const result of results) {
            const row = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.textContent = result.p_name;
            row.appendChild(nameCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = result.p_des;
            row.appendChild(descriptionCell);

            const ratingCell = document.createElement('td');
            ratingCell.textContent = result.rating;
            row.appendChild(ratingCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = result.p_type;
            row.appendChild(typeCell);

            const detailCell = document.createElement('td');
            const detailLink = document.createElement('a');
            detailLink.href = `./${result.p_id}`; //  have a details page with the product id in the URL
            detailLink.textContent = 'View Details';
            detailCell.appendChild(detailLink);
            row.appendChild(detailCell);

            resultsList.appendChild(row);
        }
    }
}

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const rating = document.getElementById('rating').value;

    try {
        const response = await fetch('http://localhost:5000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, type, rating }),
        });
        // If the search was successful, display the results.
        if (response.ok) {
            const results = await response.json();
            displayResults(results);
        } else {
            // Otherwise, log an error message to the console.
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
