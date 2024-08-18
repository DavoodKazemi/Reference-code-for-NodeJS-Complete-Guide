const Product = require("../models/product");

// // Controller function for visiting the Add Product page
exports.getAddProduct = (req, res, next) => {
  console.log("In another middleware!");
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

// Controller function for adding a new product
exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then((result) => {
      // console.log(result);
      console.log("Created Product using Sequelize!");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Controller function for visiting the Edit Product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  // To pre-populate the form with the product data, we use the incoming req which contain it (id is in the url)
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
  console.log("In another middleware!");
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
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
