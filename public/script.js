
/*this file contains the client-side code, which handles
the form submission and updates the HTML content*/

document.querySelector('#query-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.querySelector('#query').value;
    try {
        const response = await fetch('/fetch-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ query })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        document.querySelector('#result').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.querySelector('#result').innerText = error.message;
    }
});
