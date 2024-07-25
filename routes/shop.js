const path = require("path");
const express = require("express");

const productsController = require('../controllers/products');
// const rootDir = require("../util/path");
// const adminData = require("./admin");

const router = express.Router();

router.get("/products", productsController.getProducts);

module.exports = router;
