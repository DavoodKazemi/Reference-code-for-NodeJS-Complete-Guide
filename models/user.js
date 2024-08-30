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
    // Ensure the cart and cart items are initialized
    const cart = this.cart ? this.cart : { items: [] };
    const cartItems = cart.items ? cart.items : [];

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

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
