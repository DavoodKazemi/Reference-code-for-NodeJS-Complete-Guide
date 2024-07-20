const path = require('path');
// Load the Express library and store it in a constant named 'express'.
const express = require('express');
// Import body-parser package which was installed
const bodyParser = require('body-parser');


// Create a new Express application instance and store it in a constant named 'app'.
const app = express();

// Set the templating engine to Pug using the 'view engine' property
app.set('view engine', 'pug');
// Set the location of the views directory (default is 'views')
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

// Make the public folder accessible to be able to use the files inside it statically
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);


app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found'});
});

app.listen(3000);