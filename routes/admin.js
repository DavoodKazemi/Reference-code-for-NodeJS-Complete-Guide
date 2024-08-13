const path = require("path");
const express = require("express");

const adminController = require('../controllers/admin');

const router = express.Router();


// Replace the app with router
// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// Edit product route ends with the product id (the colon indicates that it's a dynamic section of url)
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
