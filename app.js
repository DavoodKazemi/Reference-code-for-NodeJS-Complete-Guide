const http = require('http');

// Load the Express library and store it in a constant named 'express'.
const express = require('express');

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

// The use method allows us to add a middleware function
app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); // The third argument is a function itself and calling it allows the request yo continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Express!</h1>');
});

const server = http.createServer(app);

server.listen(3000);