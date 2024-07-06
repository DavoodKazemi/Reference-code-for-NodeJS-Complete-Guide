const http = require('http');

// Load the Express library and store it in a constant named 'express'.
const express = require('express');

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

const server = http.createServer(app);

server.listen(3000);