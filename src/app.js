const express = require('express');
const app = express();
const axios = require('axios');

const port = process.env.PORT || 3000


const apiKey = process.env.FRESHSALE_API_KEY;
// const apiBaseURL = 'https://api.freshsales.io/v2/';
const apiBaseURL = 'https://domain.freshsales.io/api/';

// Create a Contact
app.get('/', async (req, res) => {
    res.status(200).send("Helow")
})

/*

get, post, put, update

*/

app.post('/createContact', async (req, res) => {
  try {
    console.log(req);
    const { first_name, last_name, email, mobile_number } = req.body;
    
    const response = await axios.post(`${apiBaseURL}contacts`, {
      contact: {
        first_name,
        last_name,
        email,
        mobile_number
      }
    }, {
      headers: {
        'Authorization': `Token token=${apiKey}`
      }
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve a Contact
app.get('getContact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${apiBaseURL}contacts/${id}`, {
      headers: {
        'Authorization': `Token token=${apiKey}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a Contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, mobile_number } = req.body;
    const response = await axios.put(`${apiBaseURL}contacts/${id}`, {
      contact: {
        email,
        mobile_number
      }
    }, {
      headers: {
        'Authorization': `Token token=${apiKey}`
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a Contact
app.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.delete(`${apiBaseURL}contacts/${id}`, {
      headers: {
        'Authorization': `Token token=${apiKey}`
      }
    });
    res.status(204).json({});
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})