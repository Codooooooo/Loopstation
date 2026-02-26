function displayResults(results) {
  // Get the results list element and clear any existing results.
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
            // Add a cell for the product name.
            const nameCell = document.createElement('td');
            nameCell.textContent = result.p_name;
            row.appendChild(nameCell);
            // Add a cell for the product description.
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = result.p_des;
            row.appendChild(descriptionCell);
            // Add a cell for the product type.
            const ratingCell = document.createElement('td');
            ratingCell.textContent = result.rating;
            row.appendChild(ratingCell);
            // Add a cell for the product type.
            const typeCell = document.createElement('td');
            typeCell.textContent = result.p_type;
            row.appendChild(typeCell);

            // Add a cell for the product details link.
            const detailCell = document.createElement('td');
            const detailLink = document.createElement('a');
            detailLink.href = `./${result.p_id}`;
            detailLink.textContent = 'View Details';
            detailCell.appendChild(detailLink);
            row.appendChild(detailCell);

            resultsList.appendChild(row);
        }
    }
}
// Add an event listener to the search form to handle search submissions.
document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get the search criteria from the form.
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

        if (response.ok) {
            const results = await response.json();
            displayResults(results);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
// Add a cell for the product description.
document.getElementById("add_p").addEventListener("click", async () => {

    const product = {
        p_id: document.getElementById("productID").value,
        p_name: document.getElementById("productName").value,
        p_des: document.getElementById("des").value,
        rating: document.getElementById("rate").value,
        p_type: document.getElementById("ptype").value,
        p_color: document.getElementById("color").value,
        p_inches: document.getElementById("inche").value,
        p_memory: document.getElementById("memory").value,
        p_internet: document.getElementById("internet").value,
        p_price: document.getElementById("price").value,
        p_reportid: document.getElementById("report").value,
      };
      console.log("Sending product data:", JSON.stringify(product, null, 2));
    try {
        const response = await fetch(`http://localhost:5000/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if (response.ok) {
        alert("Product added successfully");
        location.reload();
      } else {
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product");
    }
  });

  // Add an event listener to handle updating a new product.
  document.getElementById('edit_p').addEventListener('click', async () => {
    const productId = document.getElementById('productID').value;
    const product = {
      p_name: document.getElementById('productName').value,
      p_des: document.getElementById('des').value,
      rating: document.getElementById('rate').value,
      p_type: document.getElementById('ptype').value,
      p_color: document.getElementById('color').value,
      p_inches: document.getElementById('inche').value,
      p_memory: document.getElementById('memory').value,
      p_internet: document.getElementById('internet').value,
      p_price: document.getElementById('price').value,
      p_reportid: document.getElementById('report').value,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
  
      if (response.ok) {
        alert('Product updated successfully');
        location.reload();
      } else {
        alert('Error updating product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating product');
    }
  });  
  // Add an event listener to handle deleting a new product.
  document.getElementById("deleteItem_p").addEventListener("click", async () => {
    const productId = document.getElementById("productID").value;
  
    try {
      const response = await fetch(`http://localhost:5000/api/product/${productId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Product deleted successfully");
        location.reload();
      } else {
        alert("Error deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting product");
    }
  });
  