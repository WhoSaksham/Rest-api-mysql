const express = require('express');
const app = express();
const port = 8000;
const connection = require('./db')

app.use(express.json());

// Available Route
app.use('/api/customers', require('./routes/customer')) // For performing CRUD of customers

// Default endpoint for testing
app.get('/', (req, res) => {
    res.send('Hello Saksham')
});

// Listening to server
app.listen(port, () => {
    console.log(`Server running @ http://localhost:${port}`)
});