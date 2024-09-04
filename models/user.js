const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    // Ensure the cart and cart items are initialized for this user
    const cart = this.cart ? this.cart : { items: [] };
    const cartItems = cart.items ? cart.items : [];

    // Check if the product is already in cart or not
    const cartProductIndex = cartItems.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...cartItems];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    // const updatedCart = { items: [{ productId: new ObjectId(this._id), quantity: 1 }] };
    // console.log("product: ", product);
    // console.log("User ID (this._id):", this._id);
    // console.log("Cart being updated:", updatedCart);

    const db = getDb();
    return db.collection("users").updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    // Map an array of js objects into an array of string elements (product ids)
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    console.log("productIds: ", productIds);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } }) // Get the products info from database, with the help of productIds
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p, //The array of products we got from database
            quantity: this.cart.items.find((i) => {
              // We add the quantity to each product here
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteItemFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== prodId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products, // information of products in the cart + quantity
          user: {
            _id: new ObjectId(this._id),
            name: this.name,
          },
        };
        return db.collection("orders").insertOne(order); 
      })
      .then(() => {
        this.cart = { items: [] }; // Clear the cart in the user object
        return db.collection("users").updateOne({ _id: new Object(this._id) }, { $set: { cart: { items: [] } } }); // Clear the cart of the user in the database
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray();
    //   .collection("orders").find(_id: {this._id})
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
