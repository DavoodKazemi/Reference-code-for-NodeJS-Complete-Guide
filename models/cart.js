const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase the quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // Convert productPrice to number by a + in front of it. You could also use parseFloat(productPrice).
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.error(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.error("We had error reading the file, so we will abort the operation!");
        return;
      }
      // Spread operator will create a shallow copy of the original object (or array),
      // so you can work on it without manipulating the original one.
      const updatedCart = { ...JSON.parse(fileContent) };
      // Find the product that we want to delete from Cart inside Cart.json
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        // If this product isn't in the cart, then we don't wanna continue
        return;
      }
      // The quantity
      const productQty = product.qty;
      // Remove the product we want to delete, from the JSON data of Cart.json
      updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);
      // Update the TOTAL PRICE in JSON data
      updatedCart.totalPrice = Math.round((updatedCart.totalPrice - productPrice * productQty) * 100) / 100;

      // Rewrite the updated JSON data into the cart.json
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.error(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        // If the error code is 'ENOENT', it means the file doesn't exist
        if (err.code === "ENOENT") {
          // Return an empty cart since the file doesn't exist
          cb({ products: [], totalPrice: 0 });
        } else {
          cb(null); // Handle other types of errors
        }
        return;
      }

      // Handle case where the file exists but is empty or invalid
      try {
        const cart = fileContent.length ? JSON.parse(fileContent) : { products: [], totalPrice: 0 };
        cb(cart);
      } catch (parseError) {
        // If JSON.parse fails, return an empty cart or handle the error
        cb({ products: [], totalPrice: 0 });
      }
    });
  }
};
