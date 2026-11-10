function displayResults(results) {
    const resultsList = document.getElementById('admi-list');
    resultsList.innerHTML = '';

    if (results.length === 0) {
        const noResults = document.createElement('tr');
        const noResultsCell = document.createElement('td');
        noResultsCell.textContent = 'No results found';
        noResultsCell.setAttribute('colspan', '5');
        noResults.appendChild(noResultsCell);
        resultsList.appendChild(noResults);
    } else {
        for (const result of results) {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = result.uid;
            row.appendChild(idCell);

            const FirstnameCell = document.createElement('td');
            FirstnameCell.textContent = result.first_name;
            row.appendChild(FirstnameCell);

            const LastnameCell = document.createElement('td');
            LastnameCell.textContent = result.last_name;
            row.appendChild(LastnameCell);
            
            const ageCell = document.createElement('td');
            ageCell.textContent = result.age;
            row.appendChild(ageCell);

            const genderCell = document.createElement('td');
            genderCell.textContent = result.gender;
            row.appendChild(genderCell);


            const phoneCell = document.createElement('td');
            phoneCell.textContent = result.phone;
            row.appendChild(phoneCell);

            const eamilCell = document.createElement('td');
            eamilCell.textContent = result.email;
            row.appendChild(eamilCell);
            resultsList.appendChild(row);
        }
    }
}
// search Function 
document.getElementById('searchUsers').addEventListener('click', async (event) => {
    event.preventDefault();
    const id = document.getElementById('searchid').value;
    const fname = document.getElementById('search_fname').value;
    const lname = document.getElementById('search_lname').value;
    const eamil = document.getElementById('search_email').value;
    const gender = document.getElementById('searchgender').value;

    try {
        const response = await fetch('http://localhost:5000/searchAdmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ condition: { uid: id, first_name: fname, last_name: lname, email: eamil, gender: gender } 
           
            }),

        });
        console.log('resbosd')
        if (response.ok) {
            const results = await response.json();
            console.log('Response data:', results); // Add this lineto find the bug
            displayResults(results);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//view all
document.getElementById('viewall_u').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/admis', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (response.ok) {
            const results = await response.json();
            displayResults(results.data);
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

//Add admi function
document.getElementById("add_u").addEventListener("click", async () => {
    const id = document.getElementById('userID').value;
    const fname = document.getElementById('userFname').value;
    const lname = document.getElementById('userLname').value;
    const age = document.getElementById('Age').value;
    const gender = document.getElementById('Gender').value;
    const phone = document.getElementById('Phone').value;
    const email = document.getElementById('Email').value;
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('password').value;
    const loginRole = document.getElementById('loginRole').value;

    try {
        const response = await fetch(`http://localhost:5000/admi`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Adminfo: { uid: id, first_name: fname, last_name: lname, age: age, gender: gender, phone: phone, email: email },
                Loginfo: { login_id: loginId, pass: password, login_role: loginRole }
            }),
        });

        if (response.ok) {
            alert("Administrator added successfully");
            location.reload();
        } else {
            alert("Error adding administrator");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error adding administrator");
    }
});

// update administrator function
document.getElementById('edit_u').addEventListener('click', async () => {
    
    const id = document.getElementById('userID').value;
    const fname = document.getElementById('userFname').value;
    const lname = document.getElementById('userLname').value;
    const age = document.getElementById('Age').value;
    const gender = document.getElementById('Gender').value;
    const phone = document.getElementById('Phone').value;
    const email = document.getElementById('Email').value;
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('password').value;
    const loginRole = document.getElementById('loginRole').value;

    try {
        const response = await fetch(`http://localhost:5000/admi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Adminfo: { uid: id, first_name: fname, last_name: lname, age: age, gender: gender, phone: phone, email: email },
                Loginfo: { login_id: loginId, pass: password, login_role: loginRole }
            }),
        });

        if (response.ok) {
            alert('Administrator updated successfully');
            location.reload();
        } else {
            alert('Error updating Administrator');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating Administrator');
    }
});

//Delete the administrator function
document.getElementById("deleteItem_u").addEventListener("click", async () => {
    const admiId = document.getElementById("userID").value;

    try {
        const response = await fetch(`http://localhost:5000/admi/${admiId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Admi deleted successfully");
            location.reload();
        } else {
            alert("Error deleting Admi");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error deleting Admi");
    }
});




