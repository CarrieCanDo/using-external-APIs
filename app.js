// Import necessary modules
const express = require('express');
const axios = require('axios');
const app = express();

// Define API key and URL as constants
const RAPIDAPI_KEY = '652be5a739msh04db7fc5da19691p10047cjsn7226f46be02e';
const TRANSLATION_URL = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Define the port
const PORT = process.env.PORT || 3000;

// Fetch code to get data
app.post('/translate', async (req, res) => {
  const { from, to, q } = req.body;
  
  try {
    const response = await axios({
      method: 'post',
      url: TRANSLATION_URL,
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'rapid-translate-multi-traduction.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ from, to, q })
    });

    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
