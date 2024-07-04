
/*this file contains the server-side code,
 which sets up the Express server
and handles API request.*/



const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname))); //serve static files from root directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/fetch-data', async (req, res) => {
    const query = req.body.query;
    const options = {
        method: 'GET',
        url: `https://wordsapiv1.p.rapidapi.com/words/${query}/synonyms`,
        headers: {
            'x-rapidapi-key': '652be5a739msh04db7fc5da19691p10047cjsn7226f46be02e',
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
