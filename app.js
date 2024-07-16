const path = require('path');
// Load the Express library and store it in a constant named 'express'.
const express = require('express');
// Import body-parser package which was installed
const bodyParser = require('body-parser');

// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);