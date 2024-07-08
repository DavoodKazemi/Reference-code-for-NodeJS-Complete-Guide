// Load the Express library and store it in a constant named 'express'.
const express = require('express');

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

// The use method allows us to add a middleware function
app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
});
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>The Add Product Page</h1>');
});
app.use('/', (req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);