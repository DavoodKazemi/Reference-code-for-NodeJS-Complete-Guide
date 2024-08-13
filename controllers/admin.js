const Product = require("../models/product");

// // Controller function for visiting the Add Product page
exports.getAddProduct = (req, res, next) => {
  console.log("In another middleware!");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

// Controller function for adding a new product
exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/products");
};

// Controller function for visiting the Edit Product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect('/');
  }
  console.log("In another middleware!");
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  });
};
