const Product = require("../models/product");



// Controller function for displaying products lists
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const ProdId = req.params.productId;
  console.log(ProdId);
  res.redirect('/');
};

// Controller function for displaying home page
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};


exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: 'Your Cart',
    path: '/cart',
  })
}
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: 'Your Orders',
    path: '/orders',
  })
}
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: 'Checkout',
    path: '/checkout',
  })
}