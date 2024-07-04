
/*this file contains the client-side code, which handles
the form submission and updates the HTML content*/

document.querySelector('#query-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const query = document.querySelector('#query').value; // Get user input

    try {
        const response = await fetch('/fetch-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ query }) // Format query as URLSearchParams
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Parse JSON response
        document.querySelector('#result').innerText = JSON.stringify(data, null, 2); // Display response
    } catch (error) {
        document.querySelector('#result').innerText = error.message; // Display error message
    }
});

