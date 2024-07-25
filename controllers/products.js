const Product = require("../models/product");

// // Controller function for visiting the Add Product page
exports.getAddProduct = (req, res, next) => {
  console.log("In another middleware!");
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    formsCSS: true,
    activeAddProduct: true,
  });
};

// Controller function for adding a new product
exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

// Controller function for displaying products lists
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
