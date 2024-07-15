const path = require('path');
const express = require('express');

const router = express.Router();

// Replace the app with router
// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    console.log('In another middleware!');
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});


module.exports = router;