const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(process.mainModule.filename), "data", "products.json");

// Get data of products from file
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      try {
        const products = JSON.parse(fileContent);
        cb(products);
      } catch (parseError) {
        cb([]);
      }
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
